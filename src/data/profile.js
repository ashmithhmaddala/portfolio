/*
 * Identity, background and stack. Projects live in ./projects.js.
 *
 * House style for the copy: short declarative sentences. State the thing and
 * stop. No rhetorical questions, no "not just X but Y", no three-item lists
 * for rhythm, no em-dash asides. If a sentence sounds like it was written to
 * sound good, cut it.
 */

export const PROFILE = {
	name: "Ashmith Maddala",
	role: "Junior Product Security Engineer",
	company: "Vontier",
	location: "Bengaluru, India",
	email: "ashmith.maddala@gmail.com",
	resumeUrl: "/resume.pdf",

	intro: [
		"I'm a product security engineer at Vontier, in Bengaluru.",
		"Vontier is the parent company of Gilbarco Veeder-Root, so the products are connected fuel-retail and mobility hardware. Long field lifecycles, firmware that ships and stays put. My work sits across cloud posture on AWS and Azure, STRIDE threat models for the product lines, and getting security scanning into the pipelines that build them.",
		"Outside that I build security tooling. Detection engineering, forensic attribution for agent systems, and a scanner for a class of attack that only exists because models read documents people don't.",
	],

	spec: [
		{ key: "Role", value: "Junior Product Security Engineer, Vontier" },
		{ key: "Location", value: "Bengaluru, India" },
		{ key: "Focus", value: "Cloud and product security, offensive security, AI/agent security" },
		{ key: "Certified", value: "eJPT · HTB COAE in progress" },
	],

	/*
	 * Deliberately not a restatement of the home-page intro. That page says
	 * what I do now. This one is about how I got here and what the tools have
	 * in common.
	 */
	about: [
		"I build tools that read what people skim. Tool manifests, log lines, packet timing, the way a pointer moves across a screen. Each one is looking for signal somewhere nobody reads carefully, which turns out to be where a lot of it sits.",
		"Most of it started in competition. I ran the university's security club, played CTFs to a national top-fifteen finish, and organised one for a hundred and seventy people. Nearly every tool in the work section began as something I wanted at two in the morning during a competition and could not find.",
		"Before any of that I built backends, and that is still where the instincts come from. Flask and Node teach you that systems rarely fail at the clever part. They fail at the auth check someone skipped, the input nobody validated, the dependency pinned two years ago and never looked at since.",
		"There is a bias running through the tooling that took me four projects to notice. Every one of them would rather report its own limits than hand you a verdict. theriac publishes the recall figure it was actually measured at, including how bad the first version was. The beaconing detector shows you the jitter level where it stops working. A security tool that overclaims seems worse to me than no tool at all, because someone will trust it.",
		"Away from a screen I run, I am slowly learning German, and I play too much Valorant.",
	],

	/*
	 * Contact page only. Edit freely — this is a preference, and I inferred
	 * it from what you build rather than from anything you told me.
	 */
	contactTopics: [
		"Product security, especially on hardware with a long field life",
		"Detection engineering and anything ATT&CK-shaped",
		"MCP security, or telling me theriac got a server wrong",
		"Query optimisation, join ordering, and planners that learn",
	],

	principles: [
		{
			title: "The default should be deny",
			body: "A system where adding a route means remembering to protect it will eventually ship an unprotected route. Put the check where it cannot be forgotten, not where it has to be repeated.",
		},
		{
			title: "Find it before the design locks",
			body: "A threat model during design costs a conversation. The same finding after implementation costs a rewrite, and after shipping to field hardware it costs a firmware campaign.",
		},
		{
			title: "A tool that scans should never execute",
			body: "Anything that runs what it is inspecting becomes a delivery mechanism for the thing it was looking for. Read the metadata. Do not invoke the tool.",
		},
		{
			title: "Fewer alerts, or none of them get read",
			body: "A detection system producing more output than a human can read has not improved security. It has moved the failure somewhere less visible.",
		},
		{
			title: "Evaluate against something you did not write",
			body: "Testing a detector on your own examples measures how well it matches your own assumptions. An external benchmark is the only place the number starts to mean anything. theriac scored 8% the first time it met one.",
		},
		{
			title: "Say what the result cannot support",
			body: "A clean scan from a heuristic detector is evidence, not a guarantee. Stating the miss rate is not hedging. It is the difference between a tool and a false sense of safety.",
		},
	],
};

