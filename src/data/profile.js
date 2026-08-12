/*
 * Every word on the site lives here. Components read from it; nothing is
 * hard-coded in JSX.
 *
 * House style for the copy: short declarative sentences. State the thing and
 * stop. No rhetorical questions, no "not just X but Y", no three-item lists
 * for rhythm, no em-dash asides. If a sentence sounds like it was written to
 * sound good, cut it.
 *
 * On numbers: metrics carried over from the resume are flagged
 * `estimated: true` and render a visible "est." qualifier. Set it to false
 * only for something you can actually show.
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
		"Before this I built backends. That's still where most of my instincts come from.",
	],

	// Rendered as a ruled spec block under the intro.
	spec: [
		{ key: "Role", value: "Product Security Engineer, Vontier" },
		{ key: "Location", value: "Bangalore, India" },
		{ key: "Focus", value: "Product security, backend, applied ML" },
		{ key: "Degree", value: "B.E. Computer Science, NHCE, 2026" },
	],

	about: [
		"I came to security from the backend. Four years of Flask and Node taught me that systems rarely fail at the clever part. They fail at the auth check someone skipped, the input nobody validated, the dependency pinned two years ago and never looked at since.",
		"At Vontier that is most of the work. Connected devices, long support lifecycles, firmware that goes out to the field and stays there. Threat modelling before a design locks. Security review inside the development cycle. Handing findings back to the teams who own the code.",
		"The other half of my attention is on reinforcement learning for database query optimisation. I picked it up in my final year and haven't put it down. Teaching a query planner to choose its own join order is a hard problem, and it has stayed hard.",
		"Away from a screen I lift, read more nutrition research than is strictly reasonable, and keep tinkering with chess engines.",
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

export const SECTIONS = [
	{ id: "experience", num: "01", label: "Experience" },
	{ id: "projects", num: "02", label: "Projects" },
	{ id: "stack", num: "03", label: "Stack" },
	{ id: "about", num: "04", label: "About" },
	{ id: "contact", num: "05", label: "Contact" },
];

/*
 * ⚠️ The Vontier bullets below describe the shape of a product security role,
 * not things I know you did. Replace them with your own specifics: a threat
 * model you ran, a vulnerability class you closed, a control you shipped, a
 * process you changed. Set the real start month while you're in here.
 */
export const EXPERIENCE = [
	{
		id: "vontier",
		company: "Vontier",
		role: "Product Security Engineer",
		period: "2026 —", // TODO: real start month
		current: true,
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
		notes: [
			"Final-year research on reinforcement learning for SQL query optimisation, specifically adaptive policy-based join ordering.",
			"Everything in the projects section was built alongside coursework rather than for it.",
		],
	},
];

