(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if (prefersReducedMotion) {
    for (var i = 0; i < reveals.length; i++) {
      reveals[i].classList.add("visible");
    }
  } else if (reveals.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    for (var j = 0; j < reveals.length; j++) {
      observer.observe(reveals[j]);
    }
  }

  // Interactive floating orbs
  var canvas = document.querySelector(".orb-canvas");
  if (!canvas) return;

  var orbs = [
    { size: 320, x: 10, y: 15, color: "rgba(140, 180, 230, 0.4)", speed: 0.3 },
    { size: 260, x: 85, y: 40, color: "rgba(160, 195, 240, 0.35)", speed: 0.5 },
    { size: 200, x: 5, y: 65, color: "rgba(130, 170, 220, 0.3)", speed: 0.4 },
    { size: 280, x: 90, y: 80, color: "rgba(150, 190, 235, 0.35)", speed: 0.35 },
    { size: 180, x: 50, y: 30, color: "rgba(170, 200, 245, 0.25)", speed: 0.45 },
  ];

  var orbEls = [];
  var mouseX = 0.5;
  var mouseY = 0.5;
  var currentX = 0.5;
  var currentY = 0.5;

  orbs.forEach(function (o) {
    var el = document.createElement("div");
    el.className = "orb";
    el.style.width = o.size + "px";
    el.style.height = o.size + "px";
    el.style.background = o.color;
    el.style.left = o.x + "%";
    el.style.top = o.y + "%";
    canvas.appendChild(el);
    orbEls.push({ el: el, cfg: o, baseX: o.x, baseY: o.y });
  });

  if (prefersReducedMotion) return;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  var ticking = false;
  function update() {
    currentX += (mouseX - currentX) * 0.05;
    currentY += (mouseY - currentY) * 0.05;

    var dx = (currentX - 0.5) * 2;
    var dy = (currentY - 0.5) * 2;

    for (var i = 0; i < orbEls.length; i++) {
      var o = orbEls[i];
      var offsetX = dx * 40 * o.cfg.speed;
      var offsetY = dy * 30 * o.cfg.speed;
      o.el.style.transform =
        "translate(" + offsetX + "px, " + offsetY + "px)";
    }

    requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
})();