export const SOCIALS = [
	{
		id: "github",
		label: "GitHub",
		handle: "ashmithhmaddala",
		url: "https://github.com/ashmithhmaddala",
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		handle: "ashmith-maddala",
		url: "https://www.linkedin.com/in/ashmith-maddala/",
	},
	{
		id: "x",
		label: "X",
		handle: "axmxtxh",
		url: "https://x.com/axmxtxh",
	},
];

export const NAV = [
	{ to: "/work", label: "Work" },
	{ to: "/lab", label: "Lab" },
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
];

export const EXPERIENCE = [
	{
		id: "vontier-ft",
		company: "Vontier",
		role: "Junior Product Security Engineer",
		period: "Jul 2026 –",
		current: true,
		context:
			"Vontier is the parent company of Gilbarco Veeder-Root. The products are connected fuel-retail and mobility hardware, which means long support lifecycles and firmware that goes to the field and stays there. Converted from a twelve-month internship.",
		notes: [
			"Cloud security posture management across AWS and Azure through Microsoft Defender for Cloud.",
			"STRIDE threat modelling across more than ten product lines.",
			"Rolled out GitHub Advanced Security across twenty-plus repositories.",
			"Integrated SAST, DAST and SCA into build pipelines, so findings surface during development rather than after it.",
		],
	},
	{
		id: "vontier-intern",
		company: "Vontier",
		role: "Product Security Intern",
		period: "Jul 2025 – Jul 2026",
		current: false,
		context:
			"A twelve-month internship carrying ten academic credits, graded O. Converted to a full-time offer at the end of it.",
		notes: [
			"Same problem space as the full-time role, working into the product security function.",
		],
	},
	{
		id: "nhce",
		company: "New Horizon College of Engineering",
		role: "B.E. Computer Science & Engineering",
		period: "2022 – 2026",
		current: false,
		context:
			"VTU-affiliated, Bengaluru. Graduated May 2026 with a CGPA of 8.80.",
		notes: [
			"President of the Cybersecurity and Ethical Hacking Club.",
			"Top-15 nationally in CTF competition.",
			"Final-year research on reinforcement learning for SQL query optimisation, specifically adaptive policy-based join ordering.",
		],
	},
];

export const CERTIFICATIONS = [
	{ name: "eJPT", issuer: "INE Security", date: "Jun 2026", status: "held" },
	{
		name: "Certified Offensive AI Expert (COAE)",
		issuer: "Hack The Box",
		date: "In progress",
		status: "pursuing",
	},
];

/*
 * Community work. Organising and teaching is the part of a security CV that
 * usually goes missing, and it is the part that shows you can explain things.
 */
export const COMMUNITY = [
	{
		title: "Protocol Zero",
		role: "Organiser",
		detail:
			"Ran a capture-the-flag competition for over 170 participants, from challenge design through to infrastructure and scoring.",
	},
	{
		title: "GlobalCorp Breach",
		role: "Room author, TryHackMe",
		detail:
			"An incident-response room built as a multi-stage virtual machine across three stages, with easter-egg flags for people who go looking.",
	},
	{
		title: "Cybersecurity and Ethical Hacking Club, NHCE",
		role: "President",
		detail:
			"Led the university's security club through sessions, competitions and recruitment.",
	},
	{
		title: "Competitive CTF",
		role: "Top 15 nationally",
		detail:
			"Placed inside the national top fifteen. Most of the tooling in the work section started as something I wanted during a competition.",
	},
];

export const STACK = [
	{
		group: "Security",
		note: "What I do and what I build.",
		items: [
			"Threat modelling",
			"Secure SDLC",
			"Detection engineering",
			"MITRE ATT&CK",
			"Vulnerability management",
			"Static analysis",
			"Network traffic analysis",
			"Reconnaissance tooling",
		],
	},
	{
		group: "Machine learning",
		note: "Mostly pointed at security problems.",
		items: [
			"PyTorch",
			"scikit-learn",
			"Adversarial robustness (FGSM, PGD)",
			"Reinforcement learning",
			"Deep Q-networks",
			"Pandas",
			"NumPy",
		],
	},
	{
		group: "Engineering",
		note: "How the tooling gets built.",
		items: [
			"Python",
			"asyncio",
			"FastAPI",
			"Flask",
			"Node.js",
			"React",
			"SQL",
			"WebSockets",
		],
	},
	{
		group: "Tooling",
		note: "Day to day.",
		items: [
			"Nuclei",
			"Playwright",
			"Docker",
			"Git",
			"Kali Linux",
			"Ollama",
		],
	},
];

export const GITHUB_USERNAME = "ashmithhmaddala";
