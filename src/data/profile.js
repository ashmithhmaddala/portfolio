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
	role: "Product Security Engineer",
	company: "Vontier",
	location: "Bangalore, India",
	email: "ashmith.maddala@gmail.com",
	resumeUrl: "/resume.pdf",

	intro: [
		"I'm a product security engineer at Vontier, in Bangalore.",
		"I work on the software inside connected fuel-retail and mobility hardware. Devices that sit at a forecourt for years, ship firmware to the field, and can't be patched on a whim. Most of the job is threat modelling and security review, early enough that the fix is still cheap.",
		"Outside that I build security tooling. Detection engineering, reconnaissance, and most recently a scanner for a class of attack that only exists because models read documents people don't.",
	],

	spec: [
		{ key: "Role", value: "Product Security Engineer, Vontier" },
		{ key: "Location", value: "Bangalore, India" },
		{ key: "Building", value: "Security tooling, detection engineering" },
		{ key: "Degree", value: "B.E. Computer Science, NHCE, 2026" },
	],

	/*
	 * Deliberately not a restatement of the home-page intro. That page says
	 * what I do now. This one is about how I got here and what the tools have
	 * in common.
	 */
	about: [
		"I build tools that read what people skim. Tool metadata, log lines, packet timing, the way a pointer moves across a screen. Each one is looking for signal somewhere nobody reads carefully, which turns out to be where a lot of it sits.",
		"Before that I built backends, and that is still where the instincts come from. Four years of Flask and Node teaches you that systems rarely fail at the clever part. They fail at the auth check someone skipped, the input nobody validated, the dependency pinned two years ago and never looked at since.",
		"The academic version of the same interest went into reinforcement learning for query optimisation during my final year. Teaching a planner to choose its own join order is a hard problem, it stayed hard, and that is most of why it held my attention.",
		"There is a bias running through the tooling that took me four projects to notice. Every one of them would rather report its own limits than hand you a verdict. theriac states a miss rate instead of declaring a server clean. The beaconing detector shows you the jitter level where it stops working. A security tool that overclaims seems worse to me than no tool at all, because someone will trust it.",
		"Away from a screen I lift, read more nutrition research than is strictly reasonable, and keep tinkering with chess engines.",
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
			body: "Testing a detector on your own examples measures how well it matches your own assumptions. An external benchmark is the only place the number starts to mean anything.",
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

/*
 * ⚠️ The Vontier entry describes the shape of a product security role, not
 * things I know you did. Replace `notes` with your own specifics and set the
 * real start month.
 */
export const EXPERIENCE = [
	{
		id: "vontier",
		company: "Vontier",
		role: "Product Security Engineer",
		period: "2026 —", // TODO: real start month
		current: true,
		context:
			"Vontier builds the connected hardware and software behind fuel retail, vehicle repair and car-wash operations. Product security here means long support lifecycles and firmware that goes to the field and stays there.",
		notes: [
			"Threat modelling and security review for connected products, through the development lifecycle.",
			"Working with engineering teams to get security requirements into designs before implementation closes the door on them.",
			"Vulnerability triage and remediation guidance across product software and its dependencies.",
		],
		placeholder: true,
	},
	{
		id: "nhce",
		company: "New Horizon College of Engineering",
		role: "B.E. Computer Science & Engineering",
		period: "2022 — 2026",
		current: false,
		context:
			"Four years of computer science, with a final-year pull toward database internals and reinforcement learning.",
		notes: [
			"Final-year research on reinforcement learning for SQL query optimisation, specifically adaptive policy-based join ordering.",
			"Coursework depth in data structures, operating systems, DBMS and computer vision.",
			"Most of the tooling in the work section was built alongside coursework rather than for it.",
		],
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
