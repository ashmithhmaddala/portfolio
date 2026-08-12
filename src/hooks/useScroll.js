import { useEffect, useRef, useState } from "react";

/*
 * Fires once when the element first enters the viewport.
 *
 * Used for sequenced entrances. Deliberately one-shot: content that re-hides
 * when you scroll back up is an animation for its own sake, and it makes a
 * page you're trying to re-read feel broken.
 */
export function useInView({ rootMargin = "-12% 0px -8% 0px" } = {}) {
	const ref = useRef(null);
	const [inView, setInView] = useState(false);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		// No observer (or reduced motion) means show it immediately rather
		// than leaving content stuck invisible.
		if (
			typeof IntersectionObserver === "undefined" ||
			window.matchMedia("(prefers-reduced-motion: reduce)").matches
		) {
			setInView(true);
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin }
		);

		observer.observe(node);
		return () => observer.disconnect();
	}, [rootMargin]);

	return [ref, inView];
}

/*
 * Fraction of `ref`'s height that has been scrolled past, 0 to 1.
 *
 * Reads layout inside a rAF callback so a fast scroll coalesces into one
 * measurement per frame instead of one per scroll event.
 */
export function useReadingProgress(ref) {
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		let frame = null;

		const measure = () => {
			frame = null;
			const { top, height } = node.getBoundingClientRect();
			const scrollable = height - window.innerHeight;

			// Shorter than the viewport: there is nothing to track.
			if (scrollable <= 0) {
				setProgress(0);
				return;
			}

			const passed = -top;
			setProgress(Math.min(Math.max(passed / scrollable, 0), 1));
		};

		const onScroll = () => {
			if (frame === null) frame = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll);

		return () => {
			if (frame !== null) cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
		};
	}, [ref]);

	return progress;
}
