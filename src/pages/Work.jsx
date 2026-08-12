import { Link } from "react-router-dom";
import { ArrowUpRight, Github } from "lucide-react";
import { GITHUB_USERNAME, PROJECTS } from "../data/profile";
import { useGitHubStats } from "../hooks/useGitHubStats";
import { usePageTitle } from "../hooks/usePage";
import "./work.css";

export default function Work() {
	usePageTitle("Work");
	const github = useGitHubStats();

	return (
		<div className="page">
			<div className="wrap">
				<header className="page__head">
					<h1 className="lead page__title">
						Four projects, with the honest version of what was hard
						about each.
					</h1>
					<p className="page__lede">
						Every one is a solo build with source on GitHub. The
						case studies cover the architecture, the decisions I
						would defend, and the ones I would change.
					</p>
				</header>

				<ol className="index">
					{PROJECTS.map((project) => (
						<li className="index__item" key={project.slug}>
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
									</span>
									<span className="index__summary">
										{project.summary}
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
						</li>
					))}
				</ol>

				<p className="work__more mono">
					<a
						className="link"
						href={`https://github.com/${GITHUB_USERNAME}`}
						target="_blank"
						rel="noreferrer"
					>
						<Github size={13} strokeWidth={1.6} />
						{github?.repos
							? `${github.repos} public repositories`
							: "More on GitHub"}
					</a>
				</p>
			</div>
		</div>
	);
}
