import { Link } from "react-router-dom";
import { NAV, SOCIALS } from "../data/profile";
import "./footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="wrap footer__inner">
				<nav className="footer__nav mono" aria-label="Footer">
					<Link to="/">Home</Link>
					{NAV.map((item) => (
						<Link key={item.to} to={item.to}>
							{item.label}
						</Link>
					))}
					{SOCIALS.map((social) => (
						<a
							key={social.id}
							href={social.url}
							target="_blank"
							rel="noreferrer"
						>
							{social.label}
						</a>
					))}
				</nav>

				<div className="footer__meta mono">
					<span>© {new Date().getFullYear()} Ashmith Maddala</span>
					<span className="footer__colophon">
						Set in IBM Plex. Built with React and Vite. Hosted on
						GitHub Pages.
					</span>
				</div>
			</div>
		</footer>
	);
}
