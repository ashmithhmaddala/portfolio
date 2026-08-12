import { CERTIFICATIONS, COMMUNITY, EXPERIENCE, PROFILE, STACK } from "../data/profile";
import { usePageTitle } from "../hooks/usePage";
import "./about.css";

export default function About() {
	usePageTitle("About");

	return (
		<div className="page">
			<div className="wrap">
				<header className="about__head">
					<div className="prose about__prose">
						{PROFILE.about.map((para, i) => (
							<p
								key={para.slice(0, 32)}
								className={i === 0 ? "about__opening" : undefined}
							>
								{para}
							</p>
						))}
					</div>

					<figure className="about__figure">
						<img
							src="/about.jpg"
							alt={PROFILE.name}
							width="440"
							height="550"
							loading="eager"
							decoding="async"
						/>
						<figcaption className="mono">
							{PROFILE.location}
						</figcaption>
					</figure>
				</header>

				{/* ------------------------------------------ principles */}
				<section className="about__section">
					<h2 className="label">
						<span className="label__num">01</span>
						<span>How I work</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ol className="principles">
						{PROFILE.principles.map((principle, i) => (
							<li className="principle" key={principle.title}>
								<span className="principle__num mono">
									{String(i + 1).padStart(2, "0")}
								</span>
								<div>
									<h3 className="principle__title">
										{principle.title}
									</h3>
									<p>{principle.body}</p>
								</div>
							</li>
						))}
					</ol>
				</section>

				{/* ------------------------------------------ experience */}
				<section className="about__section">
					<h2 className="label">
						<span className="label__num">02</span>
						<span>Background</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ol className="roles">
						{EXPERIENCE.map((role) => (
							<li className="role" key={role.id}>
								<div className="role__head">
									<h3 className="role__title">
										{role.role}
										<span className="dim">, </span>
										<span className="role__company">
											{role.company}
										</span>
									</h3>
									<span className="role__period mono">
										{role.period}
									</span>
								</div>

								<p className="role__context">{role.context}</p>

								<ul className="role__notes">
									{role.notes.map((note) => (
										<li key={note}>{note}</li>
									))}
								</ul>
							</li>
						))}
					</ol>
				</section>

				{/* ------------------------------------------- community */}
				<section className="about__section">
					<h2 className="label">
						<span className="label__num">03</span>
						<span>Community</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<ul className="community">
						{COMMUNITY.map((item) => (
							<li className="community__item" key={item.title}>
								<div className="community__head">
									<h3 className="community__title">
										{item.title}
									</h3>
									<span className="community__role mono">
										{item.role}
									</span>
								</div>
								<p className="community__detail">
									{item.detail}
								</p>
							</li>
						))}
					</ul>
				</section>

				{/* --------------------------------------- certifications */}
				<section className="about__section">
					<h2 className="label">
						<span className="label__num">04</span>
						<span>Certifications</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<dl className="certs">
						{CERTIFICATIONS.map((cert) => (
							<div className="certs__row" key={cert.name}>
								<dt className="certs__name">
									{cert.name}
									{cert.status === "pursuing" && (
										<span className="certs__pursuing mono">
											in progress
										</span>
									)}
								</dt>
								<dd className="certs__meta mono">
									{cert.issuer}
									<span className="certs__date">
										{cert.date}
									</span>
								</dd>
							</div>
						))}
					</dl>
				</section>

				{/* ----------------------------------------------- stack */}
				<section className="about__section">
					<h2 className="label">
						<span className="label__num">05</span>
						<span>Stack</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>

					<dl className="stack">
						{STACK.map((group) => (
							<div className="stack__row" key={group.group}>
								<dt className="stack__group">
									<span className="mono">{group.group}</span>
									<span className="stack__note">
										{group.note}
									</span>
								</dt>
								<dd className="stack__items">
									{group.items.join(", ")}
								</dd>
							</div>
						))}
					</dl>
				</section>
			</div>
		</div>
	);
}
