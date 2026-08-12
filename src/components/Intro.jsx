import { PROFILE, SOCIALS } from "../data/profile";
import "./intro.css";

export default function Intro() {
	const [first, ...rest] = PROFILE.intro;

	return (
		<section className="intro" id="top">
			<div className="wrap">
				<h1 className="lead intro__lead">{first}</h1>

				<div className="prose intro__prose">
					{rest.map((para) => (
						<p key={para.slice(0, 32)}>{para}</p>
					))}
				</div>

				<dl className="spec">
					{PROFILE.spec.map((row) => (
						<div className="spec__row" key={row.key}>
							<dt className="spec__key mono">{row.key}</dt>
							<dd className="spec__value">{row.value}</dd>
						</div>
					))}
				</dl>

				<p className="intro__links mono">
					{SOCIALS.map((social) => (
						<a
							key={social.id}
							className="link"
							href={social.url}
							target="_blank"
							rel="noreferrer"
						>
							{social.label}
							<span aria-hidden="true"> ↗</span>
						</a>
					))}
					<a className="link" href={PROFILE.resumeUrl} target="_blank" rel="noreferrer">
						Résumé
						<span aria-hidden="true"> ↗</span>
					</a>
				</p>
			</div>
		</section>
	);
}
