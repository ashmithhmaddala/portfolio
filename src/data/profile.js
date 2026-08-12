/*
 * Single source of truth for every word on the site.
 * Components read from here — never hard-code copy in a component.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * NOTE ON NUMBERS: project impact figures came off the resume and are shown
 * with an `estimated: true` flag, which renders a visible "est." marker and a
 * tooltip. Anything you can measure for real, set `estimated: false` and the
 * marker disappears. Don't state an unmeasured number as fact — it is the
 * first thing an interviewer probes.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const PROFILE = {
	name: "Ashmith Maddala",
	firstName: "Ashmith",
	role: "Product Security Engineer",
	company: "Vontier",
	location: "Bangalore, India",
	email: "ashmith.maddala@gmail.com",
	resumeUrl: "/resume.pdf",

	// Cycles in the hero headline.
	rotatingRoles: [
		"secure connected hardware",
		"threat-model before code ships",
		"build backends that hold up",
		"teach models to make decisions",
	],

	// One-liner under the headline. Short enough to read in the 8 seconds a
	// recruiter actually gives a portfolio.
	tagline:
		"Product security engineer at Vontier. I work on the software inside connected fuel-retail and mobility hardware — the kind that has to stay trustworthy for a decade in the field, with no one watching it.",

	// Longer form, About section.
	bio: [
		"I came into security from the backend. Four years of building Flask and Node services taught me where systems actually break — not in the clever algorithm, but in the auth check someone skipped, the input nobody validated, the dependency pinned in 2023 and never looked at again.",
		"That's most of my job now. At Vontier I work on product security for connected devices in the mobility and fuel-retail space: hardware that sits at a forecourt for years, ships firmware to the field, and can't be casually patched on a Tuesday. Threat modelling before a design is locked, security review inside the SDLC, and pushing fixes upstream to the teams who own the code.",
		"The other half of my head is still in machine learning — specifically reinforcement learning for database query optimisation, which is the research rabbit hole I fell into during my final year and haven't fully climbed out of. Teaching a planner to choose its own join order is a genuinely hard problem and I like that it stays hard.",
		"Outside all of that: I lift, I read too much nutrition science for someone who is not a nutritionist, and I will talk about chess engines until you leave.",
	],

	availability: {
		open: true,
		text: "Open to interesting conversations",
	},
};

export const SOCIALS = [
	{
		id: "github",
		label: "GitHub",
		handle: "@ashmithhmaddala",
		url: "https://github.com/ashmithhmaddala",
	},
	{
		id: "linkedin",
		label: "LinkedIn",
		handle: "in/ashmith-maddala",
		url: "https://www.linkedin.com/in/ashmith-maddala/",
	},
	{
		id: "x",
		label: "X",
		handle: "@axmxtxh",
		url: "https://x.com/axmxtxh",
	},
	{
		id: "mail",
		label: "Email",
		handle: "ashmith.maddala@gmail.com",
		url: "mailto:ashmith.maddala@gmail.com",
	},
];

export const NAV = [
	{ id: "work", label: "Work" },
	{ id: "projects", label: "Projects" },
	{ id: "stack", label: "Stack" },
	{ id: "about", label: "About" },
	{ id: "contact", label: "Contact" },
];

/*
 * Stat tiles. `live: "repos"` is replaced at runtime by the real public repo
 * count from the GitHub API, falling back to `value` if the request fails or
 * gets rate-limited.
 */
export const STATS = [
	{ label: "Projects shipped", value: 4, suffix: "" },
	{ label: "Public repos", value: 12, suffix: "", live: "repos" },
	{ label: "Tools in rotation", value: 25, suffix: "+" },
	{ label: "Years building", value: 4, suffix: "" },
];

/*
 * ⚠️ ACTION REQUIRED — the Vontier entry below describes the *scope* of a
 * product security role and Vontier's actual business domain. It deliberately
 * contains no specific accomplishments, because I don't know yours and will
 * not invent them. Replace the `highlights` array with 2–3 real things you
 * have done: a threat model you ran, a vuln class you eliminated, a control
 * you shipped, a process you changed. Add `startDate` too.
 */
export const EXPERIENCE = [
	{
		id: "vontier",
		company: "Vontier",
		role: "Product Security Engineer",
		location: "Bangalore, India",
		period: "2026 — Present", // TODO: set your actual start month
		current: true,
		summary:
			"Vontier builds the connected hardware and software behind fuel retail, vehicle repair, and car-wash operations worldwide. Product security here means devices in the field, long support lifecycles, and firmware that can't be hot-patched on a whim.",
		// TODO: replace with your own specifics.
		highlights: [
			"Security review and threat modelling for connected products across the development lifecycle.",
			"Partnering with engineering teams to fold security requirements into design, before implementation locks them out.",
			"Vulnerability triage and remediation guidance across product software and its dependency surface.",
		],
		placeholder: true,
		stack: ["Threat Modelling", "Secure SDLC", "Vulnerability Management", "Python"],
	},
	{
		id: "nhce",
		company: "New Horizon College of Engineering",
		role: "B.E. Computer Science & Engineering",
		location: "Bangalore, India",
		period: "2022 — 2026",
		current: false,
		summary:
			"Four years of CS fundamentals, with a final-year pull toward database internals and reinforcement learning. Most of what's in the Projects section below was built alongside coursework rather than for it.",
		highlights: [
			"Research work on reinforcement learning for SQL query optimisation — adaptive, policy-based join ordering.",
			"Coursework depth in data structures, OOP, DBMS, and computer vision.",
		],
		stack: ["Reinforcement Learning", "DBMS", "Computer Vision", "DSA"],
	},
];

