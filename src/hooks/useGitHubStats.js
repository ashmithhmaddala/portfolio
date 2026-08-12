import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../data/profile";

const CACHE_KEY = "gh-stats-v1";
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6h

/*
 * Pulls public profile numbers from the unauthenticated GitHub API.
 *
 * That endpoint is rate-limited to 60 requests/hour per IP, so this is
 * strictly a progressive enhancement: every consumer must render fine from
 * the static fallbacks in profile.js when `data` is null. Results are cached
 * in localStorage for 6h to keep a returning visitor from spending quota.
 */
export function useGitHubStats() {
	const [data, setData] = useState(null);

	useEffect(() => {
		let cancelled = false;

		// Serve from cache when it's fresh.
		try {
			const raw = localStorage.getItem(CACHE_KEY);
			if (raw) {
				const cached = JSON.parse(raw);
				if (Date.now() - cached.at < CACHE_TTL) {
					setData(cached.data);
					return;
				}
			}
		} catch {
			// Corrupt or unavailable cache — fall through to the network.
		}

		const controller = new AbortController();

		fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
			signal: controller.signal,
			headers: { Accept: "application/vnd.github+json" },
		})
			.then((res) => {
				if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
				return res.json();
			})
			.then((json) => {
				if (cancelled) return;
				const next = {
					repos: json.public_repos,
					followers: json.followers,
					avatar: json.avatar_url,
				};
				setData(next);
				try {
					localStorage.setItem(
						CACHE_KEY,
						JSON.stringify({ at: Date.now(), data: next })
					);
				} catch {
					// Cache write is best-effort.
				}
			})
			.catch(() => {
				// Offline, rate-limited, or blocked. Consumers keep their
				// static fallbacks; nothing user-visible breaks.
			});

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	return data;
}
