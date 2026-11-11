/* ================================================================
   SCRIPT.JS - MUH GERIS WIRUNO MANDAWA, PORTOFOLIO v1.2.0
   Tips edit lewat HP: pakai fitur "cari" di editor, ketik nama
   bagian + " START", contoh "CONFIG START", "DATA START".

   Yang sering diedit ada di dua bagian pertama:
   1) CONFIG : nomor WhatsApp
   2) DATA   : daftar PROJECTS dan SKILLS
   Bagian lain adalah logika; tidak perlu diubah.

   Daftar bagian:
   CONFIG | DATA | HELPER | TEMA | MENU | SPY | PROYEK | KEMAMPUAN |
   FOTO | SALIN | KONTAK | REVEAL | FOOTER | MULAI
   ================================================================ */


/* ===== CONFIG START =====
   whatsapp: isi dengan nomor tanpa spasi dan tanpa tanda +,
   diawali kode negara. Contoh: "628123456789".
   Selama masih "GANTI_NOMOR", baris WhatsApp disembunyikan
   supaya tidak ada tautan palsu di halaman.
   ================================================================ */
const CONFIG = {
  whatsapp: "GANTI_NOMOR"
};
/* ===== CONFIG END ===== */


/* ===== DATA START =====
   Isi konten yang dibuat otomatis oleh JavaScript.
   ================================================================ */

/* --- Daftar proyek ---
   Untuk menambah proyek: salin satu blok { ... }, tempel di
   bawahnya, jangan lupa koma (,) di antara blok.

   judul     : nama proyek
   deskripsi : penjelasan singkat
   kategori  : nama kelompok, tampil di panel proyek unggulan
   tags      : teknologi yang dipakai
   status    : "selesai" atau "proses"
   link      : alamat proyek, atau "" kalau belum ada
   unggulan  : true untuk proyek yang tampil besar (pakai satu saja) */
const PROJECTS = [
  {
    judul: "Personal Finance",
    deskripsi: "Alat untuk mencatat kas, pendapatan, pengeluaran harian, aset, dan investasi.",
    kategori: "Web App",
    tags: ["HTML", "CSS", "JavaScript", "Web App", "Data"],
    status: "selesai",
    link: "https://wiruu31.github.io/personal-finance-tracker/keuangan.html",
  },
  {
    judul: "Fret Lab",
    deskripsi: "Pustaka chord, tuner, dan chord + lirik untuk main gitar dan ukulele.",
    kategori: "Web App",
    tags: ["HTML", "CSS", "JavaScript", "Web App", "Data"],
    status: "selesai",
    link: "https://wiruu31.github.io/fret-lab/fretlab.html"
  },
  {
    judul: "Blockchain Keep",
    deskripsi: "Brankas pribadi terenkripsi untuk catatan, sandi akun, dan berkas kecil.",
    kategori: "Web App",
    tags: ["HTML", "CSS", "JavaScript", "Web App", "Data", "API", "Hash"],
    status: "selesai",
    link: "https://wiruu31.github.io/blockchain-keep/index.html"
  },
  {
    judul: "Blockchain Lab",
    deskripsi: "Visualisasi blockchain dan kriptografi.",
    kategori: "Blockchain & Kriptografi",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "selesai",
    link: "https://wiruu31.github.io/blockchain-lab/blockchain.html"
  },
  {
    judul: "Portofolio",
    deskripsi: "Website portofolio pribadi saya (Website Saat Ini).",
    kategori: "Web App",
    tags: ["HTML", "CSS", "JavaScript"],
    status: "selesai",
    link: "https://wiruu31.github.io/portfolio-wiru/"
  },
  {
    judul: "Nexus Hub",
    deskripsi: "Backend API pribadi untuk project.",
    kategori: "Web App",
    tags: ["HTML", "CSS", "JavaScript", "API", "Data"],
    status: "selesai",
    link: "https://github.com/wiruu31/nexus-hub.git",
    unggulan: true
  }
];

/* --- Daftar kemampuan ---
   level: "Dasar", "Menengah", atau "Mahir".
   Isi dengan penilaian yang jujur. */
