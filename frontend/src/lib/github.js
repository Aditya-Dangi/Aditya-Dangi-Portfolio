/**
 * Minimal GitHub REST helpers. Everything here reads the unauthenticated
 * public API (60 requests/hour per IP) — there is no backend to hold a
 * token, so every call is designed to fail quietly and cache aggressively
 * rather than surface rate-limit errors to a visitor.
 */

const API = "https://api.github.com";
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes — plenty fresh for a portfolio.

/**
 * @param {string} url a github.com/owner/repo URL
 * @returns {{owner: string, repo: string} | null}
 */
export function parseRepoUrl(url) {
  try {
    const { pathname } = new URL(url);
    const [, owner, repo] = pathname.split("/");
    return owner && repo ? { owner, repo: repo.replace(/\.git$/, "") } : null;
  } catch {
    return null;
  }
}

/**
 * @param {string} url a github.com/username profile URL
 * @returns {string | null}
 */
export function parseProfileUrl(url) {
  try {
    const { pathname } = new URL(url);
    const [, username] = pathname.split("/");
    return username || null;
  } catch {
    return null;
  }
}

/**
 * sessionStorage-backed fetch: avoids re-hitting the rate limit on every
 * remount within a session, and returns a stale cache entry instead of
 * throwing if a later request fails.
 *
 * @param {string} key
 * @param {string} url
 */
async function cachedFetch(key, url) {
  const cacheKey = `ad-github-cache:${key}`;

  try {
    const cached = JSON.parse(sessionStorage.getItem(cacheKey) ?? "null");
    if (cached && Date.now() - cached.at < CACHE_TTL) return cached.data;
  } catch {
    /* corrupt cache entry — fall through to a fresh fetch */
  }

  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github+json" },
  });

  if (!response.ok) {
    throw new Error(`GitHub API ${response.status}`);
  }

  const data = await response.json();

  try {
    sessionStorage.setItem(cacheKey, JSON.stringify({ at: Date.now(), data }));
  } catch {
    /* storage full/disabled — nothing to do, the fetch itself still worked */
  }

  return data;
}

/** @param {string} owner @param {string} repo */
export function fetchRepo(owner, repo) {
  return cachedFetch(`repo:${owner}/${repo}`, `${API}/repos/${owner}/${repo}`);
}

/** @param {string} username */
export function fetchUser(username) {
  return cachedFetch(`user:${username}`, `${API}/users/${username}`);
}
