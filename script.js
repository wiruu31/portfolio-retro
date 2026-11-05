/* ================================================================
   SCRIPT.JS - PORTOFOLIO GERIS.WIRU
   Tips navigasi (edit lewat HP): pakai fitur "cari" di editor,
   lalu ketik nama bagian + " START", contoh:
   "CONFIG START", "PROJECTS START", "SKILLS START".

   Yang sering diedit ada di dua bagian pertama:
   1) CONFIG   : teks boot, teks ketikan di Home, pengaturan efek
   2) DATA     : daftar PROJECTS, SKILLS, dan perintah terminal
   Bagian lain adalah logika; tidak perlu diubah.

   Daftar bagian:
   CONFIG | DATA | HELPER | BOOT | TEMA | NAVBAR | SCROLL | HOME |
   TERMINAL | PROJECTS | SKILLS | CONTACT | REVEAL | HUJAN KODE |
   FOOTER | MULAI
   ================================================================ */


/* ===== CONFIG START =====
   Pengaturan umum. Ubah nilainya sesukamu.
   ================================================================ */
const CONFIG = {
  /* Teks sapaan yang diketik di Home (sebelum nama) */
  helloText: "Halo! Saya",

  /* Role yang diketik bergantian di Home. Tambah/hapus sesuka hati. */
  roles: [
    "Web Developer in progress",
    "AI Enthusiast",
    "Gitaris & Vokalis",
    "Pelajar Trading & Investasi"
  ],

  /* Kecepatan mengetik sapaan (milidetik per huruf; kecil = cepat) */
  kecepatanKetik: 80,

  /* Layar boot di awal halaman */
  tampilkanBoot: true,        // false = langsung tampil tanpa boot
  bootSekaliPerSesi: true,    // true = boot hanya sekali per sesi browser
  jedaBoot: 330,              // jeda antar baris boot (milidetik)
  bootLines: [
    "> booting geris.wiru v1.0.0 ...",
    "[ OK ] memuat modul: html, css, javascript",
    "[ OK ] menyiapkan antarmuka terminal",
    "[ OK ] memuat portofolio",
    "> selamat datang, tamu_",
    ">_"
  ],

  /* Efek hujan kode di latar belakang */
  hujanKode: true             // false = matikan
};
/* ===== CONFIG END ===== */


/* ===== DATA START =====
   Isi konten yang dibuat otomatis oleh JavaScript.
   ================================================================ */

/* --- Daftar proyek (Section Projects) ---
   Untuk menambah proyek: salin satu blok { ... }, tempel di
   bawahnya, jangan lupa koma (,) di antara blok.

   judul     : nama proyek (tanpa spasi lebih keren, misal: nama-proyek)
   deskripsi : penjelasan singkat
   kategori  : "dev" atau "ai" (harus sama dengan data-filter di HTML)
   tags      : teknologi yang dipakai
   status    : "selesai", "proses", atau "contoh"
   link      : alamat proyek, atau "" kalau belum ada

   PENTING: dua proyek terakhir hanya CONTOH. Ganti dengan proyekmu
   yang sebenarnya, lalu ubah status "contoh" menjadi "selesai"
   atau "proses". */
const PROJECTS = [
  {
    judul: "portofolio-terminal",
    deskripsi: "Website portofolio ini: tema terminal retro, efek glow, scroll spy, dan terminal interaktif.",
    kategori: "dev",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "selesai",
    link: "https://wiruu31.github.io/portfolio-retro/"
  },
  {
    judul: "personal-finance",
    deskripsi: "Alat untuk mencatat kas, pendapatan, pengeluaran harian, aset, investasi, dll.",
    kategori: "dev",
    tags: ["HTML", "CSS", "JavaScript", "Web App", "Data"],
    status: "selesai",
    link: "https://wiruu31.github.io/personal-finance-tracker/keuangan.html"
  },
  {
    judul: "Blockchain Lab",
    deskripsi: "Visualisasi blockchain & kriptografi",
    kategori: "blockchain & kriptografi",
    tags: ["Html", "CSS", "JavaScript"],
    status: "selesai",
    link: "https://wiruu31.github.io/blockchain-lab/blockchain.html"
  },
  {
    judul: "jurnal-trading",
    deskripsi: "Alat kecil untuk mencatat dan meninjau transaksi trading harian.",
    kategori: "dev",
    tags: ["Web App", "Data"],
    status: "perencanaan",
    link: ""
  },
];