const SKILLS = [
  {
    grup: "Coding",
    items: [
      { nama: "HTML & CSS",     level: "Menengah" },
      { nama: "JavaScript",     level: "Menengah" },
      { nama: "Python",         level: "Dasar" },
      { nama: "AI & Prompting", level: "Menengah" }
    ]
  },
  {
    grup: "Musik",
    items: [
      { nama: "Gitar Klasik", level: "Mahir" },
      { nama: "Bernyanyi",    level: "Menengah" }
    ]
  },
  {
    grup: "Ekonomi",
    items: [
      { nama: "Akuntansi",      level: "Menengah" },
      { nama: "Mikroekonomi",   level: "Dasar" },
      { nama: "Makroekonomi",   level: "Menengah" }
    ]
  },
  {
    grup: "Finansial",
    items: [
      { nama: "Trading",   level: "Menengah" },
      { nama: "Investasi", level: "Dasar" }
    ]
  }
];
/* ===== DATA END ===== */


/* ===== HELPER START =====
   Fungsi kecil yang dipakai banyak bagian. Tidak perlu diedit.
   ================================================================ */
const $  = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Membuat elemen dengan aman. Teks selalu lewat textContent,
   jadi isi data tidak pernah dibaca sebagai HTML. */
function buat(tag, atribut, anak) {
  const node = document.createElement(tag);
  if (atribut) {
    Object.keys(atribut).forEach((k) => {
      if (k === "class") node.className = atribut[k];
      else if (k === "text") node.textContent = atribut[k];
      else node.setAttribute(k, atribut[k]);
    });
  }
  (anak || []).forEach((a) => node.appendChild(a));
  return node;
}

/* Satu bagian yang error tidak menghentikan bagian lain. */
function jalankan(nama, fn) {
  try {
    fn();
  } catch (error) {
    console.error("[" + nama + "] error:", error);
  }
}
/* ===== HELPER END ===== */


/* ===== TEMA START =====
   Gelap atau terang. Pilihan disimpan di browser. Kalau belum
   pernah memilih, mengikuti pengaturan perangkat (diatur di <head>).
   ================================================================ */
