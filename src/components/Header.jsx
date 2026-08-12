import { Link, NavLink } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import { NAV, PROFILE } from "../data/profile";
import { useTheme } from "../hooks/useTheme";
import "./header.css";

export default function Header() {
	const { theme, toggle } = useTheme();

	return (
		<header className="header">
			<div className="header__inner wrap">
				<Link to="/" className="header__name">
					{PROFILE.name}
				</Link>

				<nav className="header__nav mono" aria-label="Primary">
					{NAV.map((item) => (
						<NavLink
							key={item.to}
							to={item.to}
							className={({ isActive }) =>
								isActive
									? "header__link is-active"
									: "header__link"
							}
						>
							{item.label}
						</NavLink>
					))}

					<button
						type="button"
						className="header__theme"
						onClick={toggle}
						aria-label={`Switch to ${
							theme === "dark" ? "light" : "dark"
						} theme`}
					>
						{theme === "dark" ? (
							<Sun size={15} strokeWidth={1.6} />
						) : (
							<Moon size={15} strokeWidth={1.6} />
						)}
					</button>
				</nav>
			</div>
		</header>
	);
}
