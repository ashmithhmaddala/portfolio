import { PROFILE, SECTIONS } from "../data/profile";
import Section from "./Section";
import "./about.css";

const META = SECTIONS.find((s) => s.id === "about");

export default function About() {
	return (
		<Section id={META.id} num={META.num} label={META.label}>
			<div className="about">
				<div className="prose about__prose">
					{PROFILE.about.map((para) => (
						<p key={para.slice(0, 32)}>{para}</p>
					))}
				</div>

				<figure className="about__figure">
					<img
						src="/about.jpg"
						alt={PROFILE.name}
						width="440"
						height="550"
						loading="lazy"
						decoding="async"
					/>
					<figcaption className="mono">
						{PROFILE.location}
					</figcaption>
				</figure>
			</div>
		</Section>
	);
}