function temaEfektif() {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function perbaruiTombolTema() {
  const tombol = $("#themeBtn");
  const meta = document.querySelector('meta[name="theme-color"]');
  const terang = temaEfektif() === "light";
  if (tombol) tombol.setAttribute("aria-label", terang ? "Ganti ke tema gelap" : "Ganti ke tema terang");
  if (meta) meta.setAttribute("content", terang ? "#F3EEE4" : "#0E0D0C");
}

function terapkanTema(tema) {
  document.documentElement.setAttribute("data-theme", tema);
  try { localStorage.setItem("tema", tema); } catch (e) { /* penyimpanan diblokir */ }
  perbaruiTombolTema();
}

function initTema() {
  const tombol = $("#themeBtn");
  if (!tombol) return;
  perbaruiTombolTema();
  tombol.addEventListener("click", () => {
    terapkanTema(temaEfektif() === "light" ? "dark" : "light");
  });
}
/* ===== TEMA END ===== */


/* ===== MENU START =====
   Menu lipat di layar HP.
   ================================================================ */
function initMenu() {
  const header = $("#header");
  const tombol = $("#menuBtn");
  if (!header || !tombol) return;

  function atur(buka) {
    header.classList.toggle("menu-open", buka);
    tombol.setAttribute("aria-expanded", String(buka));
    tombol.textContent = buka ? "Tutup" : "Menu";
  }

  tombol.addEventListener("click", () => atur(!header.classList.contains("menu-open")));
  $$("#menu a").forEach((a) => a.addEventListener("click", () => atur(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && header.classList.contains("menu-open")) {
      atur(false);
      tombol.focus();
    }
  });
  window.matchMedia("(min-width: 760px)").addEventListener("change", (e) => {
    if (e.matches) atur(false);
  });
}
/* ===== MENU END ===== */


/* ===== SPY START =====
   Menandai menu sesuai bagian yang sedang dibaca.
   ================================================================ */
function initSpy() {
  const links = $$(".nav-link");
  const bagian = links
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if (!("IntersectionObserver" in window) || !bagian.length) return;

  const pengamat = new IntersectionObserver((entri) => {
    entri.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((a) => {
        if (a.getAttribute("href") === "#" + e.target.id) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    });
  }, { rootMargin: "-40% 0px -55% 0px" });

  bagian.forEach((s) => pengamat.observe(s));
}
/* ===== SPY END ===== */


/* ===== PROYEK START =====
   Proyek unggulan tampil besar, sisanya jadi baris daftar.
   ================================================================ */
const STATUS_TEKS = { selesai: "Selesai", proses: "Dalam proses" };

function buatTags(tags) {
  return buat("ul", { class: "tag-list", "aria-label": "Teknologi" },
    tags.map((t) => buat("li", { text: t })));
}

function buatStatus(p) {
  return buat("span", { class: "status", "data-status": p.status, text: STATUS_TEKS[p.status] || p.status });
}

function gambarUnggulan(p) {
  const aksi = p.link
    ? buat("a", { class: "btn btn-primary", href: p.link, target: "_blank", rel: "noopener noreferrer" }, [
        document.createTextNode("Buka " + p.judul),
        buat("span", { class: "sr-only", text: " (tab baru)" })
      ])
    : buat("span", { class: "proj-nolink", text: "Tautan belum tersedia" });

  return buat("article", { class: "feat reveal" }, [
    buat("div", { class: "feat-art", "aria-hidden": "true" }, [
      buat("span", { class: "feat-label", text: "Proyek unggulan" }),
      buat("span", { class: "feat-cat", text: p.kategori })
    ]),
    buat("div", { class: "feat-body" }, [
      buat("h3", { text: p.judul }),
      buat("p", { class: "feat-desc", text: p.deskripsi }),
      buatTags(p.tags),
      buat("div", { class: "feat-actions" }, [aksi, buatStatus(p)])
    ])
  ]);
}

function gambarBaris(p, nomor) {
  const aksi = p.link
    ? buat("a", { class: "proj-link", href: p.link, target: "_blank", rel: "noopener noreferrer" }, [
        document.createTextNode("Buka proyek"),
        buat("span", { class: "sr-only", text: " " + p.judul + " (tab baru)" })
      ])
    : buat("span", { class: "proj-nolink", text: "Tautan belum tersedia" });

  return buat("li", { class: "proj" }, [
    buat("span", { class: "proj-num", "aria-hidden": "true", text: String(nomor).padStart(2, "0") }),
    buat("div", { class: "proj-body" }, [
      buat("h3", { class: "proj-title", text: p.judul }),
      buat("p", { class: "proj-desc", text: p.deskripsi }),
      buatTags(p.tags)
    ]),
    buat("div", { class: "proj-side" }, [buatStatus(p), aksi])
  ]);
}

function initProyek() {
  const unggulan = $("#projFeatured");
  const daftar = $("#projList");
  if (!unggulan || !daftar) return;

  if (!PROJECTS.length) {
    daftar.appendChild(buat("li", { class: "proj-empty", text: "Belum ada proyek untuk ditampilkan." }));
    return;
  }

  const utama = PROJECTS.find((p) => p.unggulan);
  const sisa = PROJECTS.filter((p) => p !== utama);
  if (utama) unggulan.appendChild(gambarUnggulan(utama));
  sisa.forEach((p, i) => daftar.appendChild(gambarBaris(p, i + (utama ? 2 : 1))));
}
/* ===== PROYEK END ===== */


/* ===== KEMAMPUAN START ===== */
const KOTAK = { Dasar: 1, Menengah: 2, Mahir: 3 };

function initKemampuan() {
  const wadah = $("#stack");
  if (!wadah) return;

  SKILLS.forEach((g) => {
    const daftar = buat("ul", null, g.items.map((it) => {
      const n = KOTAK[it.level] || 1;
      const kotak = buat("span", { class: "stack-boxes", "aria-hidden": "true" },
        [1, 2, 3].map((x) => buat("i", { class: x <= n ? "on" : "" })));
      return buat("li", { class: "stack-item" }, [
        buat("span", { text: it.nama }),
        buat("span", { class: "stack-level" }, [buat("span", { text: it.level }), kotak])
      ]);
    }));
    wadah.appendChild(buat("div", { class: "stack-group reveal" }, [
      buat("h3", { class: "stack-title", text: g.grup }),
      daftar
    ]));
  });
}
/* ===== KEMAMPUAN END ===== */


/* ===== FOTO START =====
   Kalau assets/foto.jpg tidak ada, tampil monogram "GW".
   ================================================================ */
function initFoto() {
  const bingkai = $("#foto");
  const img = bingkai && bingkai.querySelector("img");
  if (!img) return;
  const gagal = () => bingkai.classList.add("foto-gagal");
  if (img.complete && img.naturalWidth === 0) gagal();
  img.addEventListener("error", gagal);
}
/* ===== FOTO END ===== */


/* ===== SALIN START =====
   Tombol salin: pill GitHub di hero dan email di Kontak.
   Kalau browser menolak, alamat ditampilkan agar bisa disalin manual.
   ================================================================ */
function pasangSalin(tombol, nilai, status, labelAwal, pesanOk) {
  if (!tombol || !status) return;
  let waktu;
  function kabar(teks, tersalin) {
    status.textContent = teks;
    tombol.classList.toggle("ok", tersalin);
    if (labelAwal) tombol.textContent = tersalin ? "Tersalin" : labelAwal;
    clearTimeout(waktu);
    waktu = setTimeout(() => {
      status.textContent = "";
      tombol.classList.remove("ok");
      if (labelAwal) tombol.textContent = labelAwal;
    }, 2500);
  }
  tombol.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(nilai());
      kabar(pesanOk, true);
    } catch (e) {
      kabar("Gagal menyalin. Salin manual: " + nilai(), false);
    }
  });
}

