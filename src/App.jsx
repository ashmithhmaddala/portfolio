import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Work from "./pages/Work";
import WorkDetail from "./pages/WorkDetail";
import Lab from "./pages/Lab";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { useScrollToTop } from "./hooks/usePage";

export default function App() {
	const { pathname } = useLocation();
	useScrollToTop(pathname);

	return (
		<>
			<a className="skip-link" href="#main">
				Skip to content
			</a>

			<Header />

			<main id="main">
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/work" element={<Work />} />
					<Route path="/work/:slug" element={<WorkDetail />} />
					<Route path="/lab" element={<Lab />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>

			<Footer />
		</>
	);
}
