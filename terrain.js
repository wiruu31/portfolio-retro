/* ================================================================
   TERRAIN.JS - SENI KONTUR HERO
   Menggambar garis kontur seperti peta topografi di <canvas id="terrain">.
   Satu puncak di sisi kanan jadi titik fokus, satu garis kontur memakai
   warna aksen. Bergerak pelan dan sedikit mengikuti kursor atau sentuhan.
   Berhenti saat hero tidak terlihat, tab tersembunyi, atau perangkat
   meminta gerak dikurangi (gambar diam tetap tampil).

   Bagian yang boleh diubah ada di PENGATURAN. Sisanya logika.
   Daftar bagian: PENGATURAN | NOISE | GAMBAR | JALAN | MULAI
   ================================================================ */
(function () {
  "use strict";

  var canvas = document.getElementById("terrain");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");
  if (!ctx) return;
  var hero = canvas.parentElement;


  /* ===== PENGATURAN START =====
     jumlahKontur : banyaknya garis kontur
     garisAksen  : nomor garis yang berwarna aksen (0 = paling bawah)
     kecepatan    : kecepatan drift, makin kecil makin pelan
     fps          : batas frame per detik (hemat baterai di HP)
     ================================================================ */
  var P = {
    jumlahKontur: 17,
    levelAwal: 0.26,
    jarakLevel: 0.043,
    garisAksen: 12,
    kecepatan: 0.00011,
    fps: 30,
    dprMaks: 1.5
  };
  /* ===== PENGATURAN END ===== */


  var gerakKurang = window.matchMedia("(prefers-reduced-motion: reduce)");
  var w = 0, h = 0, dpr = 1, cell = 18, cols = 0, rows = 0;
  var field = null;
  var t = 0, last = 0, raf = 0;
  var terlihat = true, jalan = false;
  var ptr = { x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 };
  var warna = { ink: "237,230,218", accent: "255,90,54" };


  /* ===== NOISE START =====
     Noise nilai halus dengan 3 lapis (fbm), deterministik.
     ================================================================ */
  function hash(x, y) {
    var n = Math.imul(x, 374761393) + Math.imul(y, 668265263);
    n = Math.imul(n ^ (n >>> 13), 1274126177);
    return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
  }

  function noise(x, y) {
    var xi = Math.floor(x), yi = Math.floor(y);
    var xf = x - xi, yf = y - yi;
    var u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf);
    var a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
    return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
  }

  function fbm(x, y, tt) {
    return 0.52 * noise(x + tt * 0.6, y - tt * 0.3) +
           0.30 * noise(x * 2.1 - tt * 0.5, y * 2.1 + tt * 0.4 + 17) +
           0.18 * noise(x * 4.3 + tt * 0.3 + 31, y * 4.3 - tt * 0.2);
  }
  /* ===== NOISE END ===== */


  /* ===== GAMBAR START ===== */
  function bacaWarna() {
    var cs = getComputedStyle(document.documentElement);
    var ink = cs.getPropertyValue("--ink-rgb").trim().split(/\s+/);
    var acc = cs.getPropertyValue("--accent-rgb").trim().split(/\s+/);
    if (ink.length === 3) warna.ink = ink.join(",");
    if (acc.length === 3) warna.accent = acc.join(",");
  }

  function ukuran() {
    var r = hero.getBoundingClientRect();
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    dpr = Math.min(window.devicePixelRatio || 1, P.dprMaks);
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cell = Math.max(14, Math.min(22, Math.round(Math.sqrt(w * h) / 70)));
    cols = Math.ceil(w / cell) + 1;
    rows = Math.ceil(h / cell) + 1;
    field = new Float32Array(cols * rows);
  }

  function isiMedan() {
    var asp = w / h;
    /* Puncak: kanan-atas di layar sempit, kanan-tengah di layar lebar */
    var px = asp < 0.9 ? 0.78 : 0.74;
    var py = asp < 0.9 ? 0.3 : 0.42;
    var ox = (ptr.sx - 0.5) * 0.7;
    var oy = (ptr.sy - 0.5) * 0.7;
    var skala = 2.6;
    for (var j = 0; j < rows; j++) {
      var ny = (j * cell) / h;
      for (var i = 0; i < cols; i++) {
        var nx = (i * cell) / w;
        var v = fbm(nx * asp * skala + ox, ny * skala + oy, t);
        var dx = (nx - px - (ptr.sx - 0.5) * 0.04) * asp, dy = ny - py;
        v += 0.62 * Math.exp(-(dx * dx + dy * dy) / 0.045);
        field[j * cols + i] = v;
      }
    }
  }

  /* Satu level kontur dengan marching squares, semua segmen dalam satu path */
  function garis(level) {
    var c = cell;
    for (var j = 0; j < rows - 1; j++) {
      for (var i = 0; i < cols - 1; i++) {
        var a = field[j * cols + i], b = field[j * cols + i + 1];
        var cc = field[(j + 1) * cols + i + 1], d = field[(j + 1) * cols + i];
        var idx = (a >= level ? 8 : 0) | (b >= level ? 4 : 0) | (cc >= level ? 2 : 0) | (d >= level ? 1 : 0);
        if (idx === 0 || idx === 15) continue;
        var x0 = i * c, y0 = j * c;
        var tx = x0 + c * (level - a) / (b - a), ty = y0;
        var rx = x0 + c, ry = y0 + c * (level - b) / (cc - b);
        var bx = x0 + c * (level - d) / (cc - d), by = y0 + c;
        var lx = x0, ly = y0 + c * (level - a) / (d - a);
        switch (idx) {
          case 1: case 14: seg(lx, ly, bx, by); break;
          case 2: case 13: seg(bx, by, rx, ry); break;
          case 3: case 12: seg(lx, ly, rx, ry); break;
          case 4: case 11: seg(tx, ty, rx, ry); break;
          case 5: seg(tx, ty, lx, ly); seg(bx, by, rx, ry); break;
          case 6: case 9: seg(tx, ty, bx, by); break;
          case 7: case 8: seg(tx, ty, lx, ly); break;
          case 10: seg(tx, ty, rx, ry); seg(lx, ly, bx, by); break;
        }
      }
    }
  }
  function seg(x1, y1, x2, y2) { ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); }

  function gambar() {
    ctx.clearRect(0, 0, w, h);
    isiMedan();
    ctx.lineCap = "round";
    for (var k = 0; k < P.jumlahKontur; k++) {
      var level = P.levelAwal + k * P.jarakLevel;
      var aksen = k === P.garisAksen;
      var kuat = k % 4 === 0;
      ctx.beginPath();
      garis(level);
      ctx.lineWidth = aksen ? 2 : 1;
      ctx.strokeStyle = aksen ? "rgba(" + warna.accent + ",0.95)"
                              : "rgba(" + warna.ink + "," + (kuat ? 0.3 : 0.16) + ")";
      ctx.stroke();
    }
  }
  /* ===== GAMBAR END ===== */


  /* ===== JALAN START ===== */
  function frame(now) {
    raf = 0;
    if (!jalan) return;
    raf = requestAnimationFrame(frame);
    if (now - last < 1000 / P.fps) return;
    var dt = Math.min(now - last, 100);
    last = now;
    t += dt * P.kecepatan;
    ptr.sx += (ptr.x - ptr.sx) * 0.05;
    ptr.sy += (ptr.y - ptr.sy) * 0.05;
    gambar();
  }

  function mulai() {
    if (jalan || gerakKurang.matches || !terlihat || document.hidden) return;
    jalan = true;
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }
  function berhenti() {
    jalan = false;
    if (raf) { cancelAnimationFrame(raf); raf = 0; }
  }
  function perbarui() {
    if (gerakKurang.matches || !terlihat || document.hidden) berhenti();
    else mulai();
    if (!jalan) gambar();
  }
  /* ===== JALAN END ===== */


  /* ===== MULAI START ===== */
  function siap() {
    bacaWarna();
    ukuran();
    gambar();

    if ("ResizeObserver" in window) {
      var tunda = 0;
      new ResizeObserver(function () {
        clearTimeout(tunda);
        tunda = setTimeout(function () { ukuran(); gambar(); }, 120);
      }).observe(hero);
    } else {
      window.addEventListener("resize", function () { ukuran(); gambar(); });
    }

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (e) {
        terlihat = e[0].isIntersecting;
        perbarui();
      }).observe(hero);
    }

    document.addEventListener("visibilitychange", perbarui);
    if (gerakKurang.addEventListener) gerakKurang.addEventListener("change", perbarui);

    /* Ganti tema: baca ulang warna dan gambar ulang */
    new MutationObserver(function () { bacaWarna(); if (!jalan) gambar(); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    hero.addEventListener("pointermove", function (e) {
      var r = hero.getBoundingClientRect();
      ptr.x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      ptr.y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
    }, { passive: true });

    perbarui();
  }

  try { siap(); } catch (err) { console.error("[terrain] error:", err); }
  /* ===== MULAI END ===== */
})();
