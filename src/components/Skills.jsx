import { motion, useReducedMotion } from "framer-motion";
import { SKILLS } from "../data/profile";
import Reveal from "./ui/Reveal";
import "./skills.css";

function SkillBar({ skill, accent, delay }) {
	const reduced = useReducedMotion();

	return (
		<li className="skill">
			<div className="skill__head">
				<span className="skill__name">{skill.name}</span>
				<span className="skill__pct mono">{skill.level}</span>
			</div>
			<div
				className="skill__track"
				role="meter"
				aria-valuenow={skill.level}
				aria-valuemin={0}
				aria-valuemax={100}
				aria-label={skill.name}
			>
				<motion.span
					className="skill__fill"
					style={{ background: accent }}
					initial={{ width: reduced ? `${skill.level}%` : 0 }}
					whileInView={{ width: `${skill.level}%` }}
					viewport={{ once: true, margin: "-60px" }}
					transition={{
						duration: reduced ? 0 : 1,
						delay: reduced ? 0 : delay,
						ease: [0.22, 1, 0.36, 1],
					}}
				/>
			</div>
		</li>
	);
}

export default function Skills() {
	return (
		<section className="section" id="stack">
			<div className="container">
				<Reveal>
					<p className="eyebrow">What I work with</p>
					<h2 className="section-title">The stack</h2>
					<p className="section-lede">
						Weighted by what I'd be comfortable being interviewed on
						— not by what I've once installed.
					</p>
				</Reveal>

				<div className="skillGrid">
					{SKILLS.map((group, gi) => (
						<Reveal
							key={group.group}
							delay={gi * 0.08}
							className="skillGroup"
						>
							<h3 className="skillGroup__title">
								<span
									className="skillGroup__dot"
									style={{ background: group.accent }}
									aria-hidden="true"
								/>
								{group.group}
							</h3>
							<ul className="skillGroup__list">
								{group.items.map((skill, si) => (
									<SkillBar
										key={skill.name}
										skill={skill}
										accent={group.accent}
										delay={si * 0.06}
									/>
								))}
							</ul>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	);
}
