import { useEffect, useState } from "react";
import { fetchRepo, parseRepoUrl } from "../lib/github";

/**
 * Live GitHub repo metadata (stars, primary language, last push) for a
 * project card's GitHub link. Real data only — no fabricated activity or
 * placeholder numbers. Fails silently to `status: "error"` so a rate-limited
 * or offline visitor just sees the card without the stat row, never a
 * broken widget.
 *
 * @param {string} [repoUrl] a github.com/owner/repo link, or undefined
 * @returns {{status: "idle" | "loading" | "ready" | "error", data: object | null}}
 */
export function useGithubRepo(repoUrl) {
  const [state, setState] = useState({ status: repoUrl ? "loading" : "idle", data: null });

  useEffect(() => {
    const parsed = repoUrl ? parseRepoUrl(repoUrl) : null;
    if (!parsed) {
      setState({ status: "idle", data: null });
      return undefined;
    }

    let cancelled = false;
    setState({ status: "loading", data: null });

    fetchRepo(parsed.owner, parsed.repo)
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [repoUrl]);

  return state;
}

export default useGithubRepo;
