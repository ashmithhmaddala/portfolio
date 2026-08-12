import { useEffect } from "react";

const SUFFIX = "Ashmith Maddala";

/*
 * Sets the document title for a route. There is no server render here, so the
 * crawler-facing title stays the one in index.html; this is for the tab, the
 * history entry and the bookmark.
 */
export function usePageTitle(title) {
	useEffect(() => {
		document.title = title ? `${title} — ${SUFFIX}` : SUFFIX;
	}, [title]);
}

/*
 * Restores scroll position on navigation. React Router deliberately doesn't
 * do this, because the right behaviour is app-specific — here every route is
 * a fresh document, so top is always correct.
 */
export function useScrollToTop(key) {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, [key]);
}
