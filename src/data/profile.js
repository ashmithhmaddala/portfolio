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

	/*
	 * How I work. These are positions I can defend in an interview, which is
	 * the only reason to put them on a site.
	 */
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
			title: "Measure the part you changed",
			body: "Keep components separable enough that you can swap one and attribute the difference. If you can't isolate it, you're guessing about what helped.",
		},
		{
			title: "Say what the data cannot support",
			body: "A model trained on reported incidents describes reporting. Stating the limitation is not hedging, it is the difference between a tool and a confident wrong answer.",
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
	{ to: "/about", label: "About" },
	{ to: "/contact", label: "Contact" },
];

/*
 * ⚠️ The Vontier entry describes the shape of a product security role, not
 * things I know you did. Replace `notes` with your own specifics: a threat
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
			"Everything in the work section was built alongside coursework rather than for it.",
		],
	},
];

export const PROJECTS = [
	{
		slug: "learnsmart-engineer",
		num: "01",
		title: "LearnSmart Engineer",
		period: "Jul — Dec 2024",
		role: "Solo build",
		oneLiner:
			"A learning platform that recommends what to study next from per-skill performance, instead of from an aggregate score.",
		summary:
			"Most learning platforms recommend what is popular. This one models each student as a vector of per-skill scores and recommends against that, with a content-based fallback for users who have no history yet.",
		tags: ["Machine learning", "Full-stack"],
		diagram: "coldStart",
		diagramCaption:
			"Recommendation path by interaction count. New users are served content-based recommendations until enough history accumulates to hand over to collaborative filtering.",
		source: "https://github.com/ashmithhmaddala/learnsmart-engineer",
		stack: [
			{ name: "Python", why: "Ecosystem for the modelling work." },
			{ name: "Flask", why: "Small surface, no ceremony for a single-service app." },
			{ name: "scikit-learn", why: "Similarity and matrix factorisation without writing it myself." },
			{ name: "Pandas", why: "Feature assembly over the performance history." },
		],
		metrics: [
			{ value: "40%", label: "engagement lift", estimated: true },
			{ value: "30%", label: "retention", estimated: true },
			{ value: "5k", label: "users", estimated: true },
		],
		context:
			"Learning platforms recommend what is popular, not what a given student is weak at. Someone who is fine at loops and lost at recursion gets the same next-module suggestion as everyone else, so the recommendation carries no information about them. I wanted recommendations that changed when the student changed.",
		architecture:
			"A student is represented as a vector of per-skill scores rather than one aggregate. Collaborative filtering runs across that vector space and finds learners whose weak spots resemble this one, then surfaces what those learners studied next. The Flask layer renders the per-skill breakdown alongside the recommendation, so a student can see which weakness drove it. That transparency was not a nice-to-have. A recommendation you cannot interrogate is one you will not trust.",
		decisions: [
			{
				title: "Per-skill vectors, not a single score",
				body: "An aggregate score collapses exactly the information the recommendation needs. Two students on 60% can have opposite gaps. Keeping the dimensions separate is what makes the neighbourhood meaningful.",
			},
			{
				title: "Content-based fallback for cold start",
				body: "Collaborative filtering has nothing to compare a new user against, and the output is noise. An onboarding questionnaire seeds a content-based path until enough interaction history exists to hand over.",
			},
			{
				title: "Show the reasoning next to the result",
				body: "The per-skill chart sits beside the recommendation rather than behind a tab. Students who could see why a topic was suggested engaged with it differently than students given a bare list.",
			},
		],
		hardPart:
			"The cold-start handover. Deciding when a user has accumulated enough interaction history to switch from the content-based path to collaborative filtering was decided empirically, not from any principle. Too early and the recommendations are noise. Too late and the system never uses the data it is collecting. I settled on a threshold by watching where recommendation quality stopped visibly degrading, which is a defensible engineering answer and an unsatisfying research one.",
		retrospective:
			"I would evaluate offline before shipping. I judged quality by looking at recommendations and deciding whether they seemed sensible, which is not evaluation. Holding out a slice of interaction history and measuring whether the model predicts what a student actually studied next would have turned the threshold question into a measurement instead of a judgement call.",
		outcome:
			"Questionnaire onboarding, per-skill visualisation and personalised recommendations, working end to end. The engagement and retention figures came from platform analytics during the pilot and should be read as directional.",
	},
	{
		slug: "job-board-tracker",
		num: "02",
		title: "Job Board Tracker",
		period: "Jan — Mar 2025",
		role: "Solo build",
		oneLiner:
			"Tech job postings across three Indian metros in one filterable index, with a separated admin plane.",
		summary:
			"A Flask application over a normalised listing schema, with session authentication and a hard split between the user role and the admin role. The auth boundary is the interesting part and the reason I still point at this one.",
		tags: ["Full-stack", "Authorisation"],
		diagram: "authBoundary",
		diagramCaption:
			"Authorisation before and after. Per-view decorators fail open when someone forgets one. A blueprint-level guard fails closed by construction.",
		source: "https://github.com/ashmithhmaddala/job-board-app",
		stack: [
			{ name: "Python", why: "Same reason as everything else here." },
			{ name: "Flask", why: "Blueprints are what made the authorisation fix clean." },
			{ name: "SQL", why: "Normalised schema so filters compose." },
			{ name: "Jinja", why: "Server-rendered; no client state worth managing." },
		],
		metrics: [
			{ value: "1k+", label: "listings", estimated: false },
			{ value: "40%", label: "less admin overhead", estimated: true },
		],
		context:
			"Searching for work across Bangalore, Hyderabad and Mumbai meant running the same query on six sites with no memory of what I had already seen. I wanted one surface I could filter by company, category and location, plus an admin view for curating what got listed.",
		architecture:
			"Flask over a normalised schema with separate tables for listings, companies and locations, so filters compose instead of fighting each other. Session-based authentication, and an admin blueprint carrying the dashboard and the curation views. Listing volume and category distribution are charted server-side.",
		decisions: [
			{
				title: "Normalise before building the filters",
				body: "Company and location started as strings on the listing row. Filtering on them meant matching text, which broke the moment the same company appeared with two spellings. Pulling them into their own tables made every filter an exact join.",
			},
			{
				title: "Move authorisation to the blueprint",
				body: "Role checks originally lived in the view functions as decorators. That design means every new admin route is one forgotten decorator away from being public. A before-request guard on the admin blueprint inverts it: the route is protected because of where it lives.",
			},
			{
				title: "Server-rendered, no API",
				body: "There was no second client and no offline requirement. A JSON API and a front-end framework would have added a serialisation layer, a second auth surface and a build step, in exchange for nothing this application needed.",
			},
		],
		hardPart:
			"The authorisation boundary, which is also the part I would build differently now and the reason this project still comes up when I talk about my work. Per-view decorators are the obvious approach and they fail open. The failure mode is silent, it is a human one, and no test catches it because the test suite only knows about routes that exist. Moving the check to a before-request hook on the blueprint means the default is deny and adding a route cannot quietly open a hole. That instinct is most of what I do for a living now.",
		retrospective:
			"I would add a test that enumerates the URL map and asserts every admin-prefixed rule resolves through the guard. The blueprint fix makes the failure structurally unlikely, but a test that walks the routing table makes it visible instead of merely improbable. I would also drop session auth for something with rotation.",
		outcome:
			"Handles over a thousand active listings with composable filtering across company, category and location. The efficiency figure is from use during the build period, not a controlled measurement.",
	},
	{
		slug: "python-chess-engine",
		num: "03",
		title: "Python Chess Engine",
		period: "2025",
		role: "Solo build",
		oneLiner:
			"A UCI-compliant chess engine. Minimax with alpha-beta pruning over iterative deepening, built to be measured rather than to win.",
		summary:
			"An engine that speaks the Universal Chess Interface properly, so real GUIs and other engines will play it. Board representation, move generation, evaluation and search are kept separate so each can be changed and attributed independently.",
		tags: ["Systems", "Algorithms"],
		diagram: "alphaBeta",
		diagramCaption:
			"Alpha-beta pruning over a minimax tree. Once a branch is proven worse than one already found, the rest of its subtree cannot affect the result and is never visited.",
		source: "https://github.com/ashmithhmaddala/python-chess-engine",
		stack: [
			{ name: "Python", why: "Clarity over speed; this was built to be read." },
			{ name: "UCI", why: "Protocol compliance is what makes it testable against real opponents." },
			{ name: "Minimax", why: "The baseline every stronger search is a refinement of." },
			{ name: "Alpha-beta", why: "Same result as minimax, a fraction of the nodes." },
		],
		metrics: [
			{ value: "UCI", label: "protocol compliant", estimated: false },
			{ value: "Perft", label: "verified movegen", estimated: false },
		],
		context:
			"I wanted to understand game tree search by building one rather than reading about one. The constraint I set was UCI compliance, because speaking the protocol properly means real GUIs and other engines will play against it. That is a much harder bar than a self-contained demo, and it means the engine can be tested against opponents that do not share its bugs.",
		architecture:
			"Four layers, deliberately separable. Board representation holds position state and make/unmake. Move generation produces legal moves from a position. Evaluation scores a leaf. Search runs minimax with alpha-beta inside an iterative deepening loop. A thin UCI layer handles the stdin and stdout handshake that GUIs expect. Because evaluation is isolated from search, changing the scoring function and re-running a fixed match tells you what the change did, without a search modification confounding the result.",
		decisions: [
			{
				title: "Iterative deepening over a fixed depth",
				body: "Searching depth 1, then 2, then 3 rather than going straight to depth n looks wasteful and is not. The shallow passes are cheap, they give a usable move if time runs out, and their results order moves for the deeper pass, which makes alpha-beta cut far more.",
			},
			{
				title: "Perft as the correctness harness",
				body: "Counting leaf nodes at fixed depth and comparing against published values for known positions is the only test that reliably catches move generation bugs. It turns a silent, deep failure into a single mismatched integer.",
			},
			{
				title: "Speak UCI rather than build a UI",
				body: "Implementing the protocol was less work than a front end and bought more: any UCI GUI becomes a debugger, and any other engine becomes an opponent for regression testing.",
			},
		],
		hardPart:
			"Move generation correctness. Search bugs announce themselves, because the engine plays something visibly stupid. Move generation bugs are silent and poison everything downstream, since the search is exploring positions that cannot occur. En passant, castling rights when the king passes through an attacked square, and promotion each broke it in ways that only surfaced several plies deep and looked like evaluation problems. Perft testing was the only thing that found them, and it found all three within an hour after weeks of chasing the wrong layer.",
		retrospective:
			"Transposition tables are the obvious next thing and the reason it is slower than it needs to be. The same position reached by different move orders is currently searched from scratch every time. I would also move the hot loops out of Python, which is the honest ceiling here.",
		outcome:
			"Plays complete legal games against Cute Chess and other UCI engines. It is not strong and was never meant to be. It is a search sandbox where each component can be measured on its own.",
	},
	{
		slug: "crime-rate-prediction",
		num: "04",
		title: "Crime Rate Prediction",
		period: "2025",
		role: "Solo build",
		oneLiner:
			"Theft pattern analysis for Bengaluru, with a map-driven front end for filtering by area and time window.",
		summary:
			"A pipeline from raw incident data through feature engineering and model training to a Streamlit application with an interactive map. Framed as exploratory rather than predictive, for reasons that are the most interesting thing about it.",
		tags: ["Machine learning", "Data visualisation"],
		diagram: "pipeline",
		diagramCaption:
			"Training and serving path. Evaluation is kept out of the application layer so the app cannot silently be scoring on data the model was fitted to.",
		source: "https://github.com/ashmithhmaddala/crime-rate-prediction",
		stack: [
			{ name: "Python", why: "Pipeline and modelling." },
			{ name: "scikit-learn", why: "Model training and held-out evaluation." },
			{ name: "Streamlit", why: "An interactive front end without building one." },
			{ name: "Folium", why: "Leaflet maps from Python; the geography is the point." },
		],
		metrics: [
			{ value: "Geo", label: "interactive mapping", estimated: false },
			{ value: "E2E", label: "train to serve", estimated: false },
		],
		context:
			"Crime statistics are usually published as tables, which hides the two dimensions that matter most for theft. It clusters geographically and it clusters in time, and a table shows neither. A map with a time filter shows both at once.",
		architecture:
			"Cleaning and feature engineering over the incident dataset, then model training with evaluation held on a separate split, then a Streamlit front end reading the fitted model. Keeping evaluation out of the application layer matters more than it sounds: when the two live together it becomes easy to report scores from data the model was fitted on without noticing.",
		decisions: [
			{
				title: "Descriptive framing, not predictive",
				body: "The interface describes observed distributions and lets you filter them. It does not tell you an area will be dangerous next Tuesday, because the data cannot support that claim.",
			},
			{
				title: "Time as a first-class filter",
				body: "Aggregating a year of incidents into one map average hides the pattern entirely. Filtering by window and watching the distribution move is what makes it legible.",
			},
			{
				title: "Evaluation split kept outside the app",
				body: "The application loads a fitted model and never sees the training data. It makes leakage into the reported numbers structurally harder rather than a thing to remember.",
			},
		],
		hardPart:
			"Being honest about what the model can claim. Crime data records reporting behaviour as much as incidence. Areas where people do not report read as safe, and a model fitted on that will confidently reproduce the gap and present it as a finding. I kept the framing descriptive and exploratory, and said so in the interface, because the confident version of this tool would mostly launder that bias into something that looks objective. Deciding not to build the more impressive-sounding version was the actual work.",
		retrospective:
			"I would bring in a second signal to characterise the reporting gap rather than only caveat it. Population density, footfall or transit data would not eliminate the bias, but they would let the tool say something about where reporting is likely under-representing incidence, instead of leaving that entirely to a disclaimer.",
		outcome:
			"A working analytics dashboard with map-driven exploration over Bengaluru theft data, framed as exploratory throughout.",
	},
];

/*
 * Grouped, unranked. Percentage bars on skills are a portfolio tell — nobody
 * can defend "Python 92%" in an interview and the number tells the reader
 * nothing.
 */
export const STACK = [
	{
		group: "Security",
		note: "What I do now.",
		items: [
			"Threat modelling",
			"Secure SDLC",
			"Vulnerability management",
			"Application security review",
			"Dependency and supply chain review",
		],
	},
	{
		group: "Backend",
		note: "Where the instincts come from.",
		items: [
			"Python",
			"Flask",
			"Node.js",
			"Express",
			"REST API design",
			"SQL",
			"MongoDB",
		],
	},
	{
		group: "ML and research",
		note: "The other half of my attention.",
		items: [
			"scikit-learn",
			"Pandas",
			"NumPy",
			"Reinforcement learning",
			"Deep Q-networks",
			"Markov decision processes",
			"OpenCV",
		],
	},
	{
		group: "Tooling",
		note: "Day to day.",
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
