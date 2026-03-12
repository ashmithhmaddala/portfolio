/* ─── Intro Greeting Animation ─── */
(function () {
  var intro = document.getElementById("intro");
  var word = document.getElementById("intro-word");
  if (!intro || !word) return;

  var introSeenKey = "portfolioIntroSeen";

  try {
    if (window.sessionStorage.getItem(introSeenKey) === "true") {
      intro.remove();
      return;
    }
  } catch (error) {
    // If sessionStorage is unavailable, fall back to the existing behavior.
  }

  document.body.classList.add("intro-active");

  var greetings = [
    { text: "Hello", duration: 900 },
    { text: "Hola", duration: 150 },
    { text: "Bonjour", duration: 150 },
    { text: "Ciao", duration: 130 },
    { text: "こんにちは", duration: 130 },
    { text: "안녕하세요", duration: 120 },
    { text: "Hallo", duration: 120 },
    { text: "Olá", duration: 110 },
    { text: "Привет", duration: 110 },
    { text: "नमस्ते", duration: 100 },
    { text: "سلام", duration: 100 },
    { text: "Merhaba", duration: 100 },
  ];

  var idx = 0;
  var fadeGap = 60;

  function showNext() {
    if (idx >= greetings.length) {
      setTimeout(slideUp, 200);
      return;
    }

    word.classList.remove("visible");

    setTimeout(function () {
      word.textContent = greetings[idx].text;
      word.classList.add("visible");

      var stay = greetings[idx].duration;
      idx++;
      setTimeout(showNext, stay);
    }, fadeGap);
  }

  function slideUp() {
    try {
      window.sessionStorage.setItem(introSeenKey, "true");
    } catch (error) {
      // Ignore storage failures and still complete the animation.
    }

    intro.classList.add("done");
    document.body.classList.remove("intro-active");

    intro.addEventListener("transitionend", function () {
      intro.remove();
    });
  }

  showNext();
})();