export const PROJECTS = [
	{
		id: "learnsmart",
		num: "01",
		title: "LearnSmart Engineer",
		period: "Jul — Dec 2024",
		summary:
			"A learning platform that recommends what to study next from per-skill performance, instead of from an aggregate score.",
		stack: ["Python", "Flask", "scikit-learn", "Pandas"],
		source: "https://github.com/ashmithhmaddala/learnsmart-engineer",
		metrics: [
			{ value: "40%", label: "engagement lift", estimated: true },
			{ value: "30%", label: "retention", estimated: true },
			{ value: "5k", label: "users", estimated: true },
		],
		notes: [
			{
				head: "Problem",
				body: "Learning platforms recommend what is popular, not what a given student is weak at. Someone who is fine at loops and lost at recursion gets the same suggestion as everyone else, so the recommendation carries no information.",
			},
			{
				head: "Build",
				body: "Each student is modelled as a per-skill performance vector rather than one score. Collaborative filtering runs across that vector space and surfaces what similar learners studied next after showing the same weak spots. The Flask interface renders the per-skill breakdown, so you can see why a recommendation was made.",
			},
			{
				head: "Hard part",
				body: "Cold start. A new user has no history, collaborative filtering has nothing to compare against, and the output is noise. I fell back to a content-based path driven by an onboarding questionnaire until enough interaction data accumulated to hand over. Where that handover threshold sits was decided empirically, not from any principle.",
			},
			{
				head: "Outcome",
				body: "Questionnaire onboarding, per-skill visualisation, and personalised recommendations, working end to end. The engagement and retention figures came from platform analytics during the pilot and should be read as directional.",
			},
		],
	},
	{
		id: "jobboard",
		num: "02",
		title: "Job Board Tracker",
		period: "Jan — Mar 2025",
		summary:
			"Tech job postings across Bangalore, Hyderabad and Mumbai in one filterable index, with a separated admin plane.",
		stack: ["Python", "Flask", "SQL", "Jinja"],
		source: "https://github.com/ashmithhmaddala/job-board-app",
		metrics: [
			{ value: "1k+", label: "listings", estimated: false },
			{ value: "40%", label: "less admin overhead", estimated: true },
		],
		notes: [
			{
				head: "Problem",
				body: "Searching across three cities meant repeating the same query on six sites, with no memory of what I had already seen. I wanted one surface I could filter by company, category and location, plus an admin view for curating what got listed.",
			},
			{
				head: "Build",
				body: "Flask backend over a normalised schema for listings, companies and locations, so filters compose instead of fighting each other. Session authentication with a hard split between the user role and the admin role, and a dashboard over listing volume and category distribution.",
			},
			{
				head: "Hard part",
				body: "The auth boundary, which is also the part I would build differently now. Role checks originally sat inside the view functions. That means every new admin route is one forgotten decorator away from being public. I moved them to a before-request guard on the admin blueprint, so the default is deny and adding a route cannot quietly open a hole. That instinct is most of what I do for a living now.",
			},
			{
				head: "Outcome",
				body: "Handles over a thousand active listings with composable filtering. The efficiency figure is from use during the build period, not a controlled measurement.",
			},
		],
	},
	{
		id: "chess",
		num: "03",
		title: "Python Chess Engine",
		period: "2025",
		summary:
			"A UCI-compliant chess engine. Minimax with alpha-beta pruning over iterative deepening, built to be measured rather than to win.",
		stack: ["Python", "UCI", "Minimax", "Alpha-beta"],
		source: "https://github.com/ashmithhmaddala/python-chess-engine",
		metrics: [
			{ value: "UCI", label: "protocol compliant", estimated: false },
			{ value: "Perft", label: "verified movegen", estimated: false },
		],
		notes: [
			{
				head: "Problem",
				body: "I wanted to understand game tree search by building one rather than reading about one. The constraint I set was UCI compliance, because speaking the protocol properly means real GUIs and other engines will play against it. That is a much harder bar than a self-contained demo.",
			},
			{
				head: "Build",
				body: "Board representation, move generation, evaluation and search are kept separate, so I could change the evaluation function without touching search and still attribute the difference. Minimax with alpha-beta pruning runs inside an iterative deepening loop. A thin UCI layer handles the stdin and stdout handshake that GUIs expect.",
			},
			{
				head: "Hard part",
				body: "Move generation correctness. Search bugs announce themselves. Move generation bugs are silent and poison everything downstream of them. En passant, castling rights through check and promotion each broke it in ways that only surfaced several plies deep. Perft testing, which counts leaf nodes at a fixed depth against known-correct values, was the only thing that found them.",
			},
			{
				head: "Outcome",
				body: "Plays complete legal games against Cute Chess and other UCI engines. It is not strong and was never meant to be. It is a search sandbox where each component can be measured on its own.",
			},
		],
	},
	{
		id: "crime",
		num: "04",
		title: "Crime Rate Prediction",
		period: "2025",
		summary:
			"Theft pattern analysis for Bengaluru, with a map-driven front end for filtering by area and time window.",
		stack: ["Python", "scikit-learn", "Streamlit", "Folium"],
		source: "https://github.com/ashmithhmaddala/crime-rate-prediction",
		metrics: [
			{ value: "Geo", label: "interactive mapping", estimated: false },
		],
		notes: [
			{
				head: "Problem",
				body: "Crime statistics are usually published as tables, which hides the two dimensions that matter most for theft. It clusters geographically and it clusters in time, and a table shows neither.",
			},
			{
				head: "Build",
				body: "Cleaning and feature engineering over the dataset, model training with evaluation kept separate from the app layer, then a Streamlit front end with an interactive map. Filtering by area and time window shows the distribution shift directly.",
			},
			{
				head: "Hard part",
				body: "Being honest about what the model can claim. Crime data records reporting behaviour as much as incidence, so under-reported areas read as safe. I kept the framing descriptive and exploratory rather than predictive, because the confident version of this tool would mostly launder bias.",
			},
			{
				head: "Outcome",
				body: "A working analytics dashboard with map-driven exploration over Bengaluru theft data.",
			},
		],
	},
];

/*
 * Grouped, unranked. Percentage bars on skills are a portfolio tell — nobody
 * can defend "Python 92%" in an interview, and the number means nothing to
 * the person reading it.
 */
export const STACK = [
	{
		group: "Security",
		items: [
			"Threat modelling",
			"Secure SDLC",
			"Vulnerability management",
			"Application security review",
		],
	},
	{
		group: "Backend",
		items: [
			"Python",
			"Flask",
			"Node.js",
			"Express",
			"REST APIs",
			"SQL",
			"MongoDB",
		],
	},
	{
		group: "ML and research",
		items: [
			"scikit-learn",
			"Pandas",
			"NumPy",
			"Reinforcement learning",
			"Deep Q-networks",
			"OpenCV",
		],
	},
	{
		group: "Everything else",
		items: [
			"Git",
			"Docker",
			"AWS and GCP concepts",
			"Data structures and algorithms",
			"Technical writing",
		],
	},
];

export const GITHUB_USERNAME = "ashmithhmaddala";
