(function () {
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  var aurora = document.getElementById("aurora");
  var blobs = aurora ? aurora.querySelectorAll(".aurora-blob") : [];
  var mx = 0;
  var my = 0;
  var tx = 0;
  var ty = 0;
  var raf = 0;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function tick() {
    raf = 0;
    mx = lerp(mx, tx, 0.075);
    my = lerp(my, ty, 0.075);

    var x1 = -56 * mx;
    var y1 = -44 * my;
    var x2 = 72 * mx;
    var y2 = 36 * my;
    var x3 = -28 * mx;
    var y3 = 60 * my;

    if (blobs[0])
      blobs[0].style.transform = "translate(" + x1 + "px, " + y1 + "px)";
    if (blobs[1])
      blobs[1].style.transform = "translate(" + x2 + "px, " + y2 + "px)";
    if (blobs[2])
      blobs[2].style.transform = "translate(" + x3 + "px, " + y3 + "px)";

    if (Math.abs(tx - mx) > 0.0005 || Math.abs(ty - my) > 0.0005) {
      raf = requestAnimationFrame(tick);
    }
  }

  function queueTick() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  if (aurora) {
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      queueTick();
    });
  }

  var pills = document.querySelectorAll(".js-magnetic");
  pills.forEach(function (pill) {
    pill.addEventListener("mousemove", function (e) {
      var r = pill.getBoundingClientRect();
      var dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
      var dy = (e.clientY - (r.top + r.height / 2)) * 0.12;
      pill.style.transform = "translate(" + dx + "px, " + dy + "px)";
    });
    pill.addEventListener("mouseleave", function () {
      pill.style.transform = "";
    });
  });

  var band = document.getElementById("band");

  function revealBandIfNeeded() {
    if (!band || band.classList.contains("is-inview")) return;
    var r = band.getBoundingClientRect();
    var vh = window.innerHeight || document.documentElement.clientHeight;
    if (r.top < vh && r.bottom > 0) {
      band.classList.add("is-inview");
    }
  }

  if (band && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            band.classList.add("is-inview");
            io.unobserve(band);
          }
        });
      },
      { rootMargin: "0px 0px -5% 0px", threshold: 0 },
    );
    io.observe(band);
  } else if (band) {
    band.classList.add("is-inview");
  }

  requestAnimationFrame(revealBandIfNeeded);
  window.addEventListener("load", revealBandIfNeeded);

  var mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  var scrollHint = document.getElementById("scroll-hint");
  function syncReduced() {
    if (scrollHint) scrollHint.hidden = mq.matches;
  }
  syncReduced();
  mq.addEventListener("change", syncReduced);
})();
