import { useEffect, useState } from "react";
import { ArrowUpRight, Check, Copy, FileText, Github, Linkedin } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/profile";
import { usePageTitle } from "../hooks/usePage";
import "./contact.css";

const ICONS = { github: Github, linkedin: Linkedin };

export default function Contact() {
	usePageTitle("Contact");
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
			// Clipboard blocked or unavailable. The mailto link still works.
		}
	};

	return (
		<div className="page">
			<div className="wrap">
				<h1 className="lead contact__title">
					Email is the reliable way to reach me.
				</h1>

				<p className="contact__line">
					<a
						className="link contact__email"
						href={`mailto:${PROFILE.email}`}
					>
						{PROFILE.email}
					</a>
					<button
						type="button"
						className="contact__copy mono"
						onClick={copy}
					>
						{copied ? (
							<>
								<Check size={12} strokeWidth={2} />
								Copied
							</>
						) : (
							<>
								<Copy size={12} strokeWidth={1.8} />
								Copy
							</>
						)}
					</button>
				</p>

				<section className="contact__topics">
					<h2 className="label">
						<span className="label__num">01</span>
						<span>Worth writing about</span>
						<span className="label__rule" aria-hidden="true" />
					</h2>
					<ul className="contact__topicList">
						{PROFILE.contactTopics.map((topic) => (
							<li key={topic}>{topic}</li>
						))}
					</ul>
				</section>

				<h2 className="label">
					<span className="label__num">02</span>
					<span>Elsewhere</span>
					<span className="label__rule" aria-hidden="true" />
				</h2>

				<ul className="contact__links">
					{SOCIALS.map((social) => {
						const Icon = ICONS[social.id];
						return (
							<li key={social.id}>
								<a
									className="contact__card"
									href={social.url}
									target="_blank"
									rel="noreferrer"
								>
									<span className="contact__cardLabel">
										{Icon && (
											<Icon
												size={14}
												strokeWidth={1.6}
											/>
										)}
										{social.label}
									</span>
									<span className="contact__cardHandle mono">
										{social.handle}
									</span>
									<ArrowUpRight
										size={14}
										strokeWidth={1.6}
										className="contact__cardArrow"
									/>
								</a>
							</li>
						);
					})}

					<li>
						<a
							className="contact__card"
							href={PROFILE.resumeUrl}
							target="_blank"
							rel="noreferrer"
						>
							<span className="contact__cardLabel">
								<FileText size={14} strokeWidth={1.6} />
								Résumé
							</span>
							<span className="contact__cardHandle mono">
								PDF
							</span>
							<ArrowUpRight
								size={14}
								strokeWidth={1.6}
								className="contact__cardArrow"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
	);
}
