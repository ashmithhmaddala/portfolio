import React from "react";
import "./styles/skills.css";

const Skills = () => {
	return (
		<div className="skills-section">
			<div className="skills-header">
				<div className="skills-title">Technical Skills</div>
				<div className="skills-subtitle">
					Tools and technologies I work with
				</div>
			</div>

			<div className="skills-content">
				<div className="skill-category">
					<div className="category-title">Security</div>
					<div className="skill-tags">
						<span className="skill-tag">Application Security</span>
						<span className="skill-tag">Threat Modelling</span>
						<span className="skill-tag">Secure SDLC</span>
						<span className="skill-tag">Vulnerability Assessment</span>
						<span className="skill-tag">OWASP Top 10</span>
						<span className="skill-tag">Security Code Review</span>
					</div>
				</div>

				<div className="skill-category">
					<div className="category-title">Tools</div>
					<div className="skill-tags">
						<span className="skill-tag">Burp Suite</span>
						<span className="skill-tag">Nmap</span>
						<span className="skill-tag">Wireshark</span>
						<span className="skill-tag">OWASP ZAP</span>
						<span className="skill-tag">Metasploit</span>
					</div>
				</div>

				<div className="skill-category">
					<div className="category-title">Languages</div>
					<div className="skill-tags">
						<span className="skill-tag">Python</span>
						<span className="skill-tag">JavaScript</span>
						<span className="skill-tag">Bash</span>
						<span className="skill-tag">SQL</span>
					</div>
				</div>

				<div className="skill-category">
					<div className="category-title">Platforms</div>
					<div className="skill-tags">
						<span className="skill-tag">Linux</span>
						<span className="skill-tag">Git</span>
						<span className="skill-tag">Docker</span>
						<span className="skill-tag">AWS</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Skills;
