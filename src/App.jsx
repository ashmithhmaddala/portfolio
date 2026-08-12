import Header from "./components/Header";
import Intro from "./components/Intro";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Stack from "./components/Stack";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
	return (
		<>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<Header />

			<main id="main">
				<Intro />
				<Experience />
				<Projects />
				<Stack />
				<About />
				<Contact />
			</main>

			<Footer />
		</>
	);
}
