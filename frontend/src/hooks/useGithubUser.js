import { useEffect, useState } from "react";
import { fetchUser } from "../lib/github";

/**
 * Live GitHub profile summary (public repos, followers, account age) for the
 * "GitHub" username embedded in `profile.github`. Same fail-quiet contract as
 * `useGithubRepo` — a rate-limited or offline visitor just doesn't see the
 * card, never a broken widget.
 *
 * @param {string} username
 * @returns {{status: "loading" | "ready" | "error", data: object | null}}
 */
export function useGithubUser(username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    if (!username) {
      setState({ status: "error", data: null });
      return undefined;
    }

    let cancelled = false;

    fetchUser(username)
      .then((data) => {
        if (!cancelled) setState({ status: "ready", data });
      })
      .catch(() => {
        if (!cancelled) setState({ status: "error", data: null });
      });

    return () => {
      cancelled = true;
    };
  }, [username]);

  return state;
}

export default useGithubUser;
