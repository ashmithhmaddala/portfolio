import { EXPERIENCE, SECTIONS } from "../data/profile";
import Section from "./Section";
import "./experience.css";

const META = SECTIONS.find((s) => s.id === "experience");

export default function Experience() {
	return (
		<Section id={META.id} num={META.num} label={META.label}>
			<ol className="roles">
				{EXPERIENCE.map((role) => (
					<li className="role" key={role.id}>
						<div className="role__head">
							<h3 className="role__title">
								{role.role}
								<span className="role__at">, </span>
								<span className="role__company">
									{role.company}
								</span>
							</h3>
							<span className="role__period mono">
								{role.period}
							</span>
						</div>

						<ul className="role__notes">
							{role.notes.map((note) => (
								<li key={note}>{note}</li>
							))}
						</ul>
					</li>
				))}
			</ol>
		</Section>
	);
}