/* --- Daftar skill (Section Skills) ---
   Satu grup = satu jendela. level = 0 sampai 100.
   Isi dengan kemampuanmu yang jujur; angkanya hanya contoh. */
const SKILLS = [
  {
    grup: "coding",
    items: [
      { nama: "HTML & CSS",     level: 85 },
      { nama: "JavaScript",     level: 70 },
      { nama: "Python",         level: 30 },
      { nama: "AI & Prompting", level: 65 }
    ]
  },
  {
    grup: "musik",
    items: [
      { nama: "Gitar Klasik", level: 80 },
      { nama: "Bernyanyi",     level: 75 }
    ]
  },
  {
    grup: "finansial",
    items: [
      { nama: "Trading",   level: 45 },
      { nama: "Investasi", level: 55 }
    ]
  }
];

/* --- Perintah terminal (Section About, blok terakhir) ---
   Tiap perintah punya:
   desc : penjelasan singkat (muncul di "help")
   run  : fungsi yang mengembalikan daftar baris teks.
          Parameter kedua (api) berisi: bersihkan() untuk hapus layar. */
const COMMANDS = {
  help: {
    desc: "tampilkan daftar perintah",
    run: () => ["Perintah yang tersedia:"].concat(
      Object.keys(COMMANDS).map((nama) => "  " + nama.padEnd(9) + COMMANDS[nama].desc)
    )
  },
  whoami: {
    desc: "siapa aku",
    run: () => [
      "nama     : Muh Geris Wiruno Mandawa",
      "panggilan: Geris / Wiru",
      "status   : Siswa Kelas 12",
      "fokus    : Web Dev, AI, Musik, Investasi"
    ]
  },
  hobi: {
    desc: "daftar hobi & minat",
    run: () => [
      "> coding & web development",
      "> eksperimen AI",
      "> gitar akustik & bernyanyi",
      "> trading & investasi"
    ]
  },
  ls: {
    desc: "lihat isi portofolio",
    run: () => ["home/  about/  projects/  skills/  contact/"]
  },
  skills:   { desc: "buka bagian Skills",   run: () => keBagian("#skills",   "membuka skills...") },
  projects: { desc: "buka bagian Projects", run: () => keBagian("#projects", "membuka projects...") },
  contact:  { desc: "buka bagian Contact",  run: () => keBagian("#contact",  "membuka contact...") },
  gitar: {
    desc: "dengarkan sebentar",
    run: () => ["~ strum strum ~", "lagu apa hari ini?"]
  },
  tema: {
    desc: "ganti warna (tema cyan|green|amber|pink)",
    run: (args) => {
      if (!args[0]) return ["tema tersedia: " + TEMA.join(", "), "contoh: tema amber"];
      return setTheme(args[0]) ? ["tema diganti ke " + args[0]] : ["tema tidak ditemukan: " + args[0]];
    }
  },
  date: {
    desc: "tanggal & jam sekarang",
    run: () => [new Date().toLocaleString("id-ID")]
  },
  sudo: {
    desc: "coba saja",
    run: () => ["nice try. akses ditolak :)"]
  },
  clear: {
    desc: "bersihkan layar",
    run: (args, api) => { api.bersihkan(); return []; }
  }
};
/* ===== DATA END ===== */


/* ===== HELPER START =====
   Fungsi kecil yang dipakai banyak bagian. Tidak perlu diedit.
   ================================================================ */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/* Apakah perangkat meminta animasi dikurangi? */
const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Menjalankan satu bagian dengan aman: kalau satu bagian error,
   bagian lain tetap jalan dan pesan error muncul di console. */
