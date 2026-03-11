/* ─── Particles + Scroll Reveal + Project Filters ─── */

/* ── Particle Canvas ── */
(function () {
  const canvas = document.getElementById("particle-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  let w, h, particles, mouse;
  const PARTICLE_COUNT = 80;
  const MAX_DIST = 140;

  function init() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    mouse = { x: -9999, y: -9999 };
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 2 + 0.8,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      // Dot with subtle glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(232,168,73,0.5)";
      ctx.shadowColor = "rgba(232,168,73,0.2)";
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;

      // Lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x;
        const dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(232,168,73,${0.1 * (1 - dist / MAX_DIST)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Mouse interaction
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < 160) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(232,168,73,${0.25 * (1 - mDist / 160)})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", init);
  window.addEventListener("mousemove", function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  init();
  draw();
})();

/* ── Scroll Reveal ── */
(function () {
  const reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  reveals.forEach(function (el) {
    observer.observe(el);
  });
})();

/* ── Project Filters (work.html) ── */
(function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".work-entry");
  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      // Toggle active
      filterBtns.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      projectCards.forEach(function (card) {
        if (filter === "all") {
          card.style.display = "";
          return;
        }
        const tags = card.getAttribute("data-tags") || "";
        if (tags.split(",").indexOf(filter) !== -1) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
})();

/* ── Navbar scroll effect ── */
(function () {
  const nav = document.querySelector(".navbar");
  if (!nav) return;

  let lastScroll = 0;
  window.addEventListener("scroll", function () {
    const currentScroll = window.scrollY;
    if (currentScroll > 80) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
    lastScroll = currentScroll;
  });
})();
