import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { GITHUB_USERNAME } from "../data/profile";
import { FEATURED, OTHERS } from "../data/projects";
import { useGitHubStats } from "../hooks/useGitHubStats";
import { usePageTitle } from "../hooks/usePage";
import Reveal from "../components/Reveal";
import "./work.css";

export default function Work() {
	usePageTitle("Work");
	const github = useGitHubStats();

	return (
		<div className="page">
			<div className="wrap">
				<header className="page__head">
					<h1 className="lead page__title">
						Security tooling, mostly. Detection, reconnaissance,
						and one scanner for an attack that did not exist two
						years ago.
					</h1>
					<p className="page__lede">
						Everything here is a solo build with source on GitHub.
						The four below have write-ups covering the
						architecture, the decisions I would defend and the ones
						I would change.
					</p>
				</header>

				<ol className="index">
					{FEATURED.map((project, i) => (
						<Reveal as="li" index={i} className="index__item" key={project.slug}>
							<Link
								className="index__link"
								to={`/work/${project.slug}`}
							>
								<span className="index__num mono">
									{project.num}
								</span>

								<span className="index__body">
									<span className="index__title">
										{project.title}
										{project.status && (
											<span className="index__status mono">
												{project.status}
											</span>
										)}
									</span>
									<span className="index__summary">
										{project.oneLiner}
									</span>
									<span className="index__meta mono">
										{project.stack
											.map((s) => s.name)
											.join("  ·  ")}
									</span>
								</span>

								<span className="index__aside">
									<span className="index__period mono">
										{project.period}
									</span>
									<ArrowUpRight
										size={15}
										strokeWidth={1.6}
										className="index__arrow"
									/>
								</span>
							</Link>
						</Reveal>
					))}
				</ol>

				{/* ------------------------------------------------ others */}
				<section className="others">
					<h2 className="label">
						<span className="label__num">+</span>
						<span>Also built</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ul className="others__list">
						{OTHERS.map((project, i) => {
							// Projects without public source render as a
							// static entry rather than a dead link.
							const Tag = project.source ? "a" : "div";
							const linkProps = project.source
								? {
										href: project.source,
										target: "_blank",
										rel: "noreferrer",
								  }
								: {};

							return (
								<Reveal
									as="li"
									index={i}
									className="others__item"
									key={project.slug}
								>
									<Tag className="others__link" {...linkProps}>
										<span className="others__head">
											<span className="others__title">
												{project.title}
											</span>
											<span className="others__stack mono">
												{project.stackNames.join(" · ")}
											</span>
											{!project.source && (
												<span className="others__private mono">
													not public
												</span>
											)}
										</span>
										<span className="others__line">
											{project.oneLiner}
										</span>
										<span className="others__note">
											{project.note}
										</span>
										{project.source && (
											<ArrowUpRight
												size={14}
												strokeWidth={1.6}
												className="others__arrow"
											/>
										)}
									</Tag>
								</Reveal>
							);
						})}
					</ul>
				</section>

				<p className="work__more mono">
					<a
						className="link"
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noreferrer"
					>
						<Github size={13} strokeWidth={1.6} />
						{github?.repos
							? `All ${github.repos} public repositories`
							: "More on GitHub"}
					</a>
				</p>
			</div>
		</div>
	);
}
