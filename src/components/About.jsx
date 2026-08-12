import { INTERESTS, PROFILE } from "../data/profile";
import Reveal from "./ui/Reveal";
import "./about.css";

export default function About() {
	return (
		<section className="section" id="about">
			<div className="container aboutGrid">
				<Reveal className="about__media">
					<div className="about__frame">
						<img
							src="/about.jpg"
							alt={`Portrait of ${PROFILE.name}`}
							width="520"
							height="640"
							loading="lazy"
							decoding="async"
						/>
						<span className="about__frameGlow" aria-hidden="true" />
					</div>

					<div className="about__meta">
						<div className="about__metaRow">
							<span className="about__metaKey mono">Based</span>
							<span>{PROFILE.location}</span>
						</div>
						<div className="about__metaRow">
							<span className="about__metaKey mono">Role</span>
							<span>
								{PROFILE.role} @ {PROFILE.company}
							</span>
						</div>
						<div className="about__metaRow">
							<span className="about__metaKey mono">Degree</span>
							<span>B.E. Computer Science, 2026</span>
						</div>
					</div>
				</Reveal>

				<Reveal className="about__body" delay={0.1}>
					<p className="eyebrow">About</p>
					<h2 className="section-title">
						I came into security from the backend.
					</h2>

					<div className="about__prose">
						{PROFILE.bio.map((para) => (
							<p key={para.slice(0, 40)}>{para}</p>
						))}
					</div>

					<h3 className="about__subhead mono">
						Currently thinking about
					</h3>
					<div className="about__interests">
						{INTERESTS.map((item) => (
							<span className="chip" key={item}>
								{item}
							</span>
						))}
					</div>
				</Reveal>
			</div>
		</section>
	);
}
