import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail, X } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/profile";
import MeshBackground from "./ui/MeshBackground";
import "./hero.css";

// lucide has no X/Twitter brand mark; its `X` glyph is close enough to the
// current logo and reads better than the retired bird.
const ICONS = { github: Github, linkedin: Linkedin, mail: Mail, x: X };

/*
 * Types the rotating phrase out, holds, deletes, moves to the next one.
 * Reduced-motion users get the first phrase, static — no cursor, no cycle.
 */
function useTypewriter(phrases, enabled) {
	const [index, setIndex] = useState(0);
	const [text, setText] = useState(enabled ? "" : phrases[0]);
	const [deleting, setDeleting] = useState(false);

	useEffect(() => {
		if (!enabled) return;

		const full = phrases[index % phrases.length];
		const done = text === full;

		// Hold at full length before reversing.
		if (!deleting && done) {
			const hold = setTimeout(() => setDeleting(true), 1900);
			return () => clearTimeout(hold);
		}

		if (deleting && text === "") {
			setDeleting(false);
			setIndex((i) => (i + 1) % phrases.length);
			return;
		}

		const tick = setTimeout(
			() =>
				setText((prev) =>
					deleting
						? full.slice(0, prev.length - 1)
						: full.slice(0, prev.length + 1)
				),
			deleting ? 28 : 62
		);

		return () => clearTimeout(tick);
	}, [text, deleting, index, phrases, enabled]);

	return text;
}

export default function Hero() {
	const reduced = useReducedMotion();
	const typed = useTypewriter(PROFILE.rotatingRoles, !reduced);

	const rise = (delay) => ({
		initial: { opacity: 0, y: reduced ? 0 : 18 },
		animate: { opacity: 1, y: 0 },
		transition: {
			duration: reduced ? 0.25 : 0.7,
			delay: reduced ? 0 : delay,
			ease: [0.22, 1, 0.36, 1],
		},
	});

	return (
		<section className="hero" id="top">
			<MeshBackground />

			<div className="container hero__inner">
				{PROFILE.availability.open && (
					<motion.div className="hero__badge" {...rise(0.05)}>
						<span className="hero__pulse" aria-hidden="true" />
						{PROFILE.availability.text}
					</motion.div>
				)}

				<motion.p className="hero__kicker mono" {...rise(0.12)}>
					{PROFILE.name} — {PROFILE.role} @ {PROFILE.company}
				</motion.p>

				<motion.h1 className="hero__title" {...rise(0.2)}>
					<span className="hero__titleLead">I </span>
					<span className="hero__typed gradient-text">
						{typed}
						{!reduced && (
							<span className="hero__caret" aria-hidden="true" />
						)}
					</span>
					{/*
					 * Screen readers get the complete list rather than a
					 * half-typed string mid-animation.
					 */}
					<span className="sr-only">
						{PROFILE.rotatingRoles.join(", ")}.
					</span>
				</motion.h1>

				<motion.p className="hero__lede" {...rise(0.3)}>
					{PROFILE.tagline}
				</motion.p>

				<motion.div className="hero__cta" {...rise(0.38)}>
					<a className="btn btn--primary" href="#projects">
						See the work
						<ArrowUpRight size={16} />
					</a>
					<a className="btn btn--ghost" href="#contact">
						Get in touch
					</a>
				</motion.div>

				<motion.div className="hero__socials" {...rise(0.46)}>
					{SOCIALS.filter((s) => ICONS[s.id]).map((social) => {
						const Icon = ICONS[social.id];
						return (
							<a
								key={social.id}
								href={social.url}
								target={
									social.id === "mail" ? undefined : "_blank"
								}
								rel="noreferrer"
								className="hero__social"
								aria-label={social.label}
							>
								<Icon size={18} />
							</a>
						);
					})}
					<span className="hero__socialDivider" aria-hidden="true" />
					<span className="hero__location mono">
						{PROFILE.location}
					</span>
				</motion.div>
			</div>

			<motion.a
				href="#work"
				className="hero__scroll"
				aria-label="Scroll to experience"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: reduced ? 0 : 1.1, duration: 0.6 }}
			>
				<ArrowDown size={15} />
			</motion.a>
		</section>
	);
}