/*
 * Projects. Ordered by what I'd want a hiring manager to read first.
 * `caseStudy` powers the expanded detail view — problem / approach / hard part
 * is the structure that makes a project readable to someone who wasn't there.
 */
export const PROJECTS = [
	{
		id: "learnsmart",
		title: "LearnSmart Engineer",
		year: "2024",
		period: "Jul — Dec 2024",
		tagline: "A recommender that figures out what you're bad at, then tells you what to learn next.",
		description:
			"An AI-driven learning platform that reads a student's performance history and recommends the next skill worth their time — rather than serving the same generic syllabus to everyone.",
		stack: ["Python", "Flask", "scikit-learn", "Pandas", "JavaScript"],
		tags: ["Machine Learning", "Full-stack"],
		gradient: ["#7c5cff", "#22d3ee"],
		featured: true,
		links: {
			source: "https://github.com/ashmithhmaddala/learnsmart-engineer",
		},
		metrics: [
			{ value: "40%", label: "engagement lift", estimated: true },
			{ value: "30%", label: "retention improvement", estimated: true },
			{ value: "5k", label: "active users", estimated: true },
		],
		caseStudy: {
			problem:
				"Learning platforms tend to recommend what's popular, not what a specific student is weak at. A student who is fine at loops and lost at recursion gets the same next-module suggestion as everyone else, so the recommendation is noise.",
			approach:
				"I modelled each student as a skill-wise performance vector rather than a single aggregate score, then used collaborative filtering across that vector space to surface what similar learners studied next after showing the same weak spots. A Flask interface renders the per-skill breakdown so the recommendation is legible — you can see why it suggested what it did.",
			hardPart:
				"Cold start. A brand-new user has no history, so collaborative filtering has nothing to work with and returns garbage. I fell back to a content-based path driven by an onboarding questionnaire until enough interaction data accumulated to hand over to the collaborative model. Deciding where that handover threshold sits was more empirical than principled.",
			result:
				"A working end-to-end platform: questionnaire onboarding, skill-wise performance visualisation, and personalised path recommendations. The engagement and retention figures came from platform analytics during the pilot period and are best read as directional.",
		},
	},
	{
		id: "jobboard",
		title: "Job Board Tracker",
		year: "2025",
		period: "Jan — Mar 2025",
		tagline: "Aggregated tech hiring across three Indian metros, with an admin plane that doesn't leak.",
		description:
			"A Flask application tracking job postings from top companies across Bangalore, Hyderabad, and Mumbai — with authentication, role-separated admin dashboards, and multi-axis filtering over a live listing set.",
		stack: ["Python", "Flask", "SQL", "Jinja", "Chart.js"],
		tags: ["Full-stack", "Auth"],
		gradient: ["#22d3ee", "#34d399"],
		featured: true,
		links: {
			source: "https://github.com/ashmithhmaddala/job-board-app",
		},
		metrics: [
			{ value: "1k+", label: "listings managed", estimated: false },
			{ value: "40%", label: "less admin overhead", estimated: true },
			{ value: "25%", label: "better match rate", estimated: true },
		],
		caseStudy: {
			problem:
				"Job hunting across multiple metros means the same search repeated on six sites, with no memory of what you already looked at. I wanted one filterable surface over company, category, and location, plus an admin view for curating what actually gets listed.",
			approach:
				"Flask backend with a normalised schema for listings, companies, and locations so filters compose instead of fighting each other. Session-based authentication with a hard separation between the user role and the admin role, and an admin dashboard with visualisations over listing volume and category distribution.",
			hardPart:
				"The auth boundary, in hindsight, is the most interesting part of this project and the part I'd build differently now. Role checks originally lived in the view functions — which means every new admin route is one forgotten decorator away from being public. I moved to a before-request guard on the admin blueprint so the default is deny and adding a route can't silently open a hole. That instinct is most of what I do professionally now.",
			result:
				"Handles 1,000+ active listings with composable filtering. The efficiency numbers are from usage during the build period rather than a controlled measurement.",
		},
	},
	{
		id: "chess",
		title: "Python Chess Engine",
		year: "2025",
		period: "2025",
		tagline: "A UCI-speaking engine built to understand search, not to win tournaments.",
		description:
			"A chess engine implementing the Universal Chess Interface protocol, with minimax search, alpha-beta pruning, and a deliberately modular design so each layer can be swapped and measured independently.",
		stack: ["Python", "UCI Protocol", "Minimax", "Alpha-Beta"],
		tags: ["Systems", "Algorithms"],
		gradient: ["#f472b6", "#7c5cff"],
		featured: true,
		links: {
			source: "https://github.com/ashmithhmaddala/python-chess-engine",
		},
		metrics: [
			{ value: "UCI", label: "protocol compliant", estimated: false },
			{ value: "GUI", label: "plays vs Cute Chess", estimated: false },
		],
		caseStudy: {
			problem:
				"I wanted to understand game-tree search by building one, not by reading about one. The constraint I set was UCI compliance — speaking the protocol correctly means real GUIs and other engines will play against it, which is a much harder bar than a self-contained demo.",
			approach:
				"Clean separation between board representation, move generation, evaluation, and search, so I could change the evaluation function without touching search and actually attribute the difference. Minimax with alpha-beta pruning over an iterative deepening loop, and a UCI layer that handles the stdin/stdout handshake GUIs expect.",
			hardPart:
				"Move generation correctness. Search bugs are loud; move generation bugs are quiet and poison everything downstream. En passant, castling rights through check, and promotion edge cases each broke it in ways that only surfaced several plies deep. Perft testing — counting leaf nodes at fixed depth against known-correct values — was the only thing that actually found them.",
			result:
				"Plays legal, complete games against Cute Chess and other UCI engines. Not strong, and it isn't meant to be — it's a search sandbox where each component is independently measurable.",
		},
	},
	{
		id: "crime",
		title: "Crime Rate Prediction",
		year: "2025",
		period: "2025",
		tagline: "Theft-pattern forecasting for Bengaluru, on a map you can actually interrogate.",
		description:
			"A machine-learning dashboard for predicting and analysing theft crime patterns across Bengaluru, combining model training, interactive analytics, and a geospatial view in a Streamlit app.",
		stack: ["Python", "scikit-learn", "Streamlit", "Pandas", "Folium"],
		tags: ["Machine Learning", "Data Viz"],
		gradient: ["#fbbf24", "#f472b6"],
		featured: false,
		links: {
			source: "https://github.com/ashmithhmaddala/crime-rate-prediction",
		},
		metrics: [
			{ value: "Geo", label: "interactive mapping", estimated: false },
			{ value: "E2E", label: "train → serve pipeline", estimated: false },
		],
		caseStudy: {
			problem:
				"Crime statistics are usually published as tables, which makes spatial patterns nearly invisible. Theft in particular clusters geographically and temporally, and a table hides both dimensions at once.",
			approach:
				"An end-to-end pipeline: cleaning and feature engineering over the dataset, model training with evaluation held separate from the app layer, then a Streamlit front-end with an interactive map so you can filter by area and time window and watch the distribution shift.",
			hardPart:
				"Being honest about what the model can and can't claim. Crime data reflects reporting patterns as much as underlying incidence — under-reported areas look safe. I kept the framing descriptive and exploratory rather than predictive-with-authority, because the alternative is a tool that confidently launders bias.",
			result:
				"A working analytics dashboard with map-driven exploration over real-world-inspired Bengaluru theft data.",
		},
	},
];

