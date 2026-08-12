import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, Github } from "lucide-react";
import { PROJECTS } from "../data/profile";
import { usePageTitle } from "../hooks/usePage";
import Diagram from "../components/diagrams/Diagrams";
import NotFound from "./NotFound";
import "./workDetail.css";

function Block({ label, children }) {
	return (
		<section className="block">
			<h2 className="block__label mono">{label}</h2>
			<div className="block__body">{children}</div>
		</section>
	);
}

export default function WorkDetail() {
	const { slug } = useParams();
	const index = PROJECTS.findIndex((p) => p.slug === slug);
	const project = PROJECTS[index];

	/*
	 * Hooks must run before the early return. The fallback string matters:
	 * child effects fire before parent ones, so NotFound's own title call
	 * would otherwise be overwritten by this one a moment later.
	 */
	usePageTitle(project ? project.title : "Not found");

	if (!project) return <NotFound />;

	const prev = PROJECTS[index - 1];
	const next = PROJECTS[index + 1];

	return (
		<article className="page">
			<div className="wrap">
				<p className="detail__back mono">
					<Link className="link" to="/work">
						<ArrowLeft size={12} strokeWidth={1.8} />
						Work
					</Link>
				</p>

				<header className="detail__head">
					<p className="detail__meta mono">
						<span className="detail__num">{project.num}</span>
						<span>{project.period}</span>
						<span>{project.role}</span>
					</p>

					<h1 className="detail__title">{project.title}</h1>
					<p className="detail__lede">{project.oneLiner}</p>

					<dl className="detail__metrics">
						{project.metrics.map((m) => (
							<div className="detail__metric" key={m.label}>
								<dt className="detail__metricValue mono">
									{m.value}
									{m.estimated && (
										<span
											className="detail__est"
											title="Self-reported estimate from the build period, not an independently measured figure."
										>
											est.
										</span>
									)}
								</dt>
								<dd className="detail__metricLabel mono">
									{m.label}
								</dd>
							</div>
						))}
					</dl>
				</header>

				<Diagram
					id={project.diagram}
					caption={project.diagramCaption}
				/>

				<Block label="Context">
					<p>{project.context}</p>
				</Block>

				<Block label="Architecture">
					<p>{project.architecture}</p>
				</Block>

				<Block label="Decisions">
					<ol className="decisions">
						{project.decisions.map((decision, i) => (
							<li className="decision" key={decision.title}>
								<span className="decision__num mono">
									{String(i + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="decision__title">
										{decision.title}
									</h3>
									<p>{decision.body}</p>
								</div>
							</li>
						))}
					</ol>
				</Block>

				<Block label="The hard part">
					<p>{project.hardPart}</p>
				</Block>

				<Block label="What I would change">
					<p>{project.retrospective}</p>
				</Block>

				<Block label="Outcome">
					<p>{project.outcome}</p>
				</Block>

				<Block label="Stack">
					<dl className="why">
						{project.stack.map((tech) => (
							<div className="why__row" key={tech.name}>
								<dt className="why__name mono">{tech.name}</dt>
								<dd className="why__reason">{tech.why}</dd>
							</div>
						))}
					</dl>
				</Block>

				<p className="detail__source mono">
					<a
						className="link"
						href={project.source}
						target="_blank"
						rel="noreferrer"
					>
						<Github size={13} strokeWidth={1.6} />
						Source on GitHub
					</a>
				</p>

				<nav className="pager mono" aria-label="Projects">
					{prev ? (
						<Link className="pager__link" to={`/work/${prev.slug}`}>
							<ArrowLeft size={12} strokeWidth={1.8} />
							<span>
								<span className="pager__dir">Previous</span>
								{prev.title}
							</span>
						</Link>
					) : (
						<span />
					)}

					{next && (
						<Link
							className="pager__link pager__link--next"
							to={`/work/${next.slug}`}
						>
							<span>
								<span className="pager__dir">Next</span>
								{next.title}
							</span>
							<ArrowRight size={12} strokeWidth={1.8} />
						</Link>
					)}
				</nav>
			</div>
		</article>
	);
}
