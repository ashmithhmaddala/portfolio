import { useCallback, useEffect, useState } from "react";

/*
 * Theme state, synced to <html data-theme>.
 * The initial value is already painted by the inline script in index.html —
 * we read it back rather than recomputing, so there's no flash and no
 * disagreement between the two.
 */
export function useTheme() {
	const [theme, setTheme] = useState(
		() => document.documentElement.dataset.theme || "light"
	);

	useEffect(() => {
		document.documentElement.dataset.theme = theme;
		try {
			localStorage.setItem("theme", theme);
		} catch {
			// Private mode / storage disabled — the theme still applies for
			// this session, it just won't persist.
		}
	}, [theme]);

	const toggle = useCallback(
		() => setTheme((t) => (t === "dark" ? "light" : "dark")),
		[]
	);

	return { theme, toggle };
}
