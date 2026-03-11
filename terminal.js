/* ─── Interactive Terminal ─── */
(function () {
  const output = document.getElementById("terminal-output");
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");
  if (!output || !input) return;

  const PROMPT = "visitor@ashmith.sec:~$ ";

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
  resume        Download resume
  stack         Tech stack I use daily
  tools         Security toolkit
  certs         Certifications & learning
  hobbies       Life outside work
  goals         What I'm working toward
  quote         Random security quote
  whoami        Who are you?
  hostname      Where are you?
  date          Current date
  uptime        How long this site's been live
  uname         System info
  neofetch      System fetch
  ping          Ping ashmith
  nmap          Scan open ports
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

    resume: () =>
      `<span class="t-green">$ open resume.pdf</span>

<a href="resume.pdf" target="_blank" rel="noreferrer" class="t-link">↓ Download Resume (PDF)</a>`,

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

    ping: () =>
      `<span class="t-green">PING ashmith.sec (127.0.0.1) 56 bytes of data.</span>
64 bytes from ashmith.sec: icmp_seq=1 ttl=64 time=0.042 ms
64 bytes from ashmith.sec: icmp_seq=2 ttl=64 time=0.038 ms
64 bytes from ashmith.sec: icmp_seq=3 ttl=64 time=0.041 ms

--- ashmith.sec ping statistics ---
3 packets transmitted, 3 received, <span class="t-accent">0% packet loss</span>`,

    nmap: () =>
      `<span class="t-green">Starting Nmap 7.94 ( https://nmap.org )</span>
Nmap scan report for ashmith.sec (127.0.0.1)

PORT      STATE    SERVICE
<span class="t-accent">22/tcp</span>    open     ssh (for collabs)
<span class="t-accent">80/tcp</span>    open     http (this portfolio)
<span class="t-accent">443/tcp</span>   open     https (GitHub Pages)
<span class="t-accent">8080/tcp</span>  open     side-projects
<span class="t-accent">9001/tcp</span>  filtered coffee-intake

<span class="t-muted">Nmap done: 1 IP address (1 host up) scanned in 0.42s</span>`,

    "cat flag.txt": () =>
      `<span class="t-accent">🚩 FLAG{y0u_f0und_th3_s3cr3t_fl4g}</span>

Nice work! You have the curiosity of a true hacker.
<span class="t-muted">Now go type 'sudo hire ashmith' 😉</span>`,

    "rm -rf /": () =>
      `<span class="t-muted">rm: cannot remove '/': Permission denied</span>
<span class="t-muted">Nice try. This portfolio is protected. 🛡️</span>`,

    "sudo hire ashmith": () => "__HIRE_MODE__",

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

    const handler = COMMANDS[trimmed];
    if (handler) {
      const result = handler();
      if (result === "__CLEAR__") {
        output.innerHTML = "";
      } else if (result === "__HIRE_MODE__") {
        startHireMode();
      } else {
        printLine(`<pre class="terminal-response">${result}</pre>`);
      }
    } else {
      printLine(
        `<span class="t-muted">command not found: ${escapeHtml(trimmed)}. Type 'help' for available commands.</span>`
      );
    }

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
