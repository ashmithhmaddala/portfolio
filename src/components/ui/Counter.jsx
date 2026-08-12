import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/*
 * Counts up to `value` the first time it scrolls into view.
 * Reduced-motion users get the final number immediately — the information is
 * the number, not the animation.
 */
export default function Counter({ value, suffix = "", duration = 1400 }) {
	const ref = useRef(null);
	const inView = useInView(ref, { once: true, margin: "-40px" });
	const reduced = useReducedMotion();
	const [display, setDisplay] = useState(0);

	useEffect(() => {
		if (!inView) return;

		if (reduced) {
			setDisplay(value);
			return;
		}

		let frame;
		const start = performance.now();

		const tick = (now) => {
			const t = Math.min((now - start) / duration, 1);
			// easeOutExpo — fast start, long settle. Reads as "landing" on
			// the number rather than grinding toward it.
			const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
			setDisplay(Math.round(eased * value));
			if (t < 1) frame = requestAnimationFrame(tick);
		};

		frame = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(frame);
	}, [inView, value, duration, reduced]);

	return (
		<span ref={ref}>
			{display}
			{suffix}
		</span>
	);
}
