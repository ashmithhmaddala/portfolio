import { useEffect, useRef, useState } from "react";
import {
	motion,
	useMotionTemplate,
	useMotionValue,
	useReducedMotion,
	useSpring,
} from "framer-motion";
import "./tilt.css";

const SPRING = { stiffness: 260, damping: 24, mass: 0.6 };

/*
 * Pointer-reactive card: tilts in 3D toward the cursor and carries a spotlight
 * that tracks the same position.
 *
 * Disabled entirely for coarse pointers (there's no hover on touch, and the
 * tilt would fight the scroll) and for reduced-motion users. In both cases it
 * degrades to a static card with all content intact.
 */
export default function TiltCard({
	children,
	className = "",
	max = 7,
	glare = true,
	...rest
}) {
	const ref = useRef(null);
	const reduced = useReducedMotion();

	const rotateX = useSpring(useMotionValue(0), SPRING);
	const rotateY = useSpring(useMotionValue(0), SPRING);
	const glareX = useMotionValue(50);
	const glareY = useMotionValue(50);
	const glareOpacity = useSpring(useMotionValue(0), {
		stiffness: 180,
		damping: 26,
	});

	const spotlight = useMotionTemplate`radial-gradient(420px circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.09), transparent 65%)`;

	// Evaluated once and kept in sync via the media-query listener, rather
	// than re-running matchMedia on every render. Also means plugging in a
	// mouse on a tablet enables the tilt without a reload.
	const [finePointer, setFinePointer] = useState(false);

	useEffect(() => {
		const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
		const sync = () => setFinePointer(mq.matches);
		sync();
		mq.addEventListener("change", sync);
		return () => mq.removeEventListener("change", sync);
	}, []);

	const interactive = !reduced && finePointer;

	const handleMove = (e) => {
		if (!interactive || !ref.current) return;
		const rect = ref.current.getBoundingClientRect();
		const px = (e.clientX - rect.left) / rect.width;
		const py = (e.clientY - rect.top) / rect.height;

		rotateY.set((px - 0.5) * max * 2);
		rotateX.set((0.5 - py) * max * 2);
		glareX.set(px * 100);
		glareY.set(py * 100);
	};

	const handleEnter = () => interactive && glareOpacity.set(1);

	const handleLeave = () => {
		if (!interactive) return;
		rotateX.set(0);
		rotateY.set(0);
		glareOpacity.set(0);
	};

	return (
		<motion.div
			ref={ref}
			className={`tilt ${className}`}
			onMouseMove={handleMove}
			onMouseEnter={handleEnter}
			onMouseLeave={handleLeave}
			style={{ rotateX, rotateY, transformPerspective: 1100 }}
			{...rest}
		>
			{children}
			{glare && interactive && (
				<motion.span
					aria-hidden="true"
					className="tilt__glare"
					style={{ background: spotlight, opacity: glareOpacity }}
				/>
			)}
		</motion.div>
	);
}
