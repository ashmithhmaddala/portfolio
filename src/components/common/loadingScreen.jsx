import React, { useState, useEffect } from "react";
import "./loadingScreen.css";

const LoadingScreen = ({ onLoadingComplete }) => {
	const greetings = [
		"Hello",
		"Bonjour",
		"Hallo",
		"नमस्ते",
		"Ciao",
		"Hola",
		"こんにちは",
		"안녕하세요",
	];

	const [currentGreeting, setCurrentGreeting] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);

	useEffect(() => {
		if (currentGreeting < greetings.length) {
			const timer = setTimeout(() => {
				setCurrentGreeting(currentGreeting + 1);
			}, 400);
			return () => clearTimeout(timer);
		} else {
			const fadeTimer = setTimeout(() => {
				setFadeOut(true);
			}, 400);

			const completeTimer = setTimeout(() => {
				onLoadingComplete();
			}, 1600);

			return () => {
				clearTimeout(fadeTimer);
				clearTimeout(completeTimer);
			};
		}
	}, [currentGreeting, greetings.length, onLoadingComplete]);

	return (
		<div className={`loading-screen ${fadeOut ? "fade-out" : ""}`}>
			<div className="greeting-container">
				{currentGreeting < greetings.length && (
					<h1 className="greeting-text">{greetings[currentGreeting]}</h1>
				)}
			</div>
		</div>
	);
};

export default LoadingScreen;
