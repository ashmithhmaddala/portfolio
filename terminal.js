/* ─── Interactive Terminal ─── */
(function () {
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");
  if (!output || !input) return;

  const PROMPT = "visitor@ashmith.sec:~$ ";
  const RESUME_PATH = "public/resume.pdf";
  const VISUAL_STATE_KEY = "portfolio.visualState";
  const REDUCED_MOTION_STYLE_ID = "terminal-reduced-motion-style";
  const HEMAL_STYLE_ID = "hemal-easter-egg-style";
  const HEMAL_OVERLAY_ID = "hemal-easter-egg-overlay";
  const VISUAL_PRESETS = {
    mars: {
      accent: "#ff3b3b",
      accentHover: "#ff6666",
      bg: "#11131a",
      bgElevated: "#171a22",
      bgCard: "#171a22",
      bgMuted: "#1f2330",
      border: "#2a3040",
      borderSubtle: "#1a1f2b",
      borderHover: "#3a4259",
      navBg: "rgba(17, 19, 26, 0.85)",
      label: "Mars Red",
    },
    neon: {
      accent: "#00ff88",
      accentHover: "#4dffad",
      bg: "#0d1110",
      bgElevated: "#141a18",
      bgCard: "#141a18",
      bgMuted: "#1b2623",
      border: "#234036",
      borderSubtle: "#182620",
      borderHover: "#2f5e4f",
      navBg: "rgba(13, 17, 16, 0.85)",
      label: "Neon Grid",
    },
    frost: {
      accent: "#5ad7ff",
      accentHover: "#8be5ff",
      bg: "#0f1624",
      bgElevated: "#182132",
      bgCard: "#182132",
      bgMuted: "#212d42",
      border: "#324565",
      borderSubtle: "#202c40",
      borderHover: "#45608c",
      navBg: "rgba(15, 22, 36, 0.85)",
      label: "Frost Byte",
    },
    pink: {
      accent: "#ff4fa3",
      accentHover: "#ff7fbd",
      bg: "#1a0f17",
      bgElevated: "#241522",
      bgCard: "#241522",
      bgMuted: "#332036",
      border: "#5a2f54",
      borderSubtle: "#2a1a2b",
      borderHover: "#7a4380",
      navBg: "rgba(26, 15, 23, 0.85)",
      label: "Pink Nebula",
    },
  };
  const PROFILE_LINKS = {
    github: "https://github.com/ashmithhmaddala",
    linkedin: "https://www.linkedin.com/in/ashmith-maddala/",
    twitter: "https://x.com/axmxtxh",
    instagram: "https://www.instagram.com/ashmith.xd/",
    writing: "writing.html",
    work: "work.html",
    contact: "contact.html",
  };
  const PROJECTS = [
    {
      slug: "cli-packet-analyzer",
      title: "CLI Packet Analyzer",
      description: "Network traffic analysis tool (Python)",
      focus: "packet inspection, CLI workflows, parsing raw traffic",
    },
    {
      slug: "crime-rate-prediction",
      title: "Crime Rate Prediction",
      description: "ML dashboard for Bengaluru theft data",
      focus: "data storytelling, prediction, civic datasets",
    },
    {
      slug: "ai-vulnerability-scanner",
      title: "AI Vulnerability Scanner",
      description: "ML-powered codebase security scanner",
      focus: "static analysis ideas, security automation, experimentation",
    },
    {
      slug: "red-vs-blue-ctf",
      title: "Red vs Blue CTF",
      description: "CTF platform for security training",
      focus: "hands-on learning, offense/defense scenarios",
    },
    {
      slug: "portfolio",
      title: "Portfolio",
      description: "This website (HTML/CSS/JS)",
      focus: "design, storytelling, terminal interactions",
    },
    {
      slug: "job-board-app",
      title: "Job Board App",
      description: "Flask job tracker for Indian cities",
      focus: "backend workflows, useful product thinking",
    },
    {
      slug: "learnsmart-engineer",
      title: "LearnSmart Engineer",
      description: "AI-powered learning recommendations",
      focus: "recommendation flows, practical AI use",
    },
    {
      slug: "python-chess-engine",
      title: "Python Chess Engine",
      description: "UCI chess engine with minimax search",
      focus: "search algorithms, evaluation logic, performance",
    },
    {
      slug: "civicpulse",
      title: "CivicPulse",
      description: "Civic engagement platform",
      focus: "community problems, product design, impact",
    },
    {
      slug: "chef-game",
      title: "Chef Game",
      description: "Interactive cooking game (JS)",
      focus: "frontend interactivity, playful interfaces",
    },
  ];
  const OPEN_TARGETS = {
    home: { href: "index.html", label: "Home", description: "Landing page and hero section." },
    about: { href: "about.html", label: "About", description: "Experience, skills, and background." },
    work: { href: "work.html", label: "Work", description: "Projects and experiments." },
    writing: { href: "writing.html", label: "Writing", description: "Articles and thoughts." },
    contact: { href: "contact.html", label: "Contact", description: "Ways to reach out." },
    github: { href: PROFILE_LINKS.github, label: "GitHub", description: "Repos, experiments, and code.", external: true },
    linkedin: { href: PROFILE_LINKS.linkedin, label: "LinkedIn", description: "Career history and current role.", external: true },
    twitter: { href: PROFILE_LINKS.twitter, label: "Twitter", description: "Smaller thoughts and links.", external: true },
    instagram: { href: PROFILE_LINKS.instagram, label: "Instagram", description: "Life outside work.", external: true },
    resume: { href: RESUME_PATH, label: "Resume", description: "PDF download.", external: true, download: true },
    "article-1": { href: "article-1.html", label: "Article 1", description: "Balance outside cybersecurity." },
    "article-2": { href: "article-2.html", label: "Article 2", description: "How tech changed everyday problem-solving." },
  };
  const MAN_PAGES = {
    help: "help\nList built-in commands and discover what the terminal can do.",
    theme: "theme <mars|neon|frost|pink>\nSwitch the website color preset in real time.",
    accent: "accent <hex>\nSet a custom accent color. Example: accent #ff3b3b",
    fx: "fx <particles|scanlines|motion> <on|off>\nToggle visual effects and animation behavior.",
    ui: "ui\nShow current visual theme, accent, and effect states.",
    open: "open <target>\nOpen pages or profiles like 'open github', 'open work', or 'open resume'.",
    cat: "cat <target>\nRead a built-in file or inspect a project with 'cat project portfolio'.",
    search: "search <query>\nSearch across commands, projects, and topics in the terminal.",
    history: "history\nShow the latest commands entered in this session.",
    sudo: "sudo hire ashmith\nStart the interactive contact flow. Generic sudo just complains politely.",
    ping: "ping [host]\nPing ashmith, ashmith.sec, or any pretend host you want to test.",
    nmap: "nmap [host]\nScan Ashmith's fake attack surface with an optional host argument.",
    ssh: "ssh <host>\nFake SSH into Ashmith's corner of the internet. Public shell access is not included.",
    traceroute: "traceroute <host>\nTrace a route through caffeine, Wi-Fi, and curiosity.",
  };

  const COMMANDS = {
    help: () =>
      `<span class="t-green">Available commands:</span>
  help          Show this help message
  about         Quick intro
  skills        Technical skills
  projects      My projects
  experience    Work experience
  education     Education background
  research      Areas of interest
  ctf           CTF & community stuff
  contact       Get in touch
  socials       Social links
  open <target> Open a page or profile
  cat <target>  Read a file or project note
  search <term> Search the terminal index
  github        Open GitHub profile
  linkedin      Open LinkedIn profile
  writing       Read latest writing
  work          Jump to projects page
  resume        Download resume
  download      Download resume
  stack         Tech stack I use daily
  tools         Security toolkit
  certs         Certifications & learning
  hobbies       Life outside work
  goals         What I'm working toward
  roadmap       Current focus areas
  stats         Portfolio snapshot
  banner        Print terminal banner
  history       Show recent commands
  coffee        Brew status
  weather       Bangalore weather.exe
  matrix        Enter the matrix
  top           Show live system-ish stats
  ps            List running "processes"
  netstat       Show exposed services
  ssh <host>    Attempt remote shell access
  traceroute <host>  Follow packets through the void
  sudo          Complain about missing privileges
  hack          Run cinematic hacking mode
  quote         Random security quote
  whoami        Who are you?
  hostname      Where are you?
  date          Current date
  uptime        How long this site's been live
  uname         System info
  neofetch      System fetch
  ping [host]   Ping ashmith
  nmap [host]   Scan open ports
  vontier       Current internship snapshot
  bangalore     City status
  barca         Football allegiance check
  books         Current reading shelf
  food          Favourite food side quest
  playlist      Coding soundtrack
  cat flag.txt  Find the flag
  rm -rf /      Try it
  exit          Close terminal
  clear         Clear the terminal
  sudo hire ashmith   😉

<span class="t-muted">Tip: use ↑/↓ arrows to navigate command history</span>`,

    about: () =>
      `<span class="t-green">$ cat about.txt</span>

Hi, I'm <span class="t-accent">Ashmith Maddala</span>.
Product Security Intern @ Vontier, Bangalore.
I break things to understand how to protect them.
Focused on AppSec, threat modeling, and building
tools that make software safer.`,

    skills: () =>
      `<span class="t-green">$ cat skills.json</span>

<span class="t-accent">Security</span>     Application Security, Threat Modelling,
           Secure SDLC, Vulnerability Assessment,
           OWASP Top 10, Security Code Review

<span class="t-accent">Tools</span>        Burp Suite, Nmap, Wireshark,
           OWASP ZAP, Metasploit

<span class="t-accent">Languages</span>    Python, JavaScript, Bash, SQL

<span class="t-accent">Platforms</span>    Linux, Git, Docker, AWS`,

    projects: () =>
      `<span class="t-green">$ ls ~/projects/</span>

<span class="t-accent">cli-packet-analyzer</span>      Network traffic analysis tool (Python)
<span class="t-accent">crime-rate-prediction</span>    ML dashboard for Bengaluru theft data
<span class="t-accent">ai-vulnerability-scanner</span> ML-powered codebase security scanner
<span class="t-accent">red-vs-blue-ctf</span>          CTF platform for security training
<span class="t-accent">portfolio</span>                This website (HTML/CSS/JS)
<span class="t-accent">job-board-app</span>            Flask job tracker for Indian cities
<span class="t-accent">learnsmart-engineer</span>      AI-powered learning recommendations
<span class="t-accent">python-chess-engine</span>      UCI chess engine with minimax search
<span class="t-accent">civicpulse</span>               Civic engagement platform
<span class="t-accent">chef-game</span>                Interactive cooking game (JS)

<span class="t-muted">View all → </span><a href="work.html" class="t-link">work.html</a>`,

    experience: () =>
      `<span class="t-green">$ cat experience.md</span>

<span class="t-accent">Vontier</span> — Product Security Intern
<span class="t-muted">July 2025 – Present</span>

• Application security reviews & vulnerability assessments
• Threat modelling & attack path analysis
• Building security automation tools
• Implementing secure SDLC practices with eng teams`,

    education: () =>
      `<span class="t-green">$ cat education.txt</span>

Pursuing B.Tech in Computer Science
Focused on cybersecurity and software engineering.
Active in CTF competitions and security communities.`,

    research: () =>
      `<span class="t-green">$ cat research-interests.md</span>

• Application Security & Secure Code Review
• Threat Modelling & Attack Surface Analysis
• Security Automation & DevSecOps
• Penetration Testing Methodologies
• Machine Learning for Security Applications`,

    ctf: () =>
      `<span class="t-green">$ cat ctf.log</span>

I join CTFs when the vibe is fun – not as a
serious grind, just for learning and challenge.
Connected to college tech groups and cyber servers.

Dream: attend <span class="t-accent">DEF CON</span> someday 🏴‍☠️`,

    contact: () =>
      `<span class="t-green">$ cat contact.vcf</span>

<span class="t-accent">Email</span>      ashmith.maddala@gmail.com
<span class="t-accent">GitHub</span>     <a href="https://github.com/ashmithhmaddala" target="_blank" rel="noreferrer" class="t-link">github.com/ashmithhmaddala</a>
<span class="t-accent">LinkedIn</span>   <a href="https://www.linkedin.com/in/ashmith-maddala/" target="_blank" rel="noreferrer" class="t-link">linkedin.com/in/ashmith-maddala</a>
<span class="t-accent">Twitter</span>    <a href="https://x.com/axmxtxh" target="_blank" rel="noreferrer" class="t-link">x.com/axmxtxh</a>`,

    socials: () =>
      `<span class="t-green">$ cat socials.md</span>

<span class="t-accent">GitHub</span>      <a href="https://github.com/ashmithhmaddala" target="_blank" rel="noreferrer" class="t-link">github.com/ashmithhmaddala</a>
<span class="t-accent">LinkedIn</span>    <a href="https://www.linkedin.com/in/ashmith-maddala/" target="_blank" rel="noreferrer" class="t-link">linkedin.com/in/ashmith-maddala</a>
<span class="t-accent">Twitter</span>     <a href="https://x.com/axmxtxh" target="_blank" rel="noreferrer" class="t-link">x.com/axmxtxh</a>
<span class="t-accent">Instagram</span>   <a href="https://www.instagram.com/ashmith.xd/" target="_blank" rel="noreferrer" class="t-link">instagram.com/ashmith.xd</a>`,

    github: () =>
      `<span class="t-green">$ open ${PROFILE_LINKS.github}</span>

<a href="${PROFILE_LINKS.github}" target="_blank" rel="noreferrer" class="t-link">github.com/ashmithhmaddala</a>
<span class="t-muted">Code, side projects, experiments, and half-finished ideas.</span>`,

    linkedin: () =>
      `<span class="t-green">$ open ${PROFILE_LINKS.linkedin}</span>

<a href="${PROFILE_LINKS.linkedin}" target="_blank" rel="noreferrer" class="t-link">linkedin.com/in/ashmith-maddala</a>
<span class="t-muted">Career path, internships, and security work.</span>`,

    writing: () =>
      `<span class="t-green">$ ls ~/writing/</span>

<span class="t-accent">article-1</span>  API security, real-world lessons, staying practical
<span class="t-accent">article-2</span>  Building a technical career without losing curiosity

<span class="t-muted">Read all → </span><a href="${PROFILE_LINKS.writing}" class="t-link">writing.html</a>`,

    work: () =>
      `<span class="t-green">$ open ${PROFILE_LINKS.work}</span>

<a href="${PROFILE_LINKS.work}" class="t-link">work.html</a>
<span class="t-muted">Projects, experiments, and things built for fun or utility.</span>`,

    resume: () =>
      `<span class="t-green">$ open ${RESUME_PATH}</span>

<a href="${RESUME_PATH}" download target="_blank" rel="noreferrer" class="t-link">↓ Download Resume (PDF)</a>`,

    download: () => COMMANDS.resume(),

    stack: () =>
      `<span class="t-green">$ cat ~/.stack</span>

<span class="t-accent">Daily drivers</span>
  Editor      VS Code + Vim keybindings
  Terminal    Zsh + Oh My Zsh
  OS          Kali Linux / macOS
  Browser     Firefox (DevTools & Burp proxy)

<span class="t-accent">Security</span>
  Proxy       Burp Suite Pro
  Recon       Nmap, Amass, subfinder
  Exploit     Metasploit, SQLMap
  Analysis    Wireshark, tcpdump

<span class="t-accent">Dev</span>
  Languages   Python, Bash, JS
  Infra       Docker, AWS, Git
  Frameworks  Flask, React`,

    tools: () =>
      `<span class="t-green">$ which -a security-tools</span>

<span class="t-accent">Web AppSec</span>     Burp Suite, OWASP ZAP, Nikto
<span class="t-accent">Network</span>        Nmap, Wireshark, tcpdump, Netcat
<span class="t-accent">Exploitation</span>   Metasploit, SQLMap, Hydra
<span class="t-accent">Recon</span>          Amass, subfinder, theHarvester
<span class="t-accent">Forensics</span>      Volatility, Autopsy, binwalk
<span class="t-accent">Scripting</span>      Python, Bash, PowerShell
<span class="t-accent">SAST/DAST</span>      Semgrep, Bandit, SonarQube`,

    certs: () =>
      `<span class="t-green">$ cat ~/certs.md</span>

<span class="t-muted">Currently exploring at my own pace:</span>
• CompTIA Security+ (studying)
• OSCP (on the radar)
• CEH (familiar with material)

<span class="t-muted">Continuous learning through:</span>
• TryHackMe, HackTheBox
• CTF competitions
• Security blogs & conferences`,

    hobbies: () =>
      `<span class="t-green">$ cat ~/life.txt</span>

🏋️ Gym — lifting heavy, cardio when I need a reset
⚽ Football — die-hard Barça fan, Messi is the GOAT
🚶 Long evening walks around Bangalore
🍕 Exploring new cafés and restaurants
📚 Books — Atomic Habits, Subtle Art of Not Giving a F*ck
✈️  Travel goals: Goa, Dubai, Singapore
🎬 Feel-good movies & chill music`,

    goals: () =>
      `<span class="t-green">$ cat ~/goals.md</span>

<span class="t-accent">Short term</span>
  • Ship security automation tools at Vontier
  • Complete Security+ certification
  • Build a personal vulnerability research lab

<span class="t-accent">Long term</span>
  • Attend DEF CON & BSides
  • Move into a full-time AppSec / Red Team role
  • Contribute to open-source security projects
  • Travel more, build a life I'm proud of`,

    roadmap: () =>
      `<span class="t-green">$ cat roadmap.yaml</span>

<span class="t-accent">now:</span>
  - sharpen secure code review instincts
  - build internal security automation that saves teams time
  - keep shipping cleaner, faster side projects

<span class="t-accent">next:</span>
  - publish deeper writeups and technical notes
  - expand threat modelling reps across different product types
  - get even more dangerous with Python and AppSec tooling

<span class="t-accent">eventually:</span>
  - strong AppSec engineer / offensive security hybrid
  - research, talks, and open-source contributions`,

    stats: () =>
      `<span class="t-green">$ portfolio --stats</span>

<span class="t-accent">Projects shipped</span>    10 featured
<span class="t-accent">Articles live</span>      2 published
<span class="t-accent">Core stack</span>         HTML, CSS, JS, Python, Bash
<span class="t-accent">Focus areas</span>        AppSec, threat modelling, automation
<span class="t-accent">Current mission</span>    Build, break, learn, repeat`,

    banner: () =>
      `<span class="t-green">   ___         __          _ __  __   _ __  __</span>
<span class="t-green">  / _ | ___ __/ /  __ _   (_) /_/ /  (_) /_/ /</span>
<span class="t-green"> / __ |(_-</span><span class="t-accent">_) _  / /  /  ' \ / / __/ _ \/ / __/ _ \\
</span><span class="t-green">/_/ |_/___/\_,_/_/_/_/_/_/_/\__/\_,_/_/\__/\___/</span>

<span class="t-accent">Ashmith Maddala</span>  |  Product Security Intern  |  AppSec / Threat Modelling / Builders' mindset`,

    history: () => renderHistory(),

    coffee: () => {
      const brews = [
        "Espresso acquired. Threat model loading  ████████░░ 80%",
        "Cold coffee online. Vulnerability triage speed increased by 12%.",
        "Brewing... success. Stack traces now look less offensive.",
        "Caffeine levels nominal. Ready to review code and questionable decisions.",
      ];
      return `<span class="t-green">$ brew coffee</span>\n\n<span class="t-accent">${pickRandom(brews)}</span>`;
    },

    weather: () =>
      `<span class="t-green">$ curl wttr.in/bangalore</span>

<span class="t-accent">Bangalore forecast:</span> warm, maybe traffic, 70% chance of side-project ideas.
<span class="t-muted">Advisory:</span> ideal conditions for evening walks and writing better code.`,

    matrix: () => `<span class="t-green">$ ./matrix</span>\n\n${renderMatrix()}`,

    top: () =>
      `<span class="t-green">$ top</span>

PID   USER      PRI  NI  VIRT   RES   SHR S  %CPU %MEM   TIME+   COMMAND
1337  ashmith    20   0  4.0g  512m  128m S  37.0  8.1   4:20.69 threat-model
2048  ashmith    20   0  2.1g  420m   96m S  24.0  6.3   2:11.07 side-projects
2600  ashmith    20   0  1.2g  256m   64m S  14.0  4.4   1:17.20 writing
9001  coffee     20   0  256m   64m   16m R   9.0  1.0   0:42.00 caffeine-daemon

<span class="t-muted">Load average:</span> motivated, curious, shipping`,

    ps: () =>
      `<span class="t-green">$ ps aux</span>

ashmith   101  0.1  secure-sdlc
ashmith   202  0.2  burp-suite
ashmith   303  0.4  python side_project.py
ashmith   404  0.3  writeup-drafts
ashmith   505  0.5  gym-recovery.service`,

    netstat: () =>
      `<span class="t-green">$ netstat -tulpn</span>

Proto Local Address      State   Service
tcp   0.0.0.0:22        LISTEN  collab-shell
tcp   0.0.0.0:80        LISTEN  portfolio-http
tcp   0.0.0.0:443       LISTEN  portfolio-https
tcp   127.0.0.1:5000    LISTEN  flask-sidequests
tcp   127.0.0.1:8080    LISTEN  experiments
udp   0.0.0.0:5353      OPEN    curiosity-broadcast`,

    sudo: () =>
      `<span class="t-muted">sudo: a terminal portfolio is no place for unchecked power.</span>
<span class="t-muted">Try 'sudo hire ashmith' if you're here for a better reason.</span>`,

    hack: () =>
      `<span class="t-green">$ hack --cinematic</span>

Initializing green text...
Bypassing nothing important...
Enumerating vibes...
Dropping zero-day charisma payload...

<span class="t-accent">ACCESS GRANTED</span>: to a well-designed static website.`,

    vontier: () =>
      `<span class="t-green">$ cat /work/vontier.log</span>

<span class="t-accent">Role</span>        Product Security Intern
<span class="t-accent">Location</span>    Bangalore
<span class="t-accent">Focus</span>       AppSec reviews, threat modelling, secure SDLC
<span class="t-accent">Mode</span>        Learn fast, ship useful security improvements`,

    bangalore: () =>
      `<span class="t-green">$ cityctl status bangalore</span>

<span class="t-accent">Mood</span>        fast, crowded, alive
<span class="t-accent">Best feature</span> evening walks and endless food options
<span class="t-accent">Known issue</span> traffic with CVSS 9.8 severity
<span class="t-accent">Why stay</span>    work, people, momentum`,

    barca: () =>
      `<span class="t-green">$ grep -i football ~/preferences.conf</span>

club=FC Barcelona
goat=Messi
status=unapologetically loyal`,

    books: () =>
      `<span class="t-green">$ cat ~/books.txt</span>

Atomic Habits
The Subtle Art of Not Giving a F*ck

<span class="t-muted">Usually looking for books that are practical, grounded, and easy to carry into daily life.</span>`,

    food: () =>
      `<span class="t-green">$ food --favorites</span>

<span class="t-accent">Top pick</span>     pizza
<span class="t-accent">Routine</span>      try new cafes and restaurants when life slows down
<span class="t-accent">Pairing</span>      good conversation or a post-work reset`,

    playlist: () =>
      `<span class="t-green">$ now-playing</span>

<span class="t-accent">Mode</span>         chill music while building and debugging
<span class="t-accent">Use case</span>     focus blocks, late-night coding, long walks
<span class="t-accent">Effect</span>       fewer bad decisions per hour`,

    quote: () => {
      const quotes = [
        `"The only truly secure system is one that is powered off, cast in a block of concrete and sealed in a lead-lined room." — Gene Spafford`,
        `"Security is always excessive until it's not enough." — Robbie Sinclair`,
        `"There are only two types of companies: those that have been hacked, and those that will be." — Robert Mueller`,
        `"Amateurs hack systems, professionals hack people." — Bruce Schneier`,
        `"The best way to learn is to break things and then figure out how to fix them."`,
        `"Hacking is not about breaking in. It's about finding a way." — Unknown`,
        `"In the world of security, paranoia is a virtue."`,
        `"Defense in depth: because one layer is never enough."`,
        `"The weakest link in security is always the human element."`,
        `"Think like an attacker, defend like a guardian."`,
      ];
      return `<span class="t-green">$ fortune security</span>\n\n<span class="t-accent">${quotes[Math.floor(Math.random() * quotes.length)]}</span>`;
    },

    whoami: () =>
      `visitor — curious soul exploring ashmith's portfolio`,

    hostname: () =>
      `ashmith.sec — hosted on GitHub Pages`,

    date: () =>
      `<span class="t-green">$ date</span>\n${new Date().toString()}`,

    uptime: () => {
      const launch = new Date("2025-07-01");
      const now = new Date();
      const days = Math.floor((now - launch) / 86400000);
      return `<span class="t-green">$ uptime</span>\nPortfolio has been live for <span class="t-accent">${days} days</span> since July 2025.`;
    },

    uname: () =>
      `Linux ashmith.sec 6.1.0-sec #1 SMP PORTFOLIO x86_64 GNU/Linux`,

    neofetch: () =>
      `<span class="t-green">        .--.        </span>  <span class="t-accent">visitor@ashmith.sec</span>
<span class="t-green">       |o_o |       </span>  ──────────────────
<span class="t-green">       |:_/ |       </span>  <span class="t-accent">OS:</span> Portfolio Linux
<span class="t-green">      //   \\ \\      </span>  <span class="t-accent">Host:</span> GitHub Pages
<span class="t-green">     (|     | )     </span>  <span class="t-accent">Kernel:</span> HTML/CSS/JS
<span class="t-green">    /'\\_   _/\`\\    </span>  <span class="t-accent">Shell:</span> terminal.js
<span class="t-green">    \\___)=(___/    </span>  <span class="t-accent">Theme:</span> Dark [amber]
                     <span class="t-accent">Terminal:</span> Ashmith Terminal v2
                     <span class="t-accent">CPU:</span> Curiosity @ ∞ GHz
                     <span class="t-accent">Memory:</span> Lots of coffee`,

    ping: () => renderPing("ashmith.sec"),

    nmap: () => renderNmap("ashmith.sec"),

    "cat flag.txt": () =>
      `<span class="t-accent">🚩 FLAG{y0u_f0und_th3_s3cr3t_fl4g}</span>

Nice work! You have the curiosity of a true hacker.
<span class="t-muted">Now go type 'sudo hire ashmith' 😉</span>`,

    "rm -rf /": () =>
      `<span class="t-muted">rm: cannot remove '/': Permission denied</span>
<span class="t-muted">Nice try. This portfolio is protected. 🛡️</span>`,

    "sudo hire ashmith": () => "__HIRE_MODE__",

    hemal: () => "__HEMAL_MODE__",

    "cat /etc/passwd": () =>
      `<span class="t-muted">Nice try 😏 — this is a portfolio, not a server.</span>`,

    "ls -la": () =>
      `<span class="t-green">total 42</span>
drwxr-xr-x  2 ashmith sec 4096 Mar 11 about.html
drwxr-xr-x  2 ashmith sec 4096 Mar 11 contact.html
-rw-r--r--  1 ashmith sec 8192 Mar 11 index.html
-rw-r--r--  1 ashmith sec 1337 Mar 11 flag.txt
drwxr-xr-x  2 ashmith sec 4096 Mar 11 public/
-rw-r--r--  1 ashmith sec 4096 Mar 11 script.js
-rw-r--r--  1 ashmith sec 9001 Mar 11 style.css
-rw-r--r--  1 ashmith sec 4096 Mar 11 terminal.js
drwxr-xr-x  2 ashmith sec 4096 Mar 11 work.html
drwxr-xr-x  2 ashmith sec 4096 Mar 11 writing.html`,

    ls: () =>
      `about.html  contact.html  index.html  public/  script.js
style.css   terminal.js   work.html   writing.html`,

    pwd: () => `/home/ashmith/portfolio`,

    cd: () => `<span class="t-muted">There's nowhere to go. You're already home.</span>`,

    echo: () => `<span class="t-muted">echo: try 'echo hello'</span>`,

    "echo hello": () => `hello`,

    man: () => `<span class="t-muted">What manual page do you want?\nTry 'help' for available commands.</span>`,

    vim: () => `<span class="t-muted">You've entered vim. Good luck getting out.\n\nJust kidding — type 'help' instead.</span>`,

    exit: () =>
      `<span class="t-muted">Closing terminal... just kidding, you can't leave that easily.</span>
<span class="t-muted">But you can close this tab. Or type 'help' for more fun.</span>`,

    clear: () => "__CLEAR__",
  };

  const history = [];
  let historyIndex = -1;
  const visualState = {
    theme: "mars",
    accent: null,
    particles: true,
    scanlines: true,
    motion: true,
  };

  function normalizeHexColor(rawValue) {
    if (!rawValue) {
      return null;
    }

    const trimmed = rawValue.trim();
    const prefixed = trimmed.startsWith("#") ? trimmed : `#${trimmed}`;
    const valid = /^#([\da-f]{3}|[\da-f]{6})$/i.test(prefixed);

    return valid ? prefixed.toLowerCase() : null;
  }

  function saveVisualState() {
    try {
      localStorage.setItem(VISUAL_STATE_KEY, JSON.stringify(visualState));
    } catch (error) {
      // Ignore storage failures in privacy modes.
    }
  }

  function applyThemeVariables(themeName) {
    const preset = VISUAL_PRESETS[themeName] || VISUAL_PRESETS.mars;
    const root = document.documentElement;
    const activeAccent = visualState.accent || preset.accent;

    root.style.setProperty("--bg", preset.bg);
    root.style.setProperty("--bg-elevated", preset.bgElevated);
    root.style.setProperty("--bg-card", preset.bgCard);
    root.style.setProperty("--bg-muted", preset.bgMuted);
    root.style.setProperty("--border", preset.border);
    root.style.setProperty("--border-subtle", preset.borderSubtle);
    root.style.setProperty("--border-hover", preset.borderHover);
    root.style.setProperty("--nav-bg", preset.navBg);
    root.style.setProperty("--accent", activeAccent);
    root.style.setProperty("--accent-hover", visualState.accent ? activeAccent : preset.accentHover);
  }

  function setParticles(enabled) {
    const canvas = document.getElementById("particle-canvas");

    if (canvas) {
      canvas.style.display = enabled ? "block" : "none";
    }

    visualState.particles = enabled;
  }

  function setScanlines(enabled) {
    const overlay = document.querySelector(".scanline-overlay");

    if (overlay) {
      overlay.style.display = enabled ? "block" : "none";
    }

    visualState.scanlines = enabled;
  }

  function setMotion(enabled) {
    const existingStyle = document.getElementById(REDUCED_MOTION_STYLE_ID);

    if (!enabled && !existingStyle) {
      const style = document.createElement("style");
      style.id = REDUCED_MOTION_STYLE_ID;
      style.textContent = "*, *::before, *::after { animation: none !important; transition: none !important; } html { scroll-behavior: auto !important; }";
      document.head.appendChild(style);
    }

    if (enabled && existingStyle) {
      existingStyle.remove();
    }

    visualState.motion = enabled;
  }

  function setTheme(themeName) {
    const normalizedTheme = (themeName || "").toLowerCase();

    if (!VISUAL_PRESETS[normalizedTheme]) {
      return `<span class="t-muted">theme: unknown preset '${escapeHtml(themeName)}'. Try mars, neon, frost, or pink.</span>`;
    }

    visualState.theme = normalizedTheme;
    visualState.accent = null;
    applyThemeVariables(visualState.theme);
    saveVisualState();

    return `<span class="t-green">Theme switched:</span> <span class="t-accent">${VISUAL_PRESETS[normalizedTheme].label}</span>\n<span class="t-muted">Tip:</span> use 'accent #hex' for a custom highlight color.`;
  }

  function setAccent(colorToken) {
    const normalized = normalizeHexColor(colorToken);

    if (!normalized) {
      return `<span class="t-muted">accent: invalid color. Use hex like #ff3b3b or ff3b3b.</span>`;
    }

    visualState.accent = normalized;
    applyThemeVariables(visualState.theme);
    saveVisualState();

    return `<span class="t-green">Accent updated:</span> <span class="t-accent">${escapeHtml(normalized)}</span>`;
  }

  function setVisualEffect(effectName, stateToken) {
    const effect = (effectName || "").toLowerCase();
    const normalizedState = (stateToken || "").toLowerCase();

    if (!["on", "off"].includes(normalizedState)) {
      return `<span class="t-muted">fx: state must be 'on' or 'off'. Example: fx particles off</span>`;
    }

    const enabled = normalizedState === "on";

    if (effect === "particles") {
      setParticles(enabled);
    } else if (effect === "scanlines") {
      setScanlines(enabled);
    } else if (effect === "motion") {
      setMotion(enabled);
    } else {
      return `<span class="t-muted">fx: unknown effect '${escapeHtml(effectName)}'. Try particles, scanlines, or motion.</span>`;
    }

    saveVisualState();
    return `<span class="t-green">${escapeHtml(effect)}:</span> ${enabled ? "on" : "off"}`;
  }

  function renderUiState() {
    const preset = VISUAL_PRESETS[visualState.theme] || VISUAL_PRESETS.mars;
    const accentValue = visualState.accent || preset.accent;

    return `<span class="t-green">$ ui</span>\n\n<span class="t-accent">Theme</span>       ${preset.label.toLowerCase()}\n<span class="t-accent">Accent</span>      ${escapeHtml(accentValue)}\n<span class="t-accent">Particles</span>   ${visualState.particles ? "on" : "off"}\n<span class="t-accent">Scanlines</span>   ${visualState.scanlines ? "on" : "off"}\n<span class="t-accent">Motion</span>      ${visualState.motion ? "on" : "off"}`;
  }

  function initializeVisualState() {
    try {
      const stored = localStorage.getItem(VISUAL_STATE_KEY);

      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed.theme === "string" && VISUAL_PRESETS[parsed.theme]) {
          visualState.theme = parsed.theme;
        }
        if (typeof parsed.accent === "string" && normalizeHexColor(parsed.accent)) {
          visualState.accent = normalizeHexColor(parsed.accent);
        }
        if (typeof parsed.particles === "boolean") {
          visualState.particles = parsed.particles;
        }
        if (typeof parsed.scanlines === "boolean") {
          visualState.scanlines = parsed.scanlines;
        }
        if (typeof parsed.motion === "boolean") {
          visualState.motion = parsed.motion;
        }
      }
    } catch (error) {
      // Ignore parsing failures and use defaults.
    }

    applyThemeVariables(visualState.theme);
    setParticles(visualState.particles);
    setScanlines(visualState.scanlines);
    setMotion(visualState.motion);
  }

  function pickRandom(items) {
    return items[Math.floor(Math.random() * items.length)];
  }

  function renderHistory() {
    const recent = history.slice(-10);

    if (!recent.length) {
      return `<span class="t-muted">No commands in history yet. Type 'help' to start.</span>`;
    }

    return `<span class="t-green">$ history</span>\n\n${recent
      .map(function (entry, index) {
        return `${String(history.length - recent.length + index + 1).padStart(2, " ")}  ${escapeHtml(entry)}`;
      })
      .join("\n")}`;
  }

  function renderMatrix() {
    const rows = [];

    for (let index = 0; index < 8; index++) {
      rows.push(`<span class="t-accent">${randomGlyphRow()}</span>`);
    }

    rows.push(`<span class="t-muted">Wake up, visitor. The payload is usually in plain sight.</span>`);
    return rows.join("\n");
  }

  function startHemalMode() {
    const message = pickRandom([
      "hemal mode activated: pink nebula online.",
      "secret unlocked: this terminal has a soft side.",
      "for hemal: sparkle protocol loaded.",
    ]);

    setTheme("pink");

    if (!document.getElementById(HEMAL_STYLE_ID)) {
      const style = document.createElement("style");
      style.id = HEMAL_STYLE_ID;
      style.textContent = [
        "#hemal-easter-egg-overlay {",
        "  position: fixed;",
        "  inset: 0;",
        "  pointer-events: none;",
        "  z-index: 9998;",
        "  opacity: 0;",
        "  transition: opacity 0.45s ease;",
        "  background: radial-gradient(circle at 50% 35%, rgba(255, 79, 163, 0.2), rgba(17, 19, 26, 0.82));",
        "}",
        "#hemal-easter-egg-overlay.visible { opacity: 1; }",
        "#hemal-easter-egg-overlay .hemal-badge {",
        "  position: absolute;",
        "  top: 50%;",
        "  left: 50%;",
        "  transform: translate(-50%, -50%);",
        "  border: 1px solid rgba(255, 79, 163, 0.85);",
        "  color: #ffd1ea;",
        "  background: rgba(36, 21, 34, 0.88);",
        "  padding: 0.75rem 1rem;",
        "  border-radius: 999px;",
        "  font: 600 0.85rem/1 var(--font-display);",
        "  letter-spacing: 0.08em;",
        "  text-transform: uppercase;",
        "  box-shadow: 0 0 0 1px rgba(255, 79, 163, 0.15), 0 8px 30px rgba(255, 79, 163, 0.26);",
        "}",
        "#hemal-easter-egg-overlay .hemal-spark {",
        "  position: absolute;",
        "  width: 6px;",
        "  height: 6px;",
        "  border-radius: 999px;",
        "  background: rgba(255, 182, 221, 0.95);",
        "  box-shadow: 0 0 8px rgba(255, 127, 189, 0.9);",
        "  animation: hemalSparkle 1.8s ease-in-out infinite;",
        "}",
        "@keyframes hemalSparkle {",
        "  0%, 100% { transform: scale(0.45); opacity: 0.35; }",
        "  50% { transform: scale(1.1); opacity: 1; }",
        "}",
      ].join("\n");
      document.head.appendChild(style);
    }

    const oldOverlay = document.getElementById(HEMAL_OVERLAY_ID);
    if (oldOverlay) {
      oldOverlay.remove();
    }

    const overlay = document.createElement("div");
    overlay.id = HEMAL_OVERLAY_ID;

    const badge = document.createElement("div");
    badge.className = "hemal-badge";
    badge.textContent = "Hemal Mode";
    overlay.appendChild(badge);

    for (let index = 0; index < 24; index++) {
      const spark = document.createElement("span");
      spark.className = "hemal-spark";
      spark.style.left = `${Math.floor(Math.random() * 100)}%`;
      spark.style.top = `${Math.floor(Math.random() * 100)}%`;
      spark.style.animationDelay = `${(Math.random() * 1.6).toFixed(2)}s`;
      overlay.appendChild(spark);
    }

    document.body.appendChild(overlay);
    window.requestAnimationFrame(function () {
      overlay.classList.add("visible");
    });

    window.setTimeout(function () {
      overlay.classList.remove("visible");
      window.setTimeout(function () {
        overlay.remove();
      }, 500);
    }, 4200);

    printLine(`<pre class="terminal-response"><span class="t-accent">[secret]</span> ${message}\n<span class="t-muted">Try: theme pink, accent #ff4fa3, fx scanlines on</span></pre>`);
  }

  function randomGlyphRow() {
    const glyphs = "01ABCDEF$#@%&*";
    let row = "";

    for (let index = 0; index < 36; index++) {
      row += glyphs[Math.floor(Math.random() * glyphs.length)];
    }

    return row;
  }

  function getProjectBySlug(slug) {
    return PROJECTS.find(function (project) {
      return project.slug === slug;
    });
  }

  function renderProjectCard(project) {
    return `<span class="t-accent">${project.slug}</span>\n  ${project.description}\n  focus: ${project.focus}`;
  }

  function renderOpenTarget(target) {
    const entry = OPEN_TARGETS[target];

    if (!entry) {
      return `<span class="t-muted">open: unknown target '${escapeHtml(target)}'. Try github, work, writing, about, contact, resume, article-1, or article-2.</span>`;
    }

    return `<span class="t-green">$ open ${target}</span>\n\n<a href="${entry.href}"${entry.external ? ' target="_blank" rel="noreferrer"' : ""}${entry.download ? " download" : ""} class="t-link">${entry.label}</a>\n<span class="t-muted">${entry.description}</span>`;
  }

  function renderSearch(query) {
    const searchable = [
      { name: "about", type: "command", detail: "Quick intro" },
      { name: "skills", type: "command", detail: "Technical skills" },
      { name: "projects", type: "command", detail: "Featured project list" },
      { name: "research", type: "command", detail: "Security interests" },
      { name: "vontier", type: "command", detail: "Internship snapshot" },
      { name: "bangalore", type: "command", detail: "City status" },
      { name: "barca", type: "command", detail: "Football allegiance" },
      { name: "books", type: "command", detail: "Reading shelf" },
      { name: "playlist", type: "command", detail: "Coding soundtrack" },
      { name: "article-1", type: "article", detail: "Balance outside cybersecurity" },
      { name: "article-2", type: "article", detail: "Technical career and everyday thinking" },
    ].concat(PROJECTS.map(function (project) {
      return {
        name: project.slug,
        type: "project",
        detail: `${project.description} | ${project.focus}`,
      };
    }));

    const matches = searchable.filter(function (entry) {
      return `${entry.name} ${entry.detail}`.toLowerCase().includes(query);
    });

    if (!matches.length) {
      return `<span class="t-green">$ search ${escapeHtml(query)}</span>\n\n<span class="t-muted">No matches. Try appsec, project, article, bangalore, github, or threat.</span>`;
    }

    return `<span class="t-green">$ search ${escapeHtml(query)}</span>\n\n${matches
      .slice(0, 8)
      .map(function (entry) {
        return `<span class="t-accent">${entry.name}</span>  [${entry.type}]\n  ${entry.detail}`;
      })
      .join("\n\n")}`;
  }

  function renderCatTarget(target) {
    const normalizedTarget = target.replace(/^project\s+/, "");
    const project = getProjectBySlug(normalizedTarget);

    if (project) {
      return `<span class="t-green">$ cat ${escapeHtml(target)}</span>\n\n${renderProjectCard(project)}`;
    }

    if (normalizedTarget === "article-1") {
      return `<span class="t-green">$ cat ${escapeHtml(target)}</span>\n\n<span class="t-accent">Beyond the terminal: how I stay balanced outside of cybersecurity</span>\nA personal piece on fitness, football, growth, and staying grounded.\n<a href="article-1.html" class="t-link">Read article-1.html</a>`;
    }

    if (normalizedTarget === "article-2") {
      return `<span class="t-green">$ cat ${escapeHtml(target)}</span>\n\n<span class="t-accent">How my technical career changed the way I solve everyday problems</span>\nA reflection on how tech reshaped decision-making beyond code.\n<a href="article-2.html" class="t-link">Read article-2.html</a>`;
    }

    const fileMap = {
      "about.txt": "about",
      "skills.json": "skills",
      "roadmap.yaml": "roadmap",
      "books.txt": "books",
      "contact.vcf": "contact",
      "socials.md": "socials",
      "goals.md": "goals",
      "life.txt": "hobbies",
    };
    const mappedCommand = fileMap[normalizedTarget];

    if (mappedCommand && COMMANDS[mappedCommand]) {
      return COMMANDS[mappedCommand]();
    }

    return `<span class="t-muted">cat: ${escapeHtml(target)}: No such file in this tiny universe. Try 'cat about.txt', 'cat roadmap.yaml', 'cat article-1', or 'cat project portfolio'.</span>`;
  }

  function renderManual(topic) {
    const page = MAN_PAGES[topic];

    if (!page) {
      return `<span class="t-muted">No manual entry for ${escapeHtml(topic)}. Try 'man open', 'man search', or 'man sudo'.</span>`;
    }

    return `<span class="t-green">$ man ${topic}</span>\n\n${escapeHtml(page).replace(/\n/g, "<br>")}`;
  }

  function renderSsh(target) {
    return `<span class="t-green">$ ssh ${escapeHtml(target)}</span>\n\nResolving ${escapeHtml(target)}...\nAuthenticating...\n<span class="t-muted">Permission denied (publickey, curiosity).</span>\n<span class="t-muted">This host exposes ideas, not a shell.</span>`;
  }

  function renderTraceroute(target) {
    return `<span class="t-green">$ traceroute ${escapeHtml(target)}</span>\n\n 1  router.home               3.2 ms\n 2  bangalore.backbone        8.1 ms\n 3  caffeine-gateway         12.4 ms\n 4  curiosity.exchange       18.8 ms\n 5  ${escapeHtml(target)}             23.1 ms\n\n<span class="t-muted">Trace complete.</span>`;
  }

  function normalizeHost(target, fallback) {
    if (!target) {
      return fallback;
    }

    if (target === "ashmith") {
      return fallback;
    }

    return target;
  }

  function renderPing(target) {
    const host = normalizeHost(target, "ashmith.sec");

    return `<span class="t-green">PING ${escapeHtml(host)} (127.0.0.1) 56 bytes of data.</span>
64 bytes from ${escapeHtml(host)}: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from ${escapeHtml(host)}: icmp_seq=2 ttl=64 time=0.038 ms
64 bytes from ${escapeHtml(host)}: icmp_seq=3 ttl=64 time=0.041 ms

--- ${escapeHtml(host)} ping statistics ---
3 packets transmitted, 3 received, <span class="t-accent">0% packet loss</span>`;
  }

  function renderNmap(target) {
    const host = normalizeHost(target, "ashmith.sec");

    return `<span class="t-green">Starting Nmap 7.94 ( https://nmap.org )</span>
Nmap scan report for ${escapeHtml(host)} (127.0.0.1)

PORT      STATE    SERVICE
<span class="t-accent">22/tcp</span>    open     ssh (for collabs)
<span class="t-accent">80/tcp</span>    open     http (this portfolio)
<span class="t-accent">443/tcp</span>   open     https (GitHub Pages)
<span class="t-accent">8080/tcp</span>  open     side-projects
<span class="t-accent">9001/tcp</span>  filtered coffee-intake

<span class="t-muted">Nmap done: 1 IP address (1 host up) scanned in 0.42s</span>`;
  }

  function resolveCommand(trimmed) {
    const handler = COMMANDS[trimmed];

    if (handler) {
      return handler();
    }

    if (trimmed.startsWith("open ")) {
      return renderOpenTarget(trimmed.slice(5).trim());
    }

    if (trimmed.startsWith("search ")) {
      return renderSearch(trimmed.slice(7).trim());
    }

    if (trimmed.startsWith("cat ")) {
      return renderCatTarget(trimmed.slice(4).trim());
    }

    if (trimmed.startsWith("man ")) {
      return renderManual(trimmed.slice(4).trim());
    }

    if (trimmed.startsWith("echo ")) {
      return escapeHtml(trimmed.slice(5));
    }

    if (trimmed.startsWith("ping ")) {
      return renderPing(trimmed.slice(5).trim());
    }

    if (trimmed.startsWith("nmap ")) {
      return renderNmap(trimmed.slice(5).trim());
    }

    if (trimmed.startsWith("ssh ")) {
      return renderSsh(trimmed.slice(4).trim());
    }

    if (trimmed.startsWith("traceroute ")) {
      return renderTraceroute(trimmed.slice(11).trim());
    }

    if (trimmed.startsWith("theme ")) {
      return setTheme(trimmed.slice(6).trim());
    }

    if (trimmed.startsWith("accent ")) {
      return setAccent(trimmed.slice(7).trim());
    }

    if (trimmed.startsWith("fx ")) {
      const parts = trimmed.split(/\s+/);
      return setVisualEffect(parts[1], parts[2]);
    }

    return null;
  }

  function printCommandResult(result, trimmed) {
    if (result === "__CLEAR__") {
      output.innerHTML = "";
      return;
    }

    if (result === "__HIRE_MODE__") {
      startHireMode();
      return;
    }

    if (result === "__HEMAL_MODE__") {
      startHemalMode();
      return;
    }

    if (result) {
      printLine(`<pre class="terminal-response">${result}</pre>`);
      return;
    }

    printLine(
      `<span class="t-muted">command not found: ${escapeHtml(trimmed)}. Type 'help' for available commands.</span>`
    );
  }

  /* ── Hire Mode ── */
  let hireMode = null;

  function hirePrompt(label) {
    printLine(`<span class="t-accent">${label}</span>`);
    scrollToBottom();
  }

  function startHireMode() {
    hireMode = { step: 0, name: "", email: "", company: "", message: "" };
    printLine(`<pre class="terminal-response"><span class="t-green">[sudo] password for visitor: ********</span>
<span class="t-accent">─── HIRE ASHMITH ───</span>
Fill in a few details and I'll send Ashmith a heads-up.
Type <span class="t-muted">cancel</span> at any point to abort.</pre>`);
    hirePrompt("Your name:");
  }

  function handleHireInput(val) {
    var value = val.trim();
    printLine(`<span class="terminal-prompt">${PROMPT}</span>${escapeHtml(val)}`);

    if (value.toLowerCase() === "cancel") {
      printLine(`<span class="t-muted">Hiring flow cancelled.</span>`);
      hireMode = null;
      scrollToBottom();
      return;
    }

    switch (hireMode.step) {
      case 0:
        if (value.length < 2) {
          printLine(`<span class="t-muted">⚠ Enter a valid name (at least 2 characters).</span>`);
          hirePrompt("Your name:");
          return;
        }
        hireMode.name = value;
        hireMode.step = 1;
        hirePrompt("Your email:");
        break;
      case 1:
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          printLine(`<span class="t-muted">⚠ That doesn't look like a valid email address.</span>`);
          hirePrompt("Your email:");
          return;
        }
        hireMode.email = value;
        hireMode.step = 2;
        hirePrompt("Company / Organization:");
        break;
      case 2:
        if (value.length < 2) {
          printLine(`<span class="t-muted">⚠ Enter a valid company or org name.</span>`);
          hirePrompt("Company / Organization:");
          return;
        }
        hireMode.company = value;
        hireMode.step = 3;
        hirePrompt("Brief message — role, why you're reaching out, etc.:");
        break;
      case 3:
        if (value.length < 10) {
          printLine(`<span class="t-muted">⚠ Write a bit more (at least 10 characters).</span>`);
          hirePrompt("Brief message:");
          return;
        }
        hireMode.message = value;
        hireMode.step = 4;
        printLine(`<pre class="terminal-response"><span class="t-green">─── Review ───</span>
<span class="t-accent">Name:</span>    ${escapeHtml(hireMode.name)}
<span class="t-accent">Email:</span>   ${escapeHtml(hireMode.email)}
<span class="t-accent">Company:</span> ${escapeHtml(hireMode.company)}
<span class="t-accent">Message:</span> ${escapeHtml(hireMode.message)}</pre>`);
        hirePrompt("Send this? (y/n):");
        break;
      case 4:
        if (value.toLowerCase() === "y" || value.toLowerCase() === "yes") {
          sendHireEmail();
        } else {
          printLine(`<span class="t-muted">Cancelled. No worries!</span>`);
          hireMode = null;
        }
        break;
    }
    scrollToBottom();
  }

  function sendHireEmail() {
    printLine(`<span class="t-muted">Sending...</span>`);
    scrollToBottom();

    fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: "2931f9a6-d5c3-4eb1-9d2d-a8bea6e93568",
        subject: "Portfolio Terminal — Someone wants to hire you!",
        from_name: hireMode.name,
        name: hireMode.name,
        email: hireMode.email,
        company: hireMode.company,
        message: hireMode.message,
      }),
    })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        if (data.success) {
          printLine(`<pre class="terminal-response"><span class="t-accent">✓ Message sent!</span>
Ashmith will get back to you at <span class="t-accent">${escapeHtml(hireMode.email)}</span>.
<span class="t-muted">Thanks for reaching out 🎯</span></pre>`);
        } else {
          printLine(`<pre class="terminal-response"><span class="t-muted">⚠ Something went wrong. Try emailing directly:</span>
<a href="mailto:ashmith.maddala@gmail.com" class="t-link">ashmith.maddala@gmail.com</a></pre>`);
        }
        hireMode = null;
        scrollToBottom();
      })
      .catch(function () {
        printLine(`<pre class="terminal-response"><span class="t-muted">⚠ Couldn't send right now. Try emailing directly:</span>
<a href="mailto:ashmith.maddala@gmail.com" class="t-link">ashmith.maddala@gmail.com</a></pre>`);
        hireMode = null;
        scrollToBottom();
      });
  }

  function printLine(html) {
    const div = document.createElement("div");
    div.className = "terminal-line";
    div.innerHTML = html;
    output.appendChild(div);
  }

  function processCommand(cmd) {
    const trimmed = cmd.trim().toLowerCase();

    // Echo the command
    printLine(`<span class="terminal-prompt">${PROMPT}</span>${escapeHtml(cmd)}`);

    if (!trimmed) {
      scrollToBottom();
      return;
    }

    // Add to history
    history.push(cmd);
    historyIndex = history.length;

    printCommandResult(resolveCommand(trimmed), trimmed);

    scrollToBottom();
  }

  function escapeHtml(text) {
    const el = document.createElement("span");
    el.textContent = text;
    return el.innerHTML;
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  // Welcome message
  COMMANDS.theme = function () {
    return `<span class="t-green">$ theme</span>\n\n<span class="t-muted">Usage:</span> theme <mars|neon|frost|pink>\nCurrent: <span class="t-accent">${VISUAL_PRESETS[visualState.theme].label}</span>`;
  };

  COMMANDS.accent = function () {
    return `<span class="t-green">$ accent</span>\n\n<span class="t-muted">Usage:</span> accent <hex>\nExample: accent #ff3b3b\nCurrent: <span class="t-accent">${escapeHtml(visualState.accent || VISUAL_PRESETS[visualState.theme].accent)}</span>`;
  };

  COMMANDS.fx = function () {
    return `<span class="t-green">$ fx</span>\n\n<span class="t-muted">Usage:</span> fx <particles|scanlines|motion> <on|off>`;
  };

  COMMANDS.ui = function () {
    return renderUiState();
  };

  const originalHelp = COMMANDS.help;
  COMMANDS.help = function () {
    return `${originalHelp().replace(
      "  matrix        Enter the matrix\\n",
      "  matrix        Enter the matrix\\n  theme         Switch visual color preset\\n  accent        Set custom accent color\\n  fx            Toggle particles/scanlines/motion\\n  ui            Show current visual state\\n"
    )}`;
  };

  initializeVisualState();

  printLine(`<pre class="terminal-response"><span class="t-green">Welcome to Ashmith's terminal.</span>
Type <span class="t-accent">'help'</span> to see available commands.</pre>`);

  // Input handler
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      if (hireMode) {
        handleHireInput(input.value);
      } else {
        processCommand(input.value);
      }
      input.value = "";
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        input.value = history[historyIndex];
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        input.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        input.value = "";
      }
    }
  });

  // Click terminal body to focus input
  body.addEventListener("click", function () {
    input.focus();
  });
})();
