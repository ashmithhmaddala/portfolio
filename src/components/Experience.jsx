import { EXPERIENCE } from "../data/profile";
import Reveal from "./ui/Reveal";
import "./experience.css";

export default function Experience() {
	return (
		<section className="section" id="work">
			<div className="container">
				<Reveal>
					<p className="eyebrow">Where I've been</p>
					<h2 className="section-title">Experience</h2>
					<p className="section-lede">
						The short version: I learned to build things, then
						learned how they get broken.
					</p>
				</Reveal>

				<ol className="timeline">
					{EXPERIENCE.map((item, i) => (
						<Reveal
							as="li"
							key={item.id}
							delay={i * 0.1}
							className="timeline__item"
						>
							<span
								className={`timeline__node ${
									item.current ? "is-current" : ""
								}`}
								aria-hidden="true"
							/>

							<div className="timeline__head">
								<h3 className="timeline__role">{item.role}</h3>
								<span className="timeline__period mono">
									{item.period}
								</span>
							</div>

							<p className="timeline__company">
								<span className="timeline__companyName">
									{item.company}
								</span>
								<span className="timeline__sep">·</span>
								<span className="timeline__location">
									{item.location}
								</span>
								{item.current && (
									<span className="timeline__badge">
										Current
									</span>
								)}
							</p>

							<p className="timeline__summary">{item.summary}</p>

							<ul className="timeline__points">
								{item.highlights.map((point) => (
									<li key={point}>{point}</li>
								))}
							</ul>

							<div className="timeline__stack">
								{item.stack.map((tech) => (
									<span className="chip" key={tech}>
										{tech}
									</span>
								))}
							</div>
						</Reveal>
					))}
				</ol>
			</div>
		</section>
	);
}
