import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { usePageTitle } from "../hooks/usePage";
import "./notFound.css";

export default function NotFound() {
	usePageTitle("Not found");

	return (
		<div className="page nf">
			<div className="wrap">
				<p className="nf__code mono">404</p>
				<h1 className="lead nf__title">
					There is nothing at this address.
				</h1>
				<ul className="nf__links mono">
					<li>
						<Link className="link" to="/">
							Home
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</li>
					<li>
						<Link className="link" to="/work">
							Work
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</li>
					<li>
						<Link className="link" to="/contact">
							Contact
							<ArrowRight size={11} strokeWidth={1.8} />
						</Link>
					</li>
				</ul>
			</div>
		</div>
	);
}
