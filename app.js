/* Proposta SF Creative × SP Engenharia — script da página (sem dependências) */
(function () {
  'use strict';

  /* ===== Ajustes rápidos ===== */
  var CONFIG = {
    whatsapp: '5515988028794', // só números, com DDI 55 + DDD
    validade: '',               // ex.: '30/11/2026' — vazio esconde a linha
    particulas: true,
    cursorPersonalizado: true,
    granulacao: true
  };

  var root = document.querySelector('.sf');
  var mm = function (q) { return !!(window.matchMedia && window.matchMedia(q).matches); };
  var reduce = mm('(prefers-reduced-motion: reduce)');

  /* WhatsApp e validade */
  var wa = String(CONFIG.whatsapp).replace(/\D/g, '');
  var waEl = document.querySelector('[data-wa-label]');
  if (waEl && wa.length >= 12) waEl.textContent = '+' + wa.slice(0, 2) + ' ' + wa.slice(2, 4) + ' ' + wa.slice(4, wa.length - 4) + '-' + wa.slice(-4);
  var val = String(CONFIG.validade || '').trim();
  var valEl = document.querySelector('[data-validade]');
  if (valEl && val) { valEl.querySelector('[data-validade-txt]').textContent = val; valEl.hidden = false; }
  if (!CONFIG.granulacao) root.classList.add('no-grain');
  if (!CONFIG.particulas) root.classList.add('no-pt');

  /* Revelação ao rolar */
  var els = Array.prototype.slice.call(document.querySelectorAll('[data-io]'));
  if (!reduce && 'IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    els.forEach(function (el) { io.observe(el); });
  } else {
    els.forEach(function (el) { el.classList.add('in'); });
  }

  /* Partículas */
  var cv = document.querySelector('[data-pt]');
  if (cv && CONFIG.particulas && cv.getContext) {
    var ctx = cv.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, P = [];
    var mk = function (fresh) {
      return { x: Math.random() * W, y: fresh ? Math.random() * H : H + 10,
        r: 0.5 + Math.pow(Math.random(), 3) * 2.2, a: 0.08 + Math.random() * 0.42,
        vy: 0.06 + Math.random() * 0.22, ph: Math.random() * Math.PI * 2, d: 0.15 + Math.random() * 0.85 };
    };
    var size = function () {
      W = cv.clientWidth; H = cv.clientHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.round(Math.min(140, (W * H) / 11000));
      P = []; for (var i = 0; i < n; i++) P.push(mk(true));
    };
    size();
    window.addEventListener('resize', size);
    var px = -999, py = -999;
    document.addEventListener('mousemove', function (e) { px = e.clientX; py = e.clientY; });
    var t = 0;
    var draw = function () {
      t += 0.008;
      ctx.clearRect(0, 0, W, H);
      var sy = window.scrollY || 0;
      for (var i = 0; i < P.length; i++) {
        var p = P[i];
        if (!reduce) { p.y -= p.vy; p.x += Math.sin(t * 2 + p.ph) * 0.12 * p.d; }
        if (p.y < -10) { var n = mk(false); for (var k in n) p[k] = n[k]; }
        var x = p.x, y = (p.y - sy * 0.08 * p.d) % H; if (y < 0) y += H;
        var dx = x - px, dy = y - py, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) { var f = (120 - dist) / 120 * 14 * p.d; x += dx / (dist || 1) * f; y += dy / (dist || 1) * f; }
        var tw = 0.65 + 0.35 * Math.sin(t * 3 + p.ph);
        ctx.beginPath(); ctx.arc(x, y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,' + (p.a * tw).toFixed(3) + ')';
        ctx.fill();
      }
      if (!reduce) requestAnimationFrame(draw);
    };
    draw();
  }

  /* Menu ao rolar */
  var nav = document.querySelector('.nav');
  var onScroll = function () { if (nav) nav.classList.toggle('is-scrolled', (window.scrollY || 0) > 40); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Cursor personalizado */
  var cursorOn = CONFIG.cursorPersonalizado && mm('(hover: hover) and (pointer: fine)');
  var dot = document.querySelector('.cur-dot'), ring = document.querySelector('.cur-ring');
  if (cursorOn && dot && ring) {
    var mx = -200, my = -200, rx = -200, ry = -200;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
      dot.classList.add('on'); ring.classList.add('on');
    });
    document.addEventListener('mouseover', function (e) {
      var el = e.target && e.target.closest ? e.target.closest('a,.pil-i,.case,.plan') : null;
      ring.classList.toggle('hov', !!el);
    });
    document.documentElement.addEventListener('mouseleave', function () { dot.classList.remove('on'); ring.classList.remove('on'); });
    document.addEventListener('mousedown', function () { ring.classList.add('dn'); });
    document.addEventListener('mouseup', function () { ring.classList.remove('dn'); });
    (function loop() {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0)';
      requestAnimationFrame(loop);
    })();
    root.classList.add('cursor-on');
  }

  root.classList.add('is-ready');
})();
