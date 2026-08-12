import { useInView } from "../hooks/useScroll";
import "./reveal.css";

/*
 * Entrance for a block of content: a short rise and fade, once, on first
 * view. `index` staggers siblings so a list resolves in reading order rather
 * than all at once.
 *
 * The transition is defined in CSS behind a reduced-motion guard, and the
 * hook reports "in view" immediately when motion is reduced, so the content
 * is never gated behind an animation that will not run.
 */
export default function Reveal({ as: Tag = "div", index = 0, className = "", children, ...rest }) {
	const [ref, inView] = useInView();

	return (
		<Tag
			ref={ref}
			className={`reveal ${inView ? "is-in" : ""} ${className}`.trim()}
			style={{ "--reveal-delay": `${Math.min(index, 6) * 70}ms` }}
			{...rest}
		>
			{children}
		</Tag>
	);
}
