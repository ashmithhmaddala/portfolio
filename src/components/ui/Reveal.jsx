import { motion, useReducedMotion } from "framer-motion";

/*
 * Scroll-reveal wrapper. Animates once, on entry.
 * When the user prefers reduced motion this collapses to a plain fade with no
 * translation, so the page still feels alive without anything moving.
 */
export default function Reveal({
	children,
	delay = 0,
	y = 22,
	as = "div",
	className,
	...rest
}) {
	const reduced = useReducedMotion();
	const MotionTag = motion[as] || motion.div;

	return (
		<MotionTag
			className={className}
			initial={{ opacity: 0, y: reduced ? 0 : y }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-80px" }}
			transition={{
				duration: reduced ? 0.2 : 0.62,
				delay: reduced ? 0 : delay,
				ease: [0.22, 1, 0.36, 1],
			}}
			{...rest}
		>
			{children}
		</MotionTag>
	);
}
