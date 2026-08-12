import { useCallback, useState } from "react";
import { ArrowUpRight, Github } from "lucide-react";
import { PROJECTS } from "../data/profile";
import Reveal from "./ui/Reveal";
import TiltCard from "./ui/TiltCard";
import ProjectModal from "./ProjectModal";
import "./projects.css";

function Metric({ metric }) {
	return (
		<div className="metric">
			<div className="metric__value">
				{metric.value}
				{metric.estimated && (
					<sup
						className="metric__est"
						title="Self-reported estimate from the build period, not an independently measured figure."
					>
						est.
					</sup>
				)}
			</div>
			<div className="metric__label">{metric.label}</div>
		</div>
	);
}

function ProjectCard({ project, index, onOpen }) {
	const [from, to] = project.gradient;

	return (
		<Reveal delay={index * 0.08}>
			<TiltCard className="pcard">
				<span
					className="pcard__wash"
					aria-hidden="true"
					style={{
						background: `linear-gradient(135deg, ${from}, ${to})`,
					}}
				/>

				<div className="pcard__body">
					<div className="pcard__top">
						<span className="pcard__index mono">
							{String(index + 1).padStart(2, "0")}
						</span>
						<div className="pcard__tags">
							{project.tags.map((tag) => (
								<span className="chip" key={tag}>
									{tag}
								</span>
							))}
						</div>
					</div>

					<h3 className="pcard__title">{project.title}</h3>
					<p className="pcard__tagline">{project.tagline}</p>
					<p className="pcard__desc">{project.description}</p>

					<div className="pcard__metrics">
						{project.metrics.map((m) => (
							<Metric key={m.label} metric={m} />
						))}
					</div>

					<div className="pcard__stack">
						{project.stack.map((tech) => (
							<span className="pcard__tech mono" key={tech}>
								{tech}
							</span>
						))}
					</div>

					<div className="pcard__actions">
						<button
							type="button"
							className="pcard__readMore"
							onClick={() => onOpen(project)}
						>
							Read the case study
							<ArrowUpRight size={15} />
						</button>

						{project.links.source && (
							<a
								className="pcard__source"
								href={project.links.source}
								target="_blank"
								rel="noreferrer"
								aria-label={`${project.title} source on GitHub`}
							>
								<Github size={17} />
							</a>
						)}
					</div>
				</div>
			</TiltCard>
		</Reveal>
	);
}

export default function Projects() {
	const [active, setActive] = useState(null);
	// Stable identity — the modal keys its focus/scroll-lock effect off this.
	const close = useCallback(() => setActive(null), []);

	return (
		<section className="section" id="projects">
			<div className="container">
				<Reveal>
					<p className="eyebrow">Selected work</p>
					<h2 className="section-title">Things I've built</h2>
					<p className="section-lede">
						Four projects, each with the honest version of what was
						hard about it. Source is on GitHub for all of them.
					</p>
				</Reveal>

				<div className="pgrid">
					{PROJECTS.map((project, i) => (
						<ProjectCard
							key={project.id}
							project={project}
							index={i}
							onOpen={setActive}
						/>
					))}
				</div>
			</div>

			<ProjectModal project={active} onClose={close} />
		</section>
	);
}
