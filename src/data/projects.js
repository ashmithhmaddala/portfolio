/*
 * Projects, written from the actual repositories at
 * github.com/ashmithhmaddala rather than from the résumé.
 *
 * Everything here is traceable to a README. Where a project makes a strong
 * claim (a model accuracy, a detection rate) the site repeats it with the
 * qualifier the README itself uses. Where I don't know something — why a
 * decision was made, what you'd change — the field is absent rather than
 * invented. Fill those in and they'll render.
 *
 * `featured: true` gives a project a full case-study page at /work/:slug.
 * Everything else appears in the index list linking straight to GitHub.
 */

export const PROJECTS = [
	{
		slug: "theriac",
		num: "01",
		title: "theriac",
		period: "2026 – ongoing",
		role: "Solo build",
		featured: true,
		status: "Alpha, actively developed",
		oneLiner:
			"A static scanner for malicious instructions hidden in MCP tool descriptions. npm audit, for the metadata your model reads and you don't.",
		summary:
			"Model Context Protocol servers advertise tools with a name, a schema, and a description. The client shows you the name. The model reads the whole thing. theriac reads the document you don't.",
		tags: ["Security tooling", "MCP", "Static analysis"],
		diagram: "trustGap",
		diagramCaption:
			"The two documents. A client surfaces the tool name and a short summary; the model receives the full description and treats it as context. Anything in the gap is acted on but never seen.",
		source: "https://github.com/ashmithhmaddala/theriac",
		stack: [
			{ name: "Python 3.11+", why: "Typing and tooling for a scanner meant to be run in CI." },
			{ name: "Static analysis", why: "The scanner never invokes a tool. It reads metadata only." },
			{ name: "MCP transports", why: "Live ingestion, exercised end to end against a real server in the test suite." },
			{ name: "MCPTox", why: "External benchmark, with a dev and held-out split so the score is not self-graded." },
		],
		metrics: [
			{ value: "84%", label: "recall, held-out", estimated: false },
			{ value: "0%", label: "false positives, 118 tools", estimated: false },
			{ value: "3", label: "detection layers", estimated: false },
		],
		context:
			"An MCP server advertises each tool with a name, a JSON schema and a natural-language description. The client shows the user the name and a short summary. The model receives the full description and treats it as context. These are two different documents, and only one of them is ever read by a person. A server author can put text in the description that the user never sees but the model acts on: instructions aimed at the model, references to files outside the tool's stated scope, directives to prefer this tool over one the user configured. The tool's own code never has to run.",
		architecture:
			"Three detection layers, each catching what the others cannot. Structural pattern detection reads the prose for instructions aimed at the model. Schema validation checks the declared interface against what the description claims the tool does. Rug-pull diffing compares a recorded snapshot of a server's metadata against what it serves now. Around them sit a CLI, several reporting formats, live ingestion over both MCP transports, and an evaluation harness. It is defensive only: it generates no attacks and never invokes a tool. OWASP locates the cause of this attack class in a trust gap between connect time and runtime, because nothing in the protocol re-validates a description after the user approves it. A manifest that was clean when connected can change afterwards, which is exactly what the third layer exists to catch.",
		decisions: [
			{
				title: "Never invoke a tool",
				body: "A scanner that executes what it is scanning becomes a delivery mechanism for the thing it is looking for. Metadata only, always. It also means the scanner is safe to point at a server you do not trust, which is the entire use case.",
			},
			{
				title: "Snapshot and diff, not just judge",
				body: "Prose detection is heuristic and will always have a miss rate. Recording a server's metadata and comparing it later is not heuristic at all. It catches the rug pull case exactly, because it compares recorded bytes instead of forming an opinion about wording.",
			},
			{
				title: "Evaluate against a benchmark I did not write",
				body: "Testing a detector against your own examples measures how well it matches your assumptions. The scanner is run against published servers and against an external benchmark, which is the only way the detection rate means anything.",
			},
		],
		hardPart:
			"The first time it met MCPTox it scored 8% recall. I had built it against my own idea of what a poisoned tool description looks like, and my idea was narrow. Eight percent is not a tuning problem, it is being wrong about the shape of the thing. Reading the cases it missed rebuilt the structural layer around what attackers actually write rather than what I had imagined, which took it to 65%. Getting to 84% came from the second layer, checking the declared schema against what the description claims, because a good fraction of the remaining misses were tools whose prose was innocent and whose interface was not. The discipline throughout was a dev and held-out split, so the number I report is from data the detector never saw during development.",
		retrospective:
			"84% is a miss rate of roughly one in six, and no amount of further tuning against MCPTox will fix that honestly, because at some point you are fitting the benchmark instead of the problem. That is the argument for the third layer: rug-pull diffing compares recorded metadata against what a server serves now, which is not a judgement about prose and therefore has no miss rate of this kind. The severities are also considered defaults rather than calibrated against the whole ecosystem, and calibrating them needs a wider corpus of real servers than I have looked at.",
		outcome:
			"84% recall on held-out MCPTox data, up from 8% at the first external evaluation. Zero false positives across 118 tools on 8 external servers. All three detection layers, the reporting formats, the CLI, live ingestion and the evaluation harness are implemented and tested, with both transports exercised end to end against a real MCP server.",
	},

	{
		slug: "turing-defense",
		num: "02",
		title: "Turing Defense",
		period: "2025",
		role: "Solo build",
		featured: true,
		oneLiner:
			"Bot detection from behavioural biometrics. Tells humans from automation by how they move, without a CAPTCHA.",
		summary:
			"A 56-feature neural classifier over mouse dynamics, keystroke timing and interaction patterns, streamed in real time. Trained against eleven automation profiles and hardened against evasion.",
		tags: ["Machine learning", "Security", "Full-stack"],
		diagram: "biometrics",
		diagramCaption:
			"Capture to decision. Behavioural events are reduced to 56 features across four families, then classified. Adversarial training closes the loop that a naive classifier leaves open.",
		source: "https://github.com/ashmithhmaddala/Turing-Defense",
		stack: [
			{ name: "PyTorch", why: "The classifier and the adversarial training loop." },
			{ name: "Flask", why: "Feature extraction and inference behind a WebSocket." },
			{ name: "React", why: "Behavioural capture in the browser." },
			{ name: "WebSocket", why: "Sub-second analysis needs a stream, not a form post." },
		],
		metrics: [
			{ value: "91.8%", label: "accuracy on test set", estimated: false },
			{ value: "56", label: "behavioural features", estimated: false },
			{ value: "11", label: "attack profiles trained against", estimated: false },
		],
		context:
			"CAPTCHAs push the cost of bot detection onto every legitimate user, and they are increasingly solvable by the automation they exist to stop. Behavioural biometrics moves the signal to something automation is bad at imitating: the physical texture of how a person actually moves a pointer and types.",
		architecture:
			"The React client captures mouse movement, keystrokes, click patterns and scroll events, and streams them to a Flask backend over a WebSocket. Feature extraction reduces the stream to 56 dimensions across four families: kinematics such as velocity and acceleration, geometry such as curvature and path shape, temporal features such as timing entropy, and micro-patterns such as correction movements. A neural classifier scores the vector. Detection is sub-second, so it can gate an action rather than run as an after-the-fact report.",
		decisions: [
			{
				title: "Four feature families, not one",
				body: "Kinematics alone is the easiest thing to fake, because smooth interpolation between points is trivial to generate. Curvature, timing entropy and correction micro-patterns are much harder to synthesise together, and the combination is what makes the classifier hold up.",
			},
			{
				title: "Train against real automation, not synthetic noise",
				body: "The model is trained against eleven concrete profiles including Selenium, Puppeteer and credential stuffers, rather than against random perturbation. A detector tuned on imagined attackers tends to be excellent at catching attackers who do not exist.",
			},
			{
				title: "Adversarial robustness as a requirement",
				body: "FGSM and PGD are applied during training, because a classifier that is accurate but trivially evadable is not a security control. Anything gating access has an adversary who will look at the gradient.",
			},
		],
		hardPart:
			"False positives are the expensive failure here, not false negatives. Missing a bot costs you one bot. Blocking a real person costs you that person, and they do not file a bug report about it. That constraint shapes the whole design, and it is why adversarial robustness had to be trained in rather than bolted on: a system tuned aggressively enough to catch evasive automation is exactly the system that starts flagging anyone with an unusual input device or a tremor.",
		outcome:
			"91.8% accuracy on the held-out test set, with the zero false-positive rate measured on that same set. Real-time detection over WebSocket streaming, with the React client, Flask backend and trained model all in the repository.",
	},

	{
		slug: "tactic",
		num: "03",
		title: "TACTIC",
		period: "2025",
		role: "Solo build",
		featured: true,
		oneLiner:
			"Temporal Attack Chain Threat Identification and Correlation. Finds intrusions by linking events over time instead of alerting on each one.",
		summary:
			"A log-based intrusion detection system that correlates Linux authentication, privilege escalation and process execution events into attack chains, mapped to MITRE ATT&CK.",
		tags: ["Detection engineering", "MITRE ATT&CK", "Python"],
		diagram: "attackChain",
		diagramCaption:
			"Event-based versus chain-based detection. Individually each event is unremarkable and below the alerting threshold. Linked in sequence, the same events describe a kill chain.",
		source: "https://github.com/ashmithhmaddala/TACTIC",
		stack: [
			{ name: "Python", why: "Parsers, correlation engine and the chain model." },
			{ name: "MITRE ATT&CK", why: "A shared vocabulary for what a chain actually represents." },
			{ name: "BETH dataset", why: "Real kernel-level host telemetry, so the evaluation is not against traffic I generated." },
		],
		metrics: [
			{ value: "86%", label: "recall on BETH", estimated: false },
			{ value: "ATT&CK", label: "TTP mapped", estimated: false },
		],
		context:
			"Modern attacks are rarely a single malicious event. An adversary gets initial access, does reconnaissance, escalates privilege, moves laterally, and then exfiltrates or persists. Traditional intrusion detection treats each event in isolation, which creates two failures at once. Analysts drown in disconnected alerts that are false positives individually but obviously malicious in sequence. And attacks that live off the land using legitimate system tools never trip a signature at all, because no single step is unusual.",
		architecture:
			"Log sources feed parsers, which normalise events into primitives. The correlation engine links primitives that are related in time and by subject into chains, and chains are mapped onto MITRE ATT&CK tactics and techniques. The output is a reconstructed kill chain rather than a list of alerts, which is a different artefact: it tells an analyst what story the events tell, not just that something happened.",
		decisions: [
			{
				title: "Correlate on time and subject, not signature",
				body: "Signature matching is what living-off-the-land attacks are designed to survive. Sequence is much harder to disguise, because the attacker still has to do the steps in an order that makes sense.",
			},
			{
				title: "Map to ATT&CK rather than invent taxonomy",
				body: "A chain labelled with recognised technique IDs can be handed to someone else and understood immediately. A bespoke severity scheme cannot.",
			},
		],
		hardPart:
			"Alert fatigue is the actual adversary. A detection system that produces more output than a human can read has not improved security, it has moved the failure somewhere less visible. Shifting from event-based to chain-based detection is a bet that fewer, richer alerts beat many thin ones, and that only pays off if the correlation is good enough that the chains it builds are real. A correlation engine that links unrelated events produces confident fiction, which is worse than noise.",
		outcome:
			"86% recall on the BETH dataset, which is real kernel-level host telemetry rather than traffic I generated for the purpose. The pipeline runs end to end from raw Linux logs through parsers and primitives to correlated, ATT&CK-mapped attack chains.",
	},

	{
		slug: "reconpilot",
		num: "04",
		title: "ReconPilot",
		period: "2025",
		role: "Solo build",
		featured: true,
		oneLiner:
			"Reconnaissance as an attack graph. Turns subdomain lists into something you can see the shape of.",
		summary:
			"Combines passive OSINT, active probing and vulnerability scanning into one interactive graph, so relationships and critical paths are visible instead of buried in a spreadsheet.",
		tags: ["Offensive tooling", "Graph analysis", "Async Python"],
		diagram: "attackGraph",
		diagramCaption:
			"Assets become nodes and relationships become edges, so a path from an exposed subdomain to a known CVE is something you can trace rather than reconstruct by hand.",
		source: "https://github.com/ashmithhmaddala/reconpilot",
		stack: [
			{ name: "asyncio", why: "Concurrent scanning without a thread per target." },
			{ name: "NetworkX", why: "The graph model behind the visualisation." },
			{ name: "Playwright", why: "Headless checks against JavaScript-heavy applications." },
			{ name: "Nuclei", why: "CVE and misconfiguration signal, mapped onto the assets it affects." },
		],
		metrics: [
			{ value: "Graph", label: "not a flat list", estimated: false },
			{ value: "1 file", label: "self-contained report", estimated: false },
		],
		context:
			"Reconnaissance tools are good at producing long lists of subdomains and IP addresses, which is a data overload problem rather than an information problem. The thing an assessment actually needs is the relationships: which asset hosts which service, which service carries which vulnerability, and what path that creates. A spreadsheet hides all of it.",
		architecture:
			"A four-stage pipeline. Discovery aggregates subdomains from DNS, Certificate Transparency logs via crt.sh, and APIs such as HackerTarget. Scanning validates which assets are live, fingerprints their technology and runs headless browser checks. Nuclei supplies vulnerability context. The graph stage builds a directed graph where nodes are assets and edges are relationships such as hosts, runs and has_vulnerability. Reporting compiles it into a single self-contained HTML dashboard with an interactive physics-enabled view.",
		decisions: [
			{
				title: "Passive first, then active",
				body: "Certificate Transparency and DNS aggregation cost the target nothing and are legally uncomplicated. Running active probes only against what passive discovery already found keeps the noisy half of the pipeline as small as possible.",
			},
			{
				title: "One HTML file as the deliverable",
				body: "A report that needs a server to view is a report that does not get read. Self-contained output can be attached to a ticket, opened offline, and archived as evidence without any of it decaying.",
			},
			{
				title: "Relationships as first-class data",
				body: "Storing has_vulnerability as an edge rather than a column is what makes critical-path questions answerable. It turns a lookup into a traversal.",
			},
		],
		hardPart:
			"Making a graph legible once it has real data in it. A physics-enabled view of a few dozen nodes explains an attack surface. The same view with a few thousand is a hairball that explains nothing, and the tool has quietly recreated the data overload problem it was built to solve, just in a prettier format.",
		outcome:
			"A working reconnaissance pipeline producing an interactive attack graph as a single shareable HTML dashboard.",
	},

	{
		slug: "locard",
		num: "05",
		title: "LOCARD",
		period: "2026",
		role: "Solo build",
		featured: true,
		status: "Research, not public",
		oneLiner:
			"Forensic attribution for multi-agent LLM systems. Given a fragmented log and one bad output, work backwards to which agent was patient zero.",
		summary:
			"Named after Edmond Locard, whose Exchange Principle says every contact leaves a trace. Applied to agent systems: every agent that touches a malicious instruction leaves evidence in the log, even when the log is split across trust domains and events are missing.",
		tags: ["AI security", "Forensics", "Research"],
		diagram: "attribution",
		diagramCaption:
			"Backward taint walk across a domain boundary. Phantom nodes stand in for events the log never captured, and three signals rank the surviving candidates.",
		source: null,
		stack: [
			{ name: "NetworkX", why: "The provenance graph, with phantom nodes for events the log is missing." },
			{ name: "Pure-Python PageRank", why: "Power iteration by hand, because scipy was not available in the target environment." },
			{ name: "pytest", why: "84 tests, because attribution logic fails quietly and plausibly." },
		],
		metrics: [
			{ value: "3", label: "independent signals", estimated: false },
			{ value: "84", label: "passing tests", estimated: false },
			{ value: "0", label: "model internals needed", estimated: false },
		],
		context:
			"When several LLM agents hand work to each other and something malicious comes out the far end, the architecture gives you no answer to who started it. Worse, the evidence is spread across channels that output-only auditing never sees: inter-agent messages, tool arguments, shared memory. Logs are also fragmented, because different agents belong to different trust domains and nobody has the whole picture. The question is forensic, not preventive: after the fact, from an incomplete record, which agent was patient zero?",
		architecture:
			"Events form a provenance graph, with parent links preserving causality across five channel types. A backward breadth-first taint walk from the suspected bad event finds every agent that could have influenced it, with a time-window heuristic bridging gaps where the log is fragmented. Three independent signals then rank the candidates: Jaccard similarity between payloads, timing earliness on the assumption that patient zero comes first, and PageRank centrality in the graph. Missing events become phantom nodes rather than silently breaking the chain, so a gap in the record is visible instead of invisible.",
		decisions: [
			{
				title: "Log-only, no model internals",
				body: "Attribution requires no access to weights, activations or runtime state. That is what makes it usable across a trust boundary, where you will never be given the other party's model.",
			},
			{
				title: "Exclude the bad event from its own similarity score",
				body: "Comparing an event to itself returns a perfect match and poisons the ranking with a circular result. Small detail, and it invalidates everything downstream if you miss it.",
			},
			{
				title: "Phantom nodes for missing events",
				body: "A fragmented log has holes. Representing a hole explicitly keeps the chain connected and, more importantly, keeps the gap visible in the output rather than quietly absorbed into a confident answer.",
			},
			{
				title: "Ground truth kept outside the event stream",
				body: "The harness records patient zero separately from the trace, so the attribution engine cannot read the answer off its own input. An evaluation that can see the label is not an evaluation.",
			},
		],
		hardPart:
			"The limitation is structural and cannot be engineered away. LOCARD can only see influence that manifested as explicit payload content. An agent that was semantically steered without the instruction appearing in any logged text is invisible to it, and no amount of better scoring changes that. The result carries a flag, attribution_bounded_by_payload_visibility, which is always true. Shipping a permanently-on limitation notice felt like admitting the tool is incomplete. It is more accurate to say that is the honest boundary of log-based forensics, and a version without that flag would just be the same tool lying about its reach.",
		retrospective:
			"The harness generates traces from a fixed coordinator-worker topology across two domains. Real deployments use richer topologies, and propagation behaviour almost certainly changes with shape. Evaluating against star, chain and tree arrangements is the obvious next step, and I expect the timing-earliness signal to be the one that degrades first.",
		outcome:
			"A working attribution package: provenance graph, taint walk, three-signal scorer and a public API that takes an event log and a suspected bad event and returns a chain of custody with ranked origins. A separate harness generates traces, fragments them across domains, injects propagating payloads and scores results at precision, recall and top-k accuracy. Design is grounded in AgentLeak, MultiAgentBench, Prompt Infection and the OWASP Top 10 for Agentic Applications.",
	},

	{
		slug: "aiken",
		num: "06",
		title: "AIKEN",
		period: "2026",
		role: "Solo build",
		featured: true,
		status: "Research, not public",
		oneLiner:
			"An autonomous penetration testing platform. Maps attack surface, forms hypotheses, validates them with probes, and writes the report.",
		summary:
			"Benchmarked against the XBOW validation suite through six weeks of iteration, from zero flags captured to 65.8% full solve. The benchmark record is the interesting part, including the entry where I corrected my own headline number downwards.",
		tags: ["Offensive security", "AI agents", "Benchmarked"],
		diagram: "pentestLoop",
		diagramCaption:
			"The phase pipeline. Exploitation is deliberately bounded, and attempt history feeds back into hypothesis generation so a failed probe narrows the next one.",
		source: null,
		stack: [
			{ name: "Python", why: "Backend, worker and the playbook layer." },
			{ name: "Docker", why: "Benchmarks run as isolated containers, one target per run." },
			{ name: "OpenAI", why: "Provider-pluggable, so the reasoning layer is not tied to one vendor." },
			{ name: "XBOW benchmarks", why: "104 published CTF-style challenges I did not write." },
		],
		metrics: [
			{ value: "65.8%", label: "full solve, 38 targeted", estimated: false },
			{ value: "81.6%", label: "any formal finding", estimated: false },
			{ value: "0%", label: "where it started", estimated: false },
		],
		context:
			"Penetration testing has a large repetitive middle: enumerate the surface, form a hypothesis about what might be wrong, test it, and write it up. The first and last of those are close to mechanical. I wanted to know how much of the middle an agent could carry, and the only way to answer that honestly is against a benchmark somebody else wrote.",
		architecture:
			"A phased pipeline. Reconnaissance maps the attack surface. A deterministic probe layer establishes reachability before anything speculative runs. Hypothesis generation proposes what class of vulnerability might be present. A bounded exploitation phase tests those hypotheses, with adaptive attempt history so a failed probe narrows the next one rather than repeating it. Reporting produces formal findings. Bounding exploitation matters: an unbounded agent with exploit tooling explores forever and produces no report, which is worse than useless during an engagement.",
		decisions: [
			{
				title: "Deterministic probes before speculative ones",
				body: "Reachability is a fact, not a hypothesis. Establishing it deterministically first means the model is never reasoning about whether a host is up, which is both wasteful and a reliable source of confident nonsense.",
			},
			{
				title: "Bound the exploitation phase",
				body: "An agent that can attempt exploits will attempt them indefinitely. The bound is what turns an interesting demo into something that finishes and hands you a report.",
			},
			{
				title: "Adaptive attempt history",
				body: "Feeding failed attempts back into hypothesis generation is the difference between search and thrashing. Without it the agent re-runs the same three payloads against the same endpoint.",
			},
			{
				title: "Benchmark against a suite I did not write",
				body: "XBOW publishes 104 CTF-style challenges. Testing against my own targets would have measured how well AIKEN matches my idea of a vulnerable application.",
			},
		],
		hardPart:
			"Some of the benchmarks were broken. Their Dockerfiles did not build, so those runs recorded infrastructure errors and were excluded from the score. Repairing them was optional, and it was going to make my numbers worse, because a benchmark that becomes runnable is a benchmark that can now be failed. I repaired them. Newly runnable targets immediately exposed real misses in IDOR, XXE, pickle deserialisation, GraphQL SQL injection and authentication bypass. The headline dropped from 82.8% to 65.8%, and the stats file says so in as many words: the old number was stale, and it excluded the failures the repairs revealed. A scorecard that only moves upward is a scorecard measuring the wrong thing.",
		retrospective:
			"Against the full 104-challenge suite rather than the targeted subset, the honest figure is far lower, somewhere around 5 to 10%, and that gap is a scope mismatch rather than a bug. XBOW is built for flag-capture agents that inject payloads and exfiltrate. AIKEN is a detection and reporting tool that happens to capture flags when the path is short. Reporting one number without that context would be the more flattering choice and the less true one.",
		outcome:
			"25 PASS, 6 PARTIAL and 7 FAIL across 38 runnable targeted benchmarks: 65.8% full solve and 81.6% producing at least a formal finding. Six weeks earlier the same platform captured zero flags and produced a formal finding on 9.1% of runnable targets. Every run is dated in a living scorecard, including the corrections.",
	},

	/* ------------------------------------------------------------------
	 * Index-only. Real projects, but I don't know enough about the
	 * decisions behind them to write a case study that isn't invented.
	 * Add `featured: true` plus the case-study fields to promote one.
	 * ------------------------------------------------------------------ */

	{
		slug: "sentinel",
		title: "SENTINEL",
		period: "2025",
		featured: false,
		oneLiner:
			"A BiLSTM-based intrusion detection system. Sequence modelling applied to network intrusion rather than hand-written rules.",
		tags: ["Machine learning", "Detection"],
		stackNames: ["Python", "BiLSTM"],
		source: null,
		note: "Academic project. The bidirectional layer matters here because intrusion signatures are often only recognisable given what came after them, not just before.",
	},
	{
		slug: "fracture",
		title: "Fracture",
		period: "2026",
		featured: false,
		oneLiner:
			"Valorant match analytics, built because I wanted better stats than the game gives you.",
		tags: ["Full-stack", "Not security"],
		stackNames: ["React", "shadcn/ui", "Henrik Dev API"],
		source: null,
		note: "Here for range rather than depth. Not everything has to be a security tool.",
	},

	{
		slug: "ai-vulnerability-scanner",
		title: "AI Vulnerability Scanner",
		period: "2025",
		featured: false,
		oneLiner:
			"A modular web vulnerability scanner that uses machine learning to cut false positives, and can run entirely locally against Ollama so nothing leaves the machine.",
		tags: ["AppSec", "Machine learning"],
		stackNames: ["Python", "scikit-learn", "Ollama"],
		source: "https://github.com/ashmithhmaddala/ai-vulnerability-scanner",
		note: "Crawls, tests for SQL injection, XSS, directory traversal and header misconfiguration, then ranks findings with attack scenarios and remediation guidance.",
	},
	{
		slug: "netprobe",
		title: "NetProbe",
		period: "2026",
		featured: false,
		oneLiner:
			"Passive network telemetry analysis that detects DNS tunnelling, C2 beaconing and cleartext credentials from protocol metadata alone.",
		tags: ["Network security", "Detection"],
		stackNames: ["Python", "Heuristics"],
		source: "https://github.com/ashmithhmaddala/NetProbe",
		note: "Metadata only, never payload inspection, which makes it usable in environments where privacy compliance rules out deep packet inspection.",
	},
	{
		slug: "vantage",
		title: "Vantage",
		period: "2025",
		featured: false,
		oneLiner:
			"Asynchronous visual reconnaissance. Screenshots targets at scale and classifies them as login portals, admin panels or dashboards.",
		tags: ["Offensive tooling", "Automation"],
		stackNames: ["FastAPI", "Playwright", "asyncio"],
		source: "https://github.com/ashmithhmaddala/Vantage-Automated-Visual-Intelligence-Platform",
		note: "Visual triage rather than text triage, for finding the high-value targets in a large URL set quickly.",
	},
	{
		slug: "cli-packet-analyzer",
		title: "CLI Packet Analyzer",
		period: "2025",
		featured: false,
		oneLiner:
			"Live capture and pcap analysis with protocol dissection, TLS SNI extraction and alerting on cleartext credentials.",
		tags: ["Network security", "Tooling"],
		stackNames: ["Python", "BPF"],
		source: "https://github.com/ashmithhmaddala/cli-packet-analyzer",
		note: "Dissects Ethernet through to DNS, HTTP and TLS, with a plugin system for custom dissectors and JSON Lines output for downstream processing.",
	},
	{
		slug: "red-vs-blue",
		title: "Red vs Blue CTF Platform",
		period: "2025",
		featured: false,
		oneLiner:
			"A team-based capture-the-flag platform with real-time scoring, Google OAuth and duplicate-capture protection.",
		tags: ["Full-stack", "Real-time"],
		stackNames: ["Node.js", "React", "Socket.io", "SQLite"],
		source: "https://github.com/ashmithhmaddala/Red-vs-Blue-CTF-Platform",
		note: "JWT plus OAuth 2.0, with activity logging and separate team and individual submission tracking.",
	},
	{
		slug: "ctftool",
		title: "ctftool",
		period: "2025",
		featured: false,
		oneLiner:
			"A CTF toolkit covering cryptography, steganography, forensics and web, built to kill the repetitive parts.",
		tags: ["CTF", "Tooling"],
		stackNames: ["Python"],
		source: "https://github.com/ashmithhmaddala/ctftool",
		note: "Hash identification and cracking, multi-byte XOR key recovery with scoring, LSB extraction from PNGs, magic-byte file typing and JWT decoding.",
	},
	{
		slug: "python-chess-engine",
		title: "Python Chess Engine",
		period: "2025",
		featured: false,
		oneLiner:
			"A UCI-compliant chess engine with minimax, alpha-beta pruning and iterative deepening, built to be measured rather than to win.",
		tags: ["Algorithms", "Systems"],
		stackNames: ["Python", "UCI"],
		source: "https://github.com/ashmithhmaddala/python-chess-engine",
		note: "Speaking the protocol properly means real GUIs and other engines will play it. There is an interactive walkthrough of its search in the lab.",
	},
];

export const FEATURED = PROJECTS.filter((p) => p.featured);
export const OTHERS = PROJECTS.filter((p) => !p.featured);
