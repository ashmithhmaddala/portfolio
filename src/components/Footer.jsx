import "./footer.css";

export default function Footer() {
	return (
		<footer className="footer">
			<div className="wrap footer__inner mono">
				<span>© {new Date().getFullYear()} Ashmith Maddala</span>
				<span className="footer__colophon">
					Set in IBM Plex. Built with React and Vite. Hosted on
					GitHub Pages.
				</span>
			</div>
		</footer>
	);
}