function jalankan(nama, fn) {
  try {
    return fn();
  } catch (error) {
    console.error("[" + nama + "] error:", error);
  }
}

/* Gulir halus ke sebuah bagian, mengembalikan teks untuk terminal */
function keBagian(selector, pesan) {
  const el = $(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
  return [pesan];
}

/* Daftar tugas yang dijalankan saat scroll / ubah ukuran layar.
   Memakai requestAnimationFrame agar ringan di HP. */
const tugasScroll = [];
let menungguFrame = false;

function jalankanTugasScroll() {
  tugasScroll.forEach((tugas) => tugas());
  menungguFrame = false;
}
function daftarScroll(tugas) {
  tugasScroll.push(tugas);
  tugas();   // jalankan sekali sekarang
}
function pemicuScroll() {
  if (menungguFrame) return;
  menungguFrame = true;
  requestAnimationFrame(jalankanTugasScroll);
}
window.addEventListener("scroll", pemicuScroll, { passive: true });
window.addEventListener("resize", pemicuScroll);
/* ===== HELPER END ===== */


/* ===== BOOT START =====
   Layar booting di awal. Baris teks dari CONFIG.bootLines diketik
   satu per satu. Ketuk layar / tekan tombol untuk melewati.
   Mengembalikan Promise yang selesai saat boot beres, supaya
   animasi Home baru mulai sesudahnya.
   ================================================================ */
function initBoot() {
  const boot = $("#boot");
  const log = $("#bootLog");

  return new Promise((resolve) => {
    if (!boot || !log) { resolve(); return; }

    /* Cek apakah boot sudah pernah tampil di sesi ini */
    let sudahLihat = false;
    try { sudahLihat = sessionStorage.getItem("bootSeen") === "1"; } catch (e) { /* abaikan */ }

    const lewati = !CONFIG.tampilkanBoot || kurangiGerak ||
                   (CONFIG.bootSekaliPerSesi && sudahLihat);
    if (lewati) {
      boot.classList.add("is-done");
      resolve();
      return;
    }

    let selesai = false;
    function akhiri() {
      if (selesai) return;
      selesai = true;
      boot.classList.add("is-done");
      try { sessionStorage.setItem("bootSeen", "1"); } catch (e) { /* abaikan */ }
      resolve();
    }

    /* Ketuk / tekan tombol = lewati */
    boot.addEventListener("click", akhiri);
    window.addEventListener("keydown", akhiri, { once: true });

    /* Ketik baris demi baris */
    (async () => {
      for (const baris of CONFIG.bootLines) {
        if (selesai) return;
        log.textContent += baris + "\n";
        await sleep(CONFIG.jedaBoot);
      }
      await sleep(450);
      akhiri();
    })();
  });
}
/* ===== BOOT END ===== */


/* ===== TEMA START =====
   Ganti warna aksen. Pilihan tersimpan di browser (localStorage).
   Warna tiap tema diatur di style.css -> bagian VARIABEL & TEMA.
   ================================================================ */
const TEMA = ["cyan", "green", "amber", "pink"];
let warnaAksen = "#2DD4E8";   // dipakai efek hujan kode

function setTheme(nama) {
  if (!TEMA.includes(nama)) return false;

  document.documentElement.setAttribute("data-theme", nama);

  /* Baca ulang warna aksen untuk efek hujan kode */
  const warna = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
  if (warna) warnaAksen = warna;

  /* Tandai titik warna yang sedang dipilih */
  $$(".theme-dot").forEach((tombol) => {
    const aktif = tombol.dataset.theme === nama;
    tombol.classList.toggle("is-selected", aktif);
    tombol.setAttribute("aria-pressed", String(aktif));
  });

  try { localStorage.setItem("tema", nama); } catch (e) { /* abaikan */ }
  return true;
}

function initTheme() {
  let tersimpan = null;
  try { tersimpan = localStorage.getItem("tema"); } catch (e) { /* abaikan */ }
  setTheme(TEMA.includes(tersimpan) ? tersimpan : "cyan");

  $$(".theme-dot").forEach((tombol) => {
    tombol.addEventListener("click", () => setTheme(tombol.dataset.theme));
  });
}
/* ===== TEMA END ===== */


/* ===== NAVBAR START =====
   - Tombol garis tiga membuka/menutup menu (tampilan HP)
   - Menu menutup otomatis setelah link diklik atau tombol Esc
   - Navbar diberi bayangan setelah halaman di-scroll
   ================================================================ */
function initNavbar() {
  const tombol = $("#icon-nav");
  const menu = $("#navLinks");
  const header = $("#siteHeader");
  if (!tombol || !menu) return;

  function aturMenu(buka) {
    menu.classList.toggle("hidden", !buka);
    tombol.setAttribute("aria-expanded", String(buka));
    tombol.setAttribute("aria-label", buka ? "Tutup menu" : "Buka menu");
  }

  tombol.addEventListener("click", () => {
    aturMenu(menu.classList.contains("hidden"));
  });

  /* Tutup menu setelah salah satu link diklik */
  $$(".nav-link").forEach((link) => {
    link.addEventListener("click", () => aturMenu(false));
  });

  /* Tutup menu dengan tombol Esc */
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") aturMenu(false);
  });

  /* Bayangan navbar saat sudah scroll */
  if (header) {
    daftarScroll(() => header.classList.toggle("is-scrolled", window.scrollY > 10));
  }
}
/* ===== NAVBAR END ===== */


