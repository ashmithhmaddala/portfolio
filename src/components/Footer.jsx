import { ArrowUp } from "lucide-react";
import { PROFILE, SOCIALS } from "../data/profile";
import "./footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="container footer__inner">
				<div className="footer__left">
					<p className="footer__name">{PROFILE.name}</p>
					{/*
					 * Colophon — cheaper signal than listing the portfolio
					 * itself as a portfolio project.
					 */}
					<p className="footer__colophon mono">
						Built with React + Vite. Typeset in Inter and JetBrains
						Mono. Deployed on GitHub Pages.
					</p>
				</div>

				<nav className="footer__links" aria-label="Social">
					{SOCIALS.map((social) => (
						<a
							key={social.id}
							href={social.url}
							target={social.id === "mail" ? undefined : "_blank"}
							rel="noreferrer"
						>
							{social.label}
						</a>
					))}
				</nav>

				<div className="footer__right">
					<span className="footer__year mono">
						© {new Date().getFullYear()}
					</span>
					<a
						href="#top"
						className="footer__top"
						aria-label="Back to top"
					>
						<ArrowUp size={15} />
					</a>
				</div>
			</div>
		</footer>
	);
}
