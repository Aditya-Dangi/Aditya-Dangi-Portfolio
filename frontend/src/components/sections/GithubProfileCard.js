import React, { useMemo } from "react";
import { FiBookOpen, FiGithub, FiUsers } from "react-icons/fi";
import { parseProfileUrl } from "../../lib/github";
import { useGithubUser } from "../../hooks/useGithubUser";

/**
 * Live GitHub profile summary (public repos, followers, account age) for the
 * "GitHub" link in `profile.github`. Same fail-quiet contract as
 * `RepoStats` — a rate-limited or offline visitor just doesn't see the
 * card, never a broken widget or a loading skeleton that never resolves.
 *
 * @param {string} profileUrl
 */
export function GithubProfileCard({ profileUrl }) {
  const username = useMemo(() => parseProfileUrl(profileUrl), [profileUrl]);
  const { status, data } = useGithubUser(username);

  if (status !== "ready" || !data) return null;

  const joinedYear = data.created_at ? new Date(data.created_at).getFullYear() : null;

  return (
    <a
      className="github-card"
      href={data.html_url ?? profileUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`${data.login} on GitHub — ${data.public_repos} public repositories, ${data.followers} followers`}
    >
      <img
        className="github-card__avatar"
        src={data.avatar_url}
        alt=""
        aria-hidden="true"
        loading="lazy"
        width="48"
        height="48"
      />
      <div className="github-card__body">
        <p className="github-card__name">
          <FiGithub aria-hidden="true" />
          {data.login}
        </p>
        <ul className="github-card__stats">
          <li>
            <FiBookOpen aria-hidden="true" />
            {data.public_repos} repos
          </li>
          <li>
            <FiUsers aria-hidden="true" />
            {data.followers} followers
          </li>
          {joinedYear && <li>On GitHub since {joinedYear}</li>}
        </ul>
      </div>
    </a>
  );
}

export default GithubProfileCard;