/*
 * Skill groups. Kept honest — `level` drives the meter width and should
 * reflect what you'd be comfortable being interviewed on, not aspiration.
 */
export const SKILLS = [
	{
		group: "Security",
		accent: "var(--accent)",
		items: [
			{ name: "Threat Modelling", level: 78 },
			{ name: "Secure SDLC", level: 74 },
			{ name: "Vulnerability Management", level: 72 },
			{ name: "AppSec Review", level: 68 },
		],
	},
	{
		group: "Backend",
		accent: "var(--accent-2)",
		items: [
			{ name: "Python", level: 92 },
			{ name: "Flask", level: 86 },
			{ name: "Node.js / Express", level: 80 },
			{ name: "REST API Design", level: 84 },
			{ name: "SQL / MongoDB", level: 78 },
		],
	},
	{
		group: "ML & Research",
		accent: "var(--accent-3)",
		items: [
			{ name: "scikit-learn", level: 82 },
			{ name: "Pandas / NumPy", level: 88 },
			{ name: "Reinforcement Learning", level: 70 },
			{ name: "OpenCV", level: 64 },
		],
	},
	{
		group: "Foundations",
		accent: "var(--ok)",
		items: [
			{ name: "Data Structures & Algorithms", level: 85 },
			{ name: "Git / GitHub", level: 88 },
			{ name: "Docker", level: 58 },
			{ name: "AWS / GCP concepts", level: 60 },
		],
	},
];

export const INTERESTS = [
	"Database internals",
	"Query optimisation",
	"Embedded & device security",
	"System design",
	"Chess engines",
	"Strength training",
	"Nutrition science",
	"Public speaking",
];

export const GITHUB_USERNAME = "ashmithhmaddala";
