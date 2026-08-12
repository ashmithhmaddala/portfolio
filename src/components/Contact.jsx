import { useEffect, useState } from "react";
import { PROFILE, SECTIONS, SOCIALS } from "../data/profile";
import Section from "./Section";
import "./contact.css";

const META = SECTIONS.find((s) => s.id === "contact");

export default function Contact() {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const timer = setTimeout(() => setCopied(false), 1800);
		return () => clearTimeout(timer);
	}, [copied]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(PROFILE.email);
			setCopied(true);
		} catch {
			// Clipboard unavailable or denied. The mailto link still works.
		}
	};

	return (
		<Section id={META.id} num={META.num} label={META.label}>
			<p className="contact__line">
				<a className="link contact__email" href={`mailto:${PROFILE.email}`}>
					{PROFILE.email}
				</a>
				<button type="button" className="contact__copy mono" onClick={copy}>
					{copied ? "Copied" : "Copy"}
				</button>
			</p>

			<ul className="contact__links mono">
				{SOCIALS.map((social) => (
					<li key={social.id}>
						<span className="contact__key">{social.label}</span>
						<a
							className="link"
							href={social.url}
							target="_blank"
							rel="noreferrer"
						>
							{social.handle}
							<span aria-hidden="true"> ↗</span>
						</a>
					</li>
				))}
			</ul>
		</Section>
	);
}
