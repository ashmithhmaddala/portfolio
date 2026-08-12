import { useEffect, useState } from "react";
import { PROFILE, SECTIONS } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import "./header.css";

export default function Header() {
	const { theme, toggle } = useTheme();
	const [active, setActive] = useState("");

	// Track whichever section owns the upper part of the viewport.
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) setActive(entry.target.id);
				});
			},
			{ rootMargin: "-15% 0px -70% 0px" }
		);

		SECTIONS.forEach(({ id }) => {
			const el = document.getElementById(id);
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	}, []);

	return (
		<header className="header">
			<div className="header__inner wrap">
				<a href="#top" className="header__name">
					{PROFILE.name}
				</a>

				<nav className="header__nav mono" aria-label="Sections">
					{SECTIONS.map((section) => (
						<a
							key={section.id}
							href={`#${section.id}`}
							className={
								active === section.id
									? "header__link is-active"
									: "header__link"
							}
						>
							{section.label}
						</a>
					))}
				</nav>

				<button
					type="button"
					className="header__theme mono"
					onClick={toggle}
					aria-label={`Switch to ${
						theme === "dark" ? "light" : "dark"
					} theme`}
				>
					{theme === "dark" ? "Light" : "Dark"}
				</button>
			</div>
		</header>
	);
}
