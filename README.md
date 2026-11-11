# Muh Geris Wiruno Mandawa, Portofolio

**Versi:** v1.2.0

Website portofolio pribadi Muh Geris Wiruno Mandawa, siswa kelas 12 yang belajar web development. Berisi proyek, tentang, kemampuan, dan kontak. Dibuat dengan HTML, CSS, dan JavaScript murni, tanpa build dan tanpa library, siap dipasang di GitHub Pages.

## Tampilan

- Hero layar penuh dengan garis kontur seperti peta topografi, digambar oleh kode (`terrain.js`). Bergerak pelan dan sedikit mengikuti kursor atau sentuhan. Satu garis kontur memakai warna aksen.
- Palet: hitam hangat dan tulang dengan satu aksen ember. Tema gelap dan terang, dengan tombol di menu. Awalnya mengikuti pengaturan perangkat, pilihan tersimpan di browser.
- Judul memakai Bricolage Grotesque, isi memakai Instrument Sans.
- Menu melayang berbentuk pill. Di HP berubah menjadi tombol "Menu".
- Responsive untuk semua perangkat: HP kecil (320px), HP biasa, tablet, laptop, dan layar lebar (1920px ke atas). Tanpa scroll horizontal, tombol minimal 44px.
- Gerak berhenti otomatis kalau perangkat meminta gerak dikurangi, dan kontur berhenti digambar saat hero tidak terlihat.

## Struktur file

```
index.html        halaman utama
style.css         semua gaya dan warna
script.js         data proyek dan kemampuan, menu, tema, tombol salin
terrain.js        seni kontur di hero
assets/favicon.svg    ikon tab browser
assets/foto.jpg       fotomu (belum ada, lihat di bawah)
README.md         dokumen ini
```

## Cara mengedit (aman dari HP)

Setiap file punya penanda bagian. Di editor, pakai fitur cari lalu ketik nama bagian + ` START`, misalnya `DATA START` atau `TOKEN START`.

| Mau ubah | Buka | Cari |
|---|---|---|
| Nomor WhatsApp | `script.js` | `CONFIG START` |
| Tambah atau ubah proyek | `script.js` | `DATA START` (PROJECTS) |
| Ubah level kemampuan | `script.js` | `DATA START` (SKILLS) |
| Teks Tentang dan minat | `index.html` | `TENTANG START` |
| Email, GitHub, Instagram | `index.html` | `KONTAK START` |
| Warna dan font | `style.css` | `TOKEN START` |
| Jumlah garis, kecepatan, garis aksen | `terrain.js` | `PENGATURAN START` |

### Mengisi nomor WhatsApp

Di `script.js`, ganti `"GANTI_NOMOR"` dengan nomormu tanpa spasi dan tanpa tanda `+`, diawali kode negara. Contoh: `"628123456789"`. Selama masih `GANTI_NOMOR`, baris WhatsApp disembunyikan di halaman, jadi tidak ada tautan palsu.

### Menambah proyek

Salin satu blok `{ ... }` di `PROJECTS`, tempel di bawahnya, beri koma di antara blok. Proyek dengan `unggulan: true` tampil besar (pakai satu saja). Sisanya tampil sebagai baris daftar.

### Foto

Simpan fotomu sebagai `assets/foto.jpg` (disarankan rasio 4:5, misalnya 640x800). Selama file belum ada, halaman menampilkan monogram "GW".

### Screenshot proyek

Panel proyek unggulan memakai motif cincin sebagai pengganti screenshot. Tidak ada gambar palsu di halaman.

## Cara pasang di GitHub Pages

1. Unggah semua file (termasuk folder `assets`) ke repository.
2. Buka **Settings**, lalu **Pages**.
3. Pada **Source**, pilih branch `main` dan folder `/ (root)`, lalu simpan.
4. Tunggu beberapa menit, alamatnya muncul di halaman yang sama.

Catatan: proyek "Portofolio" di daftar menaut ke `https://wiruu31.github.io/portfolio-retro/`. Kalau situs ini kamu pasang di alamat yang sama, ubah `link` proyek itu di `script.js`.

## Aksesibilitas

- Kontras teks lolos WCAG AA di kedua tema (dihitung dengan rumus, bukan dikira-kira).
- Bisa dipakai penuh dengan keyboard: tautan "Lewati ke konten", fokus terlihat jelas, menu HP bisa ditutup dengan Escape.
- Semua tombol punya nama, semua gambar punya teks alternatif, tautan yang membuka tab baru diberi tahu ke pembaca layar.
- Tombol salin menampilkan pesan jelas kalau browser menolak menyalin.

## Perubahan dari v1.1.0

- Dibuat ulang dari nol: dari gaya editorial kertas menjadi gelap sinematik dengan kontur hero.
- Tombol terang/gelap tetap ada, dengan palet baru.
- Proyek unggulan (Personal Finance) tampil besar, proyek lain berupa baris daftar.
- Menu melayang menggantikan header biasa.
- Foto lama tidak dipakai. Monogram "GW" menjadi placeholder sampai kamu menambah `assets/foto.jpg`.

## Teknologi

HTML5, CSS3, JavaScript (ES6), Canvas 2D, Google Fonts (Bricolage Grotesque dan Instrument Sans). Tanpa framework.

## Lisensi

Konten dan data milik Muh Geris Wiruno Mandawa. Kode boleh dipakai sebagai referensi belajar.
