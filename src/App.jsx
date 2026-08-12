import { motion, useScroll, useSpring } from "framer-motion";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
	const { scrollYProgress } = useScroll();
	const progress = useSpring(scrollYProgress, {
		stiffness: 140,
		damping: 26,
		restDelta: 0.001,
	});

	return (
		<>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<motion.div
				className="scrollProgress"
				style={{ scaleX: progress }}
				aria-hidden="true"
			/>

			<Nav />

			<main id="main">
				<Hero />
				<Stats />
				<Experience />
				<Projects />
				<Skills />
				<About />
				<Contact />
			</main>

			<Footer />
			<div className="grain" aria-hidden="true" />
		</>
	);
}
