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

    var x4 = 20 * mx;
    var y4 = -24 * my;
    if (blobs[3])
      blobs[3].style.transform = "translate(" + x4 + "px, " + y4 + "px)";

    if (Math.abs(tx - mx) > 0.0005 || Math.abs(ty - my) > 0.0005) {
      raf = requestAnimationFrame(tick);
    }
  }

  function queueTick() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (aurora && !prefersReducedMotion) {
    document.addEventListener("pointermove", function (e) {
      tx = e.clientX / window.innerWidth - 0.5;
      ty = e.clientY / window.innerHeight - 0.5;
      queueTick();
    });
  }

})();
