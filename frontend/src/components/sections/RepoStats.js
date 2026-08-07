import React from "react";
import { FiCircle, FiGitBranch, FiStar } from "react-icons/fi";
import { useGithubRepo } from "../../hooks/useGithubRepo";

const RELATIVE = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** Coarse "updated 3 months ago" style phrasing from an ISO date string. */
function relativeFromNow(iso) {
  const days = Math.round((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days < 1) return "today";
  if (days < 30) return RELATIVE.format(-days, "day");
  if (days < 365) return RELATIVE.format(-Math.round(days / 30), "month");
  return RELATIVE.format(-Math.round(days / 365), "year");
}

/**
 * Live GitHub stats for one repo: stars, primary language, last push.
 * Renders nothing while loading or on failure/rate-limit — a project card
 * with no stat row still reads as complete, whereas a skeleton or error
 * message here would draw attention to a footnote.
 *
 * @param {string} repoUrl
 */
export function RepoStats({ repoUrl }) {
  const { status, data } = useGithubRepo(repoUrl);

  if (status !== "ready" || !data) return null;

  return (
    <ul className="repo-stats" aria-label="Live GitHub repository stats">
      <li>
        <FiStar aria-hidden="true" />
        {data.stargazers_count}
      </li>
      {data.language && (
        <li>
          <FiCircle aria-hidden="true" className="repo-stats__lang-dot" />
          {data.language}
        </li>
      )}
      {data.pushed_at && (
        <li>
          <FiGitBranch aria-hidden="true" />
          Updated {relativeFromNow(data.pushed_at)}
        </li>
      )}
    </ul>
  );
}

export default RepoStats;