/* ===== SCROLL START =====
   Tiga efek yang bergantung pada posisi scroll:
   1) Scroll spy : link menu menyala sesuai section yang dilihat
   2) Progress   : garis di atas layar bertambah panjang
   3) To-top     : tombol "kembali ke atas" muncul
   ================================================================ */

/* --- 1) Scroll spy ---
   Setiap link menu dipasangkan dengan section-nya (dari href).
   Section yang belum ada di HTML dilewati, jadi tidak error. */
function initScrollSpy() {
  const daftarLink = $$(".nav-link");
  const header = $("#siteHeader");
  const pasangan = [];   // isinya: { link, section }

  daftarLink.forEach((link) => {
    const section = document.querySelector(link.getAttribute("href"));
    if (section) pasangan.push({ link: link, section: section });
  });
  if (pasangan.length === 0) return;

  /* Garis deteksi = tinggi navbar + jarak tambahan (px).
     Naikkan angka ini kalau menu terasa berganti terlalu lambat. */
  const JARAK_TAMBAHAN = 40;

  daftarScroll(() => {
    const garis = (header ? header.offsetHeight : 72) + JARAK_TAMBAHAN;
    let aktif = pasangan[0];

    /* Section terakhir yang bagian atasnya sudah melewati garis */
    pasangan.forEach((item) => {
      if (item.section.getBoundingClientRect().top <= garis) aktif = item;
    });

    /* Sudah mentok di dasar halaman: paksa section terakhir menyala */
    const mentok = window.innerHeight + window.scrollY >=
                   document.documentElement.scrollHeight - 2;
    if (mentok) aktif = pasangan[pasangan.length - 1];

    daftarLink.forEach((link) => link.classList.remove("is-active"));
    aktif.link.classList.add("is-active");
  });
}

/* --- 2) Progress bar & 3) Tombol kembali ke atas --- */
function initScrollEfek() {
  const bar = $("#progress");
  const keAtas = $("#toTop");

  daftarScroll(() => {
    const maks = document.documentElement.scrollHeight - window.innerHeight;
    const persen = maks > 0 ? Math.min(window.scrollY / maks, 1) : 0;
    if (bar) bar.style.transform = "scaleX(" + persen + ")";
    if (keAtas) keAtas.classList.toggle("is-visible", window.scrollY > 500);
  });
}
/* ===== SCROLL END ===== */


/* ===== HOME START =====
   - Mengetik "Halo! Saya" (CONFIG.helloText)
   - Role bergantian diketik & dihapus (CONFIG.roles)
   - Foto: kalau file tidak ditemukan, tampil inisial "GW"
   ================================================================ */
