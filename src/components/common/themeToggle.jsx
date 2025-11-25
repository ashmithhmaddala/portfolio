import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./themeToggle.css";

const ThemeToggle = () => {
	const { theme, toggleTheme } = useTheme();

	return (
		<button
			className="theme-toggle"
			onClick={toggleTheme}
			aria-label="Toggle theme"
		>
			<FontAwesomeIcon icon={theme === "light" ? faMoon : faSun} />
		</button>
	);
};

export default ThemeToggle;
