(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Scroll reveal
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (prefersReducedMotion) {
    for (var i = 0; i < reveals.length; i++) {
      reveals[i].classList.add("visible");
    }
    return;
  }

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
})();