async function ketik(el, teks, jeda) {
  el.textContent = "";
  for (const huruf of teks) {
    el.textContent += huruf;
    await sleep(jeda);
  }
}
async function hapus(el, jeda) {
  while (el.textContent.length > 0) {
    el.textContent = el.textContent.slice(0, -1);
    await sleep(jeda);
  }
}

async function initHome() {
  const hello = $("#helloText");
  const role = $("#roleText");
  if (!hello || !role) return;

  /* Animasi dikurangi: tampilkan teks langsung tanpa mengetik */
  if (kurangiGerak) {
    hello.textContent = CONFIG.helloText;
    role.textContent = CONFIG.roles[0] || "";
    return;
  }

  await ketik(hello, CONFIG.helloText, CONFIG.kecepatanKetik);

  /* Putar role tanpa henti */
  let i = 0;
  while (CONFIG.roles.length > 0) {
    await ketik(role, CONFIG.roles[i], 60);
    await sleep(1600);
    await hapus(role, 30);
    i = (i + 1) % CONFIG.roles.length;
  }
}

function initAvatar() {
  const avatar = $("#avatar");
  const img = $("#avatarImg");
  if (!avatar || !img) return;

  const tampilkanInisial = () => avatar.classList.add("no-image");
  img.addEventListener("error", tampilkanInisial);
  /* Kalau error terjadi sebelum listener terpasang */
  if (img.complete && img.naturalWidth === 0) tampilkanInisial();
}
/* ===== HOME END ===== */


/* ===== TERMINAL START =====
   Terminal interaktif di bagian bawah About.
   Perintahnya ada di DATA -> COMMANDS.
   Teks hasil selalu dipasang sebagai teks biasa (aman).
   Panah atas/bawah = riwayat perintah (di keyboard komputer).
   ================================================================ */
function initTerminal() {
  const form = $("#termForm");
  const input = $("#termInput");
  const out = $("#termOutput");
  if (!form || !input || !out) return;

  const riwayat = [];
  let posisi = 0;

  function cetak(teks, kelas) {
    const baris = document.createElement("div");
    baris.className = "term-row" + (kelas ? " " + kelas : "");
    baris.textContent = teks;
    out.appendChild(baris);
    out.scrollTop = out.scrollHeight;   // gulir di dalam terminal saja
  }

  function bersihkan() { out.textContent = ""; }

  function jalankanPerintah(mentah) {
    const bersih = mentah.trim();
    if (!bersih) return;

    cetak("$ " + bersih, "term-echo");

    const bagian = bersih.toLowerCase().split(/\s+/);
    const nama = bagian[0];
    const args = bagian.slice(1);

    /* hasOwnProperty: cegah nama seperti "constructor" dianggap perintah */
    if (!Object.prototype.hasOwnProperty.call(COMMANDS, nama)) {
      cetak("perintah tidak dikenali: " + nama + " (ketik 'help')", "term-err");
      return;
    }

    const hasil = COMMANDS[nama].run(args, { bersihkan: bersihkan }) || [];
    hasil.forEach((baris) => cetak(baris));
  }

  /* Enter (atau tombol kirim di keyboard HP) */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const teks = input.value;
    if (teks.trim()) { riwayat.push(teks); posisi = riwayat.length; }
    jalankanPerintah(teks);
    input.value = "";
  });

  /* Riwayat dengan panah atas/bawah */
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && riwayat.length > 0) {
      e.preventDefault();
      posisi = Math.max(0, posisi - 1);
      input.value = riwayat[posisi];
    } else if (e.key === "ArrowDown" && riwayat.length > 0) {
      e.preventDefault();
      posisi = Math.min(riwayat.length, posisi + 1);
      input.value = riwayat[posisi] || "";
    }
  });

  /* Tombol pintasan (tidak memunculkan keyboard HP) */
  $$(".term-chip").forEach((tombol) => {
    tombol.addEventListener("click", () => jalankanPerintah(tombol.dataset.cmd));
  });

  /* Sapaan awal */
  cetak("selamat datang! ketik 'help' atau ketuk tombol di bawah.");
}
/* ===== TERMINAL END ===== */


