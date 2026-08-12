import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, Menu, X, FileText } from "lucide-react";
import { NAV, PROFILE } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import "./nav.css";

export default function Nav() {
	const { theme, toggle } = useTheme();
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);
	const [active, setActive] = useState("");

	// Condense the bar once the hero is behind us.
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 24);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Highlight whichever section currently owns the upper third of the
	// viewport. Cheaper and steadier than recomputing offsets on scroll.
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: "-30% 0px -60% 0px" }
		);

		NAV.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	// Lock the page while the mobile sheet is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	useEffect(() => {
		const onKey = (e) => e.key === "Escape" && setOpen(false);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, []);

	return (
		<>
			<header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
				<div className="nav__inner container">
					<a href="#top" className="nav__brand" aria-label="Back to top">
						<span className="nav__dot" aria-hidden="true" />
						<span className="nav__brandText mono">ashmith</span>
					</a>

					<nav className="nav__links" aria-label="Primary">
						{NAV.map((item) => (
							<a
								key={item.id}
								href={`#${item.id}`}
								className={`nav__link ${
									active === item.id ? "is-active" : ""
								}`}
							>
								{item.label}
								{active === item.id && (
									<motion.span
										layoutId="nav-underline"
										className="nav__underline"
										transition={{
											type: "spring",
											stiffness: 400,
											damping: 32,
										}}
									/>
								)}
							</a>
						))}
					</nav>

					<div className="nav__actions">
						<button
							className="nav__iconBtn"
							onClick={toggle}
							aria-label={`Switch to ${
								theme === "dark" ? "light" : "dark"
							} theme`}
						>
							{theme === "dark" ? (
								<Sun size={17} />
							) : (
								<Moon size={17} />
							)}
						</button>

						<a
							className="btn btn--ghost nav__resume"
							href={PROFILE.resumeUrl}
							target="_blank"
							rel="noreferrer"
						>
							<FileText size={15} />
							Resume
						</a>

						<button
							className="nav__iconBtn nav__burger"
							onClick={() => setOpen((v) => !v)}
							aria-label={open ? "Close menu" : "Open menu"}
							aria-expanded={open}
						>
							{open ? <X size={19} /> : <Menu size={19} />}
						</button>
					</div>
				</div>
			</header>

			{open && (
				<motion.div
					className="navSheet"
					initial={{ opacity: 0, y: -12 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
				>
					{NAV.map((item, i) => (
						<a
							key={item.id}
							href={`#${item.id}`}
							className="navSheet__link"
							onClick={() => setOpen(false)}
						>
							<span className="mono navSheet__num">
								{String(i + 1).padStart(2, "0")}
							</span>
							{item.label}
						</a>
					))}
					<a
						className="navSheet__link"
						href={PROFILE.resumeUrl}
						target="_blank"
						rel="noreferrer"
						onClick={() => setOpen(false)}
					>
						{/* Continues the numbering rather than restarting it. */}
						<span className="mono navSheet__num">
							{String(NAV.length + 1).padStart(2, "0")}
						</span>
						Resume
					</a>
				</motion.div>
			)}
		</>
	);
}
