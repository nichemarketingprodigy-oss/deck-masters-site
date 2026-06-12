/**
 * hero-frame-scroll.js
 *
 * Reusable canvas frame-sequence hero with GSAP ScrollTrigger scrubbing.
 *
 * Requires: GSAP + ScrollTrigger already loaded and registered before calling
 * initFrameScrollHero().
 *
 * Usage:
 *   <script src="/path/to/hero-frame-scroll.js"></script>
 *   <script>
 *     initFrameScrollHero({
 *       frameCount : 241,
 *       framePath  : i => `frames/frame_${String(i).padStart(4,'0')}.jpg`,
 *     });
 *   </script>
 *
 * Required HTML structure (IDs / classes are the defaults; override via options):
 *
 *   <div id="hero-wrapper">           <!-- pinned by ScrollTrigger -->
 *     <section id="hero">
 *       <canvas id="hero-canvas"></canvas>
 *       <div class="hero-overlay"></div>
 *       <div class="hero-content">...</div>
 *       <div class="scroll-indicator">...</div>
 *     </section>
 *   </div>
 *
 * All options are optional except frameCount and framePath.
 */
function initFrameScrollHero(options) {
  var cfg = Object.assign({
    // ── Frame source ──────────────────────────────────────────
    frameCount        : 0,
    framePath         : function(i) { return 'frames/frame_' + String(i).padStart(4, '0') + '.jpg'; },

    // ── Selectors ─────────────────────────────────────────────
    wrapperSelector   : '#hero-wrapper',
    canvasId          : 'hero-canvas',
    overlaySelector   : '.hero-overlay',
    contentSelector   : '.hero-content',
    indicatorSelector : '.scroll-indicator',
    heroSelector      : '#hero',          // only used for fallback background

    // ── Scroll distance: pin lasts scrollMultiplier × 100vh ──
    scrollMultiplier  : 3,

    // ── Timeline breakpoints (0–1, within the animated portion) ──
    // The full ScrollTrigger progress runs 0→1, but the animation
    // completes at `animCompletesAt`; the tail is a dead buffer so
    // the next section doesn't rush in immediately.
    animCompletesAt   : 0.67,   // animation done at 67% of total scroll

    indicatorFadeEnd  : 0.12,   // indicator fully gone by this normalised p
    overlayStart      : 0.70,   // overlay begins fading in at this p
    overlayMaxAlpha   : 0.62,   // darkest the overlay gets (0–1)
    contentStart      : 0.82,   // hero text begins appearing at this p
    contentRise       : 18,     // px the text rises as it fades in

    // ── Image sizing within the canvas ───────────────────────
    // 'cover'   : fills canvas, may crop edges (default)
    // 'contain' : fits full frame inside canvas, may letterbox
    fit: 'cover',

    // ── Fallback when frames/ folder is missing ───────────────
    fallbackBackground: 'linear-gradient(160deg,#07192e 0%,#0a3a5c 50%,#0d5e82 100%)',
  }, options);

  // ── DOM refs ───────────────────────────────────────────────
  var canvas   = document.getElementById(cfg.canvasId);
  var ctx      = canvas.getContext('2d');
  var overlay  = document.querySelector(cfg.overlaySelector);
  var content  = document.querySelector(cfg.contentSelector);
  var indic    = document.querySelector(cfg.indicatorSelector);
  var heroEl   = document.querySelector(cfg.heroSelector);

  // ── Canvas sizing (cover viewport, honour device pixel ratio) ──
  var currentFrame = 0;
  var rafPending   = false;
  var frames       = [];

  function resizeCanvas() {
    canvas.width        = window.innerWidth  * devicePixelRatio;
    canvas.height       = window.innerHeight * devicePixelRatio;
    canvas.style.width  = window.innerWidth  + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(devicePixelRatio, devicePixelRatio);
    drawFrame(currentFrame);
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ── Frame draw ─────────────────────────────────────────────
  function drawFrame(index) {
    var img = frames[index];
    if (!img || !img.complete) return;
    var w     = window.innerWidth;
    var h     = window.innerHeight;
    var scale = cfg.fit === 'contain'
      ? Math.min(w / img.naturalWidth, h / img.naturalHeight)
      : Math.max(w / img.naturalWidth, h / img.naturalHeight);
    var sw    = img.naturalWidth  * scale;
    var sh    = img.naturalHeight * scale;
    var sx    = (w - sw) / 2;
    var sy    = (h - sh) / 2;
    ctx.clearRect(0, 0, w, h);
    ctx.drawImage(img, sx, sy, sw, sh);
  }

  function renderFrame(index) {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(function() {
      drawFrame(index);
      rafPending = false;
    });
  }

  // ── Preload ────────────────────────────────────────────────
  for (var i = 1; i <= cfg.frameCount; i++) {
    (function(frameIndex) {
      var img = new Image();
      img.src = cfg.framePath(frameIndex);
      img.onload = function() {
        if (frameIndex === 1) drawFrame(0);
      };
      img.onerror = function() {
        if (frameIndex === 1 && heroEl) {
          heroEl.style.background = cfg.fallbackBackground;
        }
      };
      frames[frameIndex - 1] = img;
    })(i);
  }

  // ── ScrollTrigger ──────────────────────────────────────────
  ScrollTrigger.create({
    trigger   : cfg.wrapperSelector,
    start     : 'top top',
    end       : '+=' + (window.innerHeight * cfg.scrollMultiplier),
    pin       : true,
    pinSpacing: true,
    scrub     : true,
    onUpdate  : function(self) {
      // Normalise progress so the animation completes at animCompletesAt
      var p = Math.min(self.progress / cfg.animCompletesAt, 1);

      // Frame scrub
      var idx = Math.min(cfg.frameCount - 1, Math.floor(p * cfg.frameCount));
      if (idx !== currentFrame) {
        currentFrame = idx;
        renderFrame(idx);
      }

      // Scroll indicator: fade out over first indicatorFadeEnd of p
      if (indic) {
        indic.style.opacity = Math.max(0, 1 - p / cfg.indicatorFadeEnd);
      }

      // Overlay: fade in from overlayStart → 1
      if (overlay) {
        var ot    = Math.max(0, Math.min(1, (p - cfg.overlayStart) / (1 - cfg.overlayStart)));
        var alpha = ot * cfg.overlayMaxAlpha;
        overlay.style.background = 'rgba(10,22,40,' + alpha.toFixed(3) + ')';
      }

      // Hero content: fade + rise from contentStart → 1
      if (content) {
        var ct = Math.max(0, Math.min(1, (p - cfg.contentStart) / (1 - cfg.contentStart)));
        content.style.opacity   = ct;
        content.style.transform = 'translateY(' + ((1 - ct) * cfg.contentRise) + 'px)';
      }
    }
  });
}
