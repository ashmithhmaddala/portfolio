import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { EXPERIENCE, PROFILE, PROJECTS, SOCIALS } from "../data/profile";
import { usePageTitle } from "../hooks/usePage";
import "./home.css";

// The three the site should lead with. Everything is on /work.
const FEATURED = PROJECTS.slice(0, 3);

export default function Home() {
	usePageTitle();
	const current = EXPERIENCE.find((role) => role.current);
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

			{current && (
				<section className="section">
					<div className="wrap">
						<h2 className="label">
							<span className="label__num">01</span>
							<span>Currently</span>
							<span className="label__rule" aria-hidden="true" />
						</h2>

						<p className="home__role">
							{current.role}
							<span className="dim">, </span>
							<span className="home__company">
								{current.company}
							</span>
							<span className="home__period mono">
								{current.period}
							</span>
						</p>
						<p className="home__context">{current.context}</p>
						<p className="home__more mono">
							<Link className="link" to="/about">
								Background and how I work
								<ArrowRight size={11} strokeWidth={1.8} />
							</Link>
						</p>
					</div>
				</section>
			)}

			<section className="section">
				<div className="wrap">
					<h2 className="label">
						<span className="label__num">02</span>
						<span>Selected work</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ol className="teasers">
						{FEATURED.map((project) => (
							<li className="teaser" key={project.slug}>
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
										<span className="teaser__tags mono">
											{project.tags.join("  ·  ")}
										</span>
									</span>
									<span className="teaser__period mono">
										{project.period}
									</span>
								</Link>
							</li>
						))}
					</ol>

					<p className="home__more mono">
						<Link className="link" to="/work">
							All {PROJECTS.length} projects
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</p>
				</div>
			</section>

			<section className="section">
				<div className="wrap">
					<h2 className="label">
						<span className="label__num">03</span>
						<span>Get in touch</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>
					<p className="home__cta">
						<a
							className="link"
							href={`mailto:${PROFILE.email}`}
						>
							{PROFILE.email}
						</a>
					</p>
					<p className="home__more mono">
						<Link className="link" to="/contact">
							Other ways to reach me
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</p>
				</div>
			</section>
		</>
	);
}