function initSalin() {
  pasangSalin($("#copyGh"), () => "https://github.com/wiruu31", $("#ghStatus"), "", "Alamat GitHub disalin.");
  const email = $("#emailLink");
  pasangSalin($("#copyEmail"), () => (email ? email.textContent.trim() : ""), $("#copyStatus"), "Salin email", "Email disalin.");
}
/* ===== SALIN END ===== */


/* ===== KONTAK START =====
   WhatsApp hanya tampil kalau nomornya sudah diisi dengan benar.
   ================================================================ */
function initKontak() {
  const baris = $("#waRow");
  const tautan = $("#waLink");
  if (baris && tautan && /^\d{8,15}$/.test(CONFIG.whatsapp)) {
    tautan.href = "https://wa.me/" + CONFIG.whatsapp;
    tautan.textContent = "+" + CONFIG.whatsapp;
    baris.hidden = false;
  }
}
/* ===== KONTAK END ===== */


/* ===== REVEAL START =====
   Elemen muncul halus saat terlihat.
   ================================================================ */
function initReveal() {
  const elemen = $$(".reveal");
  if (kurangiGerak || !("IntersectionObserver" in window)) {
    elemen.forEach((e) => e.classList.add("tampil"));
    return;
  }
  const pengamat = new IntersectionObserver((entri) => {
    entri.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("tampil");
        pengamat.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  elemen.forEach((e) => pengamat.observe(e));
}
/* ===== REVEAL END ===== */


/* ===== FOOTER START ===== */
function initFooter() {
  const tahun = $("#year");
  if (tahun) tahun.textContent = new Date().getFullYear();
}
/* ===== FOOTER END ===== */


/* ===== MULAI START ===== */
document.addEventListener("DOMContentLoaded", () => {
  jalankan("tema", initTema);
  jalankan("menu", initMenu);
  jalankan("proyek", initProyek);
  jalankan("kemampuan", initKemampuan);
  jalankan("foto", initFoto);
  jalankan("salin", initSalin);
  jalankan("kontak", initKontak);
  jalankan("footer", initFooter);
  jalankan("spy", initSpy);
  jalankan("reveal", initReveal);   /* terakhir, setelah semua elemen .reveal ada */
});
/* ===== MULAI END ===== */