/* ===== PROJECTS START =====
   Membuat kartu proyek dari DATA -> PROJECTS, lengkap dengan
   tombol filter kategori. Mengganti filter = kartu digambar ulang.
   ================================================================ */
function initProjects() {
  const grid = $("#projectGrid");
  const tombolFilter = $$("#projectFilter .filter-btn");
  if (!grid) return;

  function buatKartu(p, i) {
    const link = p.link
      ? '<a class="project-link" href="' + p.link + '" target="_blank" rel="noopener noreferrer">[ buka ]</a>'
      : '<span class="project-link project-link--off">[ segera ]</span>';

    const tags = p.tags.map((t) => "<li>" + t + "</li>").join("");

    return (
      '<article class="project-card" style="--i:' + i + '">' +
        '<div class="project-bar">' +
          '<span class="dot dot-red"></span>' +
          '<span class="dot dot-yellow"></span>' +
          '<span class="dot dot-green"></span>' +
          '<span class="project-file">proyek/' + p.judul + "</span>" +
        "</div>" +
        '<div class="project-body">' +
          '<h3 class="project-title">' + p.judul + "</h3>" +
          '<p class="project-desc">' + p.deskripsi + "</p>" +
          '<ul class="project-tags">' + tags + "</ul>" +
          '<div class="project-foot">' +
            '<span class="status-' + p.status + '">&#9679; ' + p.status + "</span>" +
            link +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function gambar(filter) {
    const tampil = PROJECTS.filter((p) => filter === "all" || p.kategori === filter);
    grid.innerHTML = tampil.length > 0
      ? tampil.map(buatKartu).join("")
      : '<p class="project-empty">// belum ada proyek di kategori ini</p>';
  }

  tombolFilter.forEach((tombol) => {
    tombol.addEventListener("click", () => {
      tombolFilter.forEach((t) => {
        const aktif = t === tombol;
        t.classList.toggle("is-active", aktif);
        t.setAttribute("aria-pressed", String(aktif));
      });
      gambar(tombol.dataset.filter);
    });
  });

  gambar("all");
}
/* ===== PROJECTS END ===== */


/* ===== SKILLS START =====
   Membuat jendela skill dari DATA -> SKILLS. Bar bergaya ASCII
   (blok penuh dan blok kosong) yang terisi naik saat terlihat.
   ================================================================ */
const JUMLAH_BLOK = 20;   // panjang bar (jumlah karakter)

function gambarBar(el, nilai) {
  const isi = Math.round((nilai / 100) * JUMLAH_BLOK);
  el.innerHTML =
    '<span class="on">' + "\u2588".repeat(isi) + "</span>" +
    '<span class="off">' + "\u2591".repeat(JUMLAH_BLOK - isi) + "</span>";
}

function animasiBar(bar, label, target) {
  if (kurangiGerak) {
    gambarBar(bar, target);
    label.textContent = target + "%";
    return;
  }
  const durasi = 1100;
  const mulai = performance.now();

  function langkah(sekarang) {
    const t = Math.min((sekarang - mulai) / durasi, 1);
    const halus = 1 - Math.pow(1 - t, 3);   // melambat di akhir
    const nilai = Math.round(target * halus);
    gambarBar(bar, nilai);
    label.textContent = nilai + "%";
    if (t < 1) requestAnimationFrame(langkah);
  }
  requestAnimationFrame(langkah);
}

function initSkills() {
  const grid = $("#skillsGrid");
  if (!grid) return;

  grid.innerHTML = SKILLS.map((grup) => (
    '<div class="window reveal">' +
      '<div class="window-bar">' +
        '<span class="dot dot-red"></span>' +
        '<span class="dot dot-yellow"></span>' +
        '<span class="dot dot-green"></span>' +
        '<span class="window-title">' + grup.grup + ".sh</span>" +
      "</div>" +
      '<div class="window-body">' +
        grup.items.map((s) => (
          '<div class="skill-row">' +
            '<div class="skill-top"><span>' + s.nama + "</span>" +
              '<span class="skill-percent" data-target="' + s.level + '">0%</span></div>' +
            '<div class="skill-bar" data-target="' + s.level + '" role="img" ' +
              'aria-label="' + s.nama + " " + s.level + ' persen"></div>' +
          "</div>"
        )).join("") +
      "</div>" +
    "</div>"
  )).join("");

  /* Awalnya semua bar kosong */
  $$("#skillsGrid .skill-bar").forEach((bar) => gambarBar(bar, 0));

  /* Saat sebuah jendela terlihat, isi bar di dalamnya */
  const pengintai = new IntersectionObserver((daftar) => {
    daftar.forEach((entry) => {
      if (!entry.isIntersecting) return;
      pengintai.unobserve(entry.target);

      const bars = entry.target.querySelectorAll(".skill-bar");
      const labels = entry.target.querySelectorAll(".skill-percent");
      bars.forEach((bar, i) => {
        animasiBar(bar, labels[i], Number(bar.dataset.target));
      });
    });
  }, { threshold: 0.3 });

  $$("#skillsGrid .window").forEach((w) => pengintai.observe(w));
}
/* ===== SKILLS END ===== */


/* ===== CONTACT START =====
   - Tombol [salin] menyalin alamat email
   - Form tidak dikirim ke server; saat dikirim, aplikasi email
     terbuka dengan pesan sudah terisi. Alamat tujuan diambil
     dari link email di HTML (#emailLink).
   ================================================================ */
async function salinTeks(teks) {
  /* Cara modern (butuh https atau localhost) */
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(teks);
      return true;
    }
  } catch (e) { /* lanjut ke cara cadangan */ }

  /* Cara cadangan untuk koneksi biasa */
  try {
    const kotak = document.createElement("textarea");
    kotak.value = teks;
    kotak.setAttribute("readonly", "");
    kotak.style.position = "fixed";
    kotak.style.opacity = "0";
    document.body.appendChild(kotak);
    kotak.select();
    const berhasil = document.execCommand("copy");
    kotak.remove();
    return berhasil;
  } catch (e) {
    return false;
  }
}

