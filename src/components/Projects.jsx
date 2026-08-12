import { useState } from "react";
import { GITHUB_USERNAME, PROJECTS, SECTIONS } from "../data/profile";
import { useGitHubStats } from "../hooks/useGitHubStats";
import Section from "./Section";
import "./projects.css";

const META = SECTIONS.find((s) => s.id === "projects");

function Project({ project }) {
	const [open, setOpen] = useState(false);
	const panelId = `${project.id}-detail`;

	return (
		<li className={open ? "project is-open" : "project"}>
			<h3>
				<button
					type="button"
					className="project__toggle"
					aria-expanded={open}
					aria-controls={panelId}
					onClick={() => setOpen((v) => !v)}
				>
					<span className="project__num mono">{project.num}</span>

					<span className="project__main">
						<span className="project__title">{project.title}</span>
						<span className="project__summary">
							{project.summary}
						</span>
						<span className="project__stack mono">
							{project.stack.join("  ·  ")}
						</span>
					</span>

					<span className="project__aside">
						<span className="project__period mono">
							{project.period}
						</span>
						{/* Rotates to × when open; purely typographic. */}
						<span className="project__mark" aria-hidden="true">
							+
						</span>
					</span>
				</button>
			</h3>

			{/*
			 * 0fr → 1fr on a grid row animates to the content's natural
			 * height without measuring it in JS. Deliberately not using the
			 * `hidden` attribute — display:none can't be transitioned. The
			 * collapsed panel is taken out of the tab order and the
			 * accessibility tree via `visibility: hidden` in CSS instead.
			 */}
			<div className="project__panel" id={panelId}>
				<div className="project__panelInner">
					<dl className="project__metrics">
						{project.metrics.map((m) => (
							<div className="project__metric" key={m.label}>
								<dt className="project__metricValue mono">
									{m.value}
									{m.estimated && (
										<span
											className="project__est"
											title="Self-reported estimate from the build period, not an independently measured figure."
										>
											est.
										</span>
									)}
								</dt>
								<dd className="project__metricLabel">
									{m.label}
								</dd>
							</div>
						))}
					</dl>

					{project.notes.map((note) => (
						<div className="project__note" key={note.head}>
							<h4 className="project__noteHead mono">
								{note.head}
							</h4>
							<p>{note.body}</p>
						</div>
					))}

					<p className="project__source">
						<a
							className="link mono"
							href={project.source}
							target="_blank"
							rel="noreferrer"
						>
							Source on GitHub
							<span aria-hidden="true"> ↗</span>
						</a>
					</p>
				</div>
			</div>
		</li>
	);
}

export default function Projects() {
	const github = useGitHubStats();

	return (
		<Section id={META.id} num={META.num} label={META.label}>
			<ol className="projects">
				{PROJECTS.map((project) => (
					<Project key={project.id} project={project} />
				))}
			</ol>

			<p className="projects__more mono">
				<a
					className="link"
					href={`https://github.com/${GITHUB_USERNAME}`}
					target="_blank"
					rel="noreferrer"
				>
					{/* Live count when GitHub answers, plain label when not. */}
					{github?.repos
						? `${github.repos} public repositories`
						: "More on GitHub"}
					<span aria-hidden="true"> ↗</span>
				</a>
			</p>
		</Section>
	);
}
