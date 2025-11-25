import React, { useEffect, useRef, useState } from "react";
import "./fadeInSection.css";

const FadeInSection = ({ children, delay = 0 }) => {
	const [isVisible, setVisible] = useState(false);
	const domRef = useRef();

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					setVisible(true);
					observer.unobserve(entry.target);
				}
			});
		});

		const currentRef = domRef.current;
		if (currentRef) {
			observer.observe(currentRef);
		}

		return () => {
			if (currentRef) {
				observer.unobserve(currentRef);
			}
		};
	}, []);

	return (
		<div
			className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
			style={{ transitionDelay: `${delay}ms` }}
			ref={domRef}
		>
			{children}
		</div>
	);
};

export default FadeInSection;
