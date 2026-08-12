import { useState } from "react";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/profile";
import Reveal from "./ui/Reveal";
import "./contact.css";

export default function Contact() {
	const [copied, setCopied] = useState(false);

	const copyEmail = async () => {
		try {
			await navigator.clipboard.writeText(PROFILE.email);
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Clipboard blocked (insecure context or denied permission) —
			// the mailto link beside this button still works.
		}
	};

	return (
		<section className="section" id="contact">
			<div className="container">
				<Reveal className="contact">
					<span className="contact__glow" aria-hidden="true" />

					<div className="contact__inner">
						<p className="eyebrow">Contact</p>
						<h2 className="contact__title">
							Got something worth building?
						</h2>
						<p className="contact__lede">
							Security work, backend problems, or an argument
							about query planners — all welcome. I read
							everything and reply to anything that isn't a
							recruiter template.
						</p>

						<div className="contact__actions">
							<a
								className="btn btn--primary"
								href={`mailto:${PROFILE.email}`}
							>
								{PROFILE.email}
								<ArrowUpRight size={16} />
							</a>
							<button
								type="button"
								className="btn btn--ghost"
								onClick={copyEmail}
							>
								{copied ? (
									<>
										<Check size={15} /> Copied
									</>
								) : (
									<>
										<Copy size={15} /> Copy address
									</>
								)}
							</button>
						</div>

						<div className="contact__grid">
							{SOCIALS.map((social) => (
								<a
									key={social.id}
									className="contactCard"
									href={social.url}
									target={
										social.id === "mail"
											? undefined
											: "_blank"
									}
									rel="noreferrer"
								>
									<span className="contactCard__label">
										{social.label}
									</span>
									<span className="contactCard__handle mono">
										{social.handle}
									</span>
									<ArrowUpRight
										size={15}
										className="contactCard__arrow"
									/>
								</a>
							))}
						</div>
					</div>
				</Reveal>
			</div>
		</section>
	);
}
