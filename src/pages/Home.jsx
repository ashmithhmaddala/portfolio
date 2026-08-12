import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, GitCommitHorizontal } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/profile";
import { FEATURED } from "../data/projects";
import { relativeTime, useGitHubStats } from "../hooks/useGitHubStats";
import { usePageTitle } from "../hooks/usePage";
import Reveal from "../components/Reveal";
import "./home.css";

/*
 * The landing page. Deliberately does not restate the role detail (that is
 * /about), the full project metadata (/work) or the contact block
 * (/contact). What it has that no other page does is live push activity.
 */
const LEAD = FEATURED.slice(0, 3);

export default function Home() {
	usePageTitle();
	const github = useGitHubStats();
	const [first, ...rest] = PROFILE.intro;

	return (
		<>
			<section className="intro">
				<div className="wrap">
					<h1 className="lead intro__lead">{first}</h1>

					<div className="prose intro__prose">
						{rest.map((para) => (
							<p key={para.slice(0, 32)}>{para}</p>
						))}
					</div>

					<dl className="spec">
						{PROFILE.spec.map((row) => (
							<div className="spec__row" key={row.key}>
								<dt className="spec__key mono">{row.key}</dt>
								<dd className="spec__value">{row.value}</dd>
							</div>
						))}
					</dl>

					<p className="intro__links mono">
						{SOCIALS.map((social) => (
							<a
								key={social.id}
								className="link"
								href={social.url}
								target="_blank"
								rel="noreferrer"
							>
								{social.label}
								<ArrowUpRight size={11} strokeWidth={1.8} />
							</a>
						))}
						<a
							className="link"
							href={PROFILE.resumeUrl}
							target="_blank"
							rel="noreferrer"
						>
							Résumé
							<ArrowUpRight size={11} strokeWidth={1.8} />
						</a>
					</p>
				</div>
			</section>

			{/* ------------------------------------------- live activity */}
			{github?.recent?.length > 0 && (
				<section className="section">
					<div className="wrap">
						<h2 className="label">
							<span className="label__num">01</span>
							<span>Latest pushes</span>
							<span className="label__rule" aria-hidden="true" />
						</h2>

						<ul className="activity">
							{github.recent.map((repo, i) => (
								<Reveal
									as="li"
									index={i}
									className="activity__item"
									key={repo.name}
								>
									<a
										className="activity__link"
										href={repo.url}
										target="_blank"
										rel="noreferrer"
									>
										<GitCommitHorizontal
											size={14}
											strokeWidth={1.6}
											className="activity__icon"
										/>
										<span className="activity__name mono">
											{repo.name}
										</span>
										{repo.language && (
											<span className="activity__lang mono">
												{repo.language}
											</span>
										)}
										<span className="activity__when mono">
											{relativeTime(repo.pushedAt)}
										</span>
									</a>
								</Reveal>
							))}
						</ul>

						<p className="home__more mono">
							Pulled live from the GitHub API.
						</p>
					</div>
				</section>
			)}

			{/* ------------------------------------------- work pointers */}
			<section className="section">
				<div className="wrap">
					<h2 className="label">
						<span className="label__num">
							{github?.recent?.length > 0 ? "02" : "01"}
						</span>
						<span>Start here</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ol className="teasers">
						{LEAD.map((project, i) => (
							<Reveal
								as="li"
								index={i}
								className="teaser"
								key={project.slug}
							>
								<Link
									className="teaser__link"
									to={`/work/${project.slug}`}
								>
									<span className="teaser__num mono">
										{project.num}
									</span>
									<span className="teaser__body">
										<span className="teaser__title">
											{project.title}
										</span>
										<span className="teaser__line">
											{project.oneLiner}
										</span>
									</span>
									<ArrowRight
										size={14}
										strokeWidth={1.6}
										className="teaser__arrow"
									/>
								</Link>
							</Reveal>
						))}
					</ol>

					<p className="home__more mono">
						<Link className="link" to="/lab">
							Or try them in the lab
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</p>
				</div>
			</section>
		</>
	);
}
