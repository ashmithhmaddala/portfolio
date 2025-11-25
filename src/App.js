import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import ReactGA from "react-ga4";
import { ThemeProvider } from "./context/ThemeContext";

import Homepage from "./pages/homepage";
import About from "./pages/about";
import Projects from "./pages/projects";
import Articles from "./pages/articles";
import ReadArticle from "./pages/readArticle";
import Contact from "./pages/contact";
import Notfound from "./pages/404";
import ThemeToggle from "./components/common/themeToggle";
import LoadingScreen from "./components/common/loadingScreen";

import { TRACKING_ID } from "./data/tracking";
import "./app.css";

function App() {
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		if (TRACKING_ID !== "") {
			ReactGA.initialize(TRACKING_ID);
		}
	}, []);

	useEffect(() => {
		if (loading) {
			document.body.classList.add("no-scroll-overlay");
		} else {
			document.body.classList.remove("no-scroll-overlay");
		}
	}, [loading]);

	return (
		<ThemeProvider>
			{loading && <LoadingScreen onLoadingComplete={() => setLoading(false)} />}
			<div className="App">
				<ThemeToggle />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/articles" element={<Articles />} />
					<Route path="/article/:slug" element={<ReadArticle />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<Notfound />} />
				</Routes>
			</div>
		</ThemeProvider>
	);
}

export default App;