function initContact() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  const emailLink = $("#emailLink");
  const tombolSalin = $("#copyEmail");

  const ambilEmail = () =>
    emailLink ? emailLink.getAttribute("href").replace("mailto:", "") : "";

  if (tombolSalin) {
    tombolSalin.addEventListener("click", async () => {
      const berhasil = await salinTeks(ambilEmail());
      tombolSalin.textContent = berhasil ? "[tersalin!]" : "[gagal]";
      setTimeout(() => { tombolSalin.textContent = "[salin]"; }, 1600);
    });
  }

  if (form && status) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nama = $("#cName").value.trim();
      const pesan = $("#cMsg").value.trim();
      if (!nama || !pesan) {
        status.textContent = "> isi nama dan pesan dulu ya";
        return;
      }

      const subjek = encodeURIComponent("Pesan dari portofolio - " + nama);
      const isi = encodeURIComponent(pesan + "\n\n-- " + nama);
      window.location.href = "mailto:" + ambilEmail() + "?subject=" + subjek + "&body=" + isi;

      status.textContent = "> membuka aplikasi email... [OK]";
      form.reset();
    });
  }
}
/* ===== CONTACT END ===== */


/* ===== REVEAL START =====
   Elemen ber-class "reveal" muncul halus saat masuk layar.
   Class js-reveal di <html> baru dipasang di sini, jadi kalau JS
   bermasalah, konten tetap terlihat (tidak tersembunyi).
   ================================================================ */
