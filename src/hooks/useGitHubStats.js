import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "../data/profile";

const CACHE_KEY = "gh-v2";
const CACHE_TTL = 1000 * 60 * 60 * 6; // 6h

/*
 * Public profile numbers plus recent push activity.
 *
 * The unauthenticated GitHub API is rate-limited to 60 requests/hour per IP,
 * so this is strictly progressive enhancement: every consumer must render
 * sensibly when `data` is null. Results are cached for six hours so a
 * returning visitor doesn't spend quota.
 */
export function useGitHubStats() {
	const [data, setData] = useState(null);

	useEffect(() => {
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
		let cancelled = false;

		const get = (path) =>
			fetch(`https://api.github.com/${path}`, {
				signal: controller.signal,
				headers: { Accept: "application/vnd.github+json" },
			}).then((res) => {
				if (!res.ok) throw new Error(String(res.status));
				return res.json();
			});

		Promise.all([
			get(`users/${GITHUB_USERNAME}`),
			get(`users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=6`),
		])
			.then(([user, repos]) => {
				if (cancelled) return;
				const next = {
					repos: user.public_repos,
					recent: repos
						// The site's own repo is not interesting activity.
						.filter((r) => !r.fork && r.name !== "portfolio")
						.slice(0, 4)
						.map((r) => ({
							name: r.name,
							language: r.language,
							pushedAt: r.pushed_at,
							url: r.html_url,
						})),
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
				// Offline, rate-limited or blocked. Consumers keep their
				// static fallbacks and nothing user-visible breaks.
			});

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, []);

	return data;
}

const RTF = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
const UNITS = [
	["year", 31536000],
	["month", 2592000],
	["week", 604800],
	["day", 86400],
	["hour", 3600],
	["minute", 60],
];

export function relativeTime(iso) {
	const seconds = (Date.now() - new Date(iso).getTime()) / 1000;
	for (const [unit, size] of UNITS) {
		if (seconds >= size) return RTF.format(-Math.floor(seconds / size), unit);
	}
	return "just now";
}