function initReveal() {
  const elemen = $$(".reveal");
  if (elemen.length === 0) return;

  if (!("IntersectionObserver" in window)) return;   // browser lama: biarkan tampil

  document.documentElement.classList.add("js-reveal");

  const pengintai = new IntersectionObserver((daftar) => {
    daftar.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      pengintai.unobserve(entry.target);   // cukup sekali
    });
  }, { threshold: 0.12 });

  elemen.forEach((el) => pengintai.observe(el));
}
/* ===== REVEAL END ===== */


/* ===== HUJAN KODE START =====
   Efek karakter jatuh di latar belakang (canvas #codeRain).
   Dibuat ringan: sekitar 18 frame per detik, warna mengikuti tema.
   Matikan lewat CONFIG.hujanKode = false.
   ================================================================ */
function initHujanKode() {
  const canvas = $("#codeRain");
  if (!canvas) return;

  if (!CONFIG.hujanKode || kurangiGerak) {
    canvas.style.display = "none";
    return;
  }

  const ctx = canvas.getContext("2d");
  const UKURAN = 16;                       // ukuran huruf (px)
  const KARAKTER = "01{}<>/;=+*#$";        // huruf yang jatuh
  let kolom = [];
  let lebarTerakhir = 0;

  /* Siapkan ulang hanya jika lebar layar berubah
     (agar tidak ulang terus saat bar alamat HP naik-turun) */
  function siapkan() {
    if (window.innerWidth === lebarTerakhir) return;
    lebarTerakhir = window.innerWidth;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const jumlah = Math.floor(canvas.width / UKURAN);
    kolom = [];
    for (let i = 0; i < jumlah; i++) {
      kolom.push(Math.random() * canvas.height / UKURAN);
    }
  }

  let waktuTerakhir = 0;
  function gambar(waktu) {
    requestAnimationFrame(gambar);
    if (waktu - waktuTerakhir < 55) return;   // batasi kecepatan
    waktuTerakhir = waktu;

    /* Lapisan tipis menimpa gambar lama => jejak memudar */
    ctx.fillStyle = "rgba(10, 15, 20, 0.14)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = warnaAksen;
    ctx.font = UKURAN + "px monospace";

    for (let i = 0; i < kolom.length; i++) {
      const huruf = KARAKTER[Math.floor(Math.random() * KARAKTER.length)];
      ctx.fillText(huruf, i * UKURAN, kolom[i] * UKURAN);

      /* Kalau sudah lewat bawah layar, kadang mulai lagi dari atas */
      if (kolom[i] * UKURAN > canvas.height && Math.random() > 0.975) {
        kolom[i] = 0;
      } else {
        kolom[i] += 1;
      }
    }
  }

  siapkan();
  window.addEventListener("resize", siapkan);
  requestAnimationFrame(gambar);
}
/* ===== HUJAN KODE END ===== */


/* ===== FOOTER START =====
   Mengisi tahun otomatis di footer (id="year").
   ================================================================ */
function initFooter() {
  const tahun = $("#year");
  if (tahun) tahun.textContent = new Date().getFullYear();
}
/* ===== FOOTER END ===== */


/* ===== MULAI START =====
   Pemicu utama: menjalankan semua bagian di atas.
   Tiap bagian dibungkus jalankan() supaya satu error tidak
   mematikan seluruh halaman. Animasi Home menunggu boot selesai.
   ================================================================ */
document.addEventListener("DOMContentLoaded", () => {
  const bootSelesai = jalankan("boot", initBoot) || Promise.resolve();

  jalankan("tema", initTheme);
  jalankan("navbar", initNavbar);
  jalankan("scrollSpy", initScrollSpy);
  jalankan("scrollEfek", initScrollEfek);
  jalankan("avatar", initAvatar);
  jalankan("projects", initProjects);
  jalankan("skills", initSkills);
  jalankan("terminal", initTerminal);
  jalankan("contact", initContact);
  jalankan("footer", initFooter);
  jalankan("reveal", initReveal);      // setelah projects & skills dibuat
  jalankan("hujanKode", initHujanKode);

  bootSelesai.then(() => jalankan("home", initHome));
});
/* ===== MULAI END ===== */
