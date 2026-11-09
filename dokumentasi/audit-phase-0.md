# Audit Phase 0 — Fondasi Awal

**Repositori:** `ElfiesVina/KingdomPiceRTS`  
**Cabang yang diperiksa:** `up/stage-1-foundation`  
**Tanggal pemeriksaan:** 10 November 2026  
**Status:** Audit statis awal; belum dianggap lulus pengujian browser atau perangkat Android.

## 1. Ringkasan

Fondasi saat ini berhasil memuat Phaser 3.90.0 melalui CDN dan menghubungkan empat scene: Splash, Home, Menu, dan Multiplayer. Namun, isi game masih berupa prototipe antarmuka dengan gambar yang digambar langsung menggunakan Phaser Graphics/Rectangle. Belum ada peta RTS, tileset, sprite unit, sistem pergerakan, pertempuran, maupun jaringan multiplayer.

Karena itu, branch ini belum boleh dianggap sebagai game RTS yang sudah berfungsi atau sebagai kandidat rilis.

## 2. Temuan berdasarkan tingkat prioritas

### Kritis untuk arah proyek

1. **Belum ada dunia RTS.** Scene yang tersedia hanya Splash, Home, Menu, dan pilihan Multiplayer. Belum ada scene arena/peta.
2. **Visual masih placeholder.** Kota, karakter, dan latar dibuat dari bentuk geometris sederhana; belum memakai aset pixel-art/tileset sungguhan.
3. **Single Player belum memulai pertempuran.** Tombol hanya menampilkan keterangan bahwa arena akan dibuat pada tahap berikutnya.
4. **Multiplayer LAN belum memiliki transport jaringan.** Pembuatan dan penggabungan room hanya simulasi lokal. Belum ada WebSocket/WebRTC atau sinkronisasi antarpemain.
5. **Penyimpanan hanya LocalStorage.** Data belum tersinkronisasi lintas perangkat dan dapat hilang jika data browser dibersihkan.

### Tinggi

1. **Bahasa kode belum mengikuti standar proyek.** Banyak nama class, variabel, fungsi, dan properti buatan sendiri masih berbahasa Inggris. Refaktor harus dilakukan konsisten, tanpa menerjemahkan sintaks JavaScript, API Phaser, DOM, atau API browser.
2. **Progres Splash bersifat simulasi.** Teks “memuat aset” dan persentase berjalan berdasarkan timer, padahal belum ada proses pemuatan aset yang diukur.
3. **Pengaturan grafik belum mengubah kualitas render.** Nilai Low/Medium/High hanya disimpan.
4. **Pengaturan musik dan suara belum terhubung ke sistem audio.** Tombol hanya mengubah nilai konfigurasi.
5. **Pendapatan emas otomatis setiap lima detik** merupakan perilaku prototipe yang belum memiliki aturan ekonomi permainan.
6. **Validasi pemulihan backup masih minimal.** Pemeriksaan hanya memastikan beberapa properti tersedia; struktur dan tipe data lain belum divalidasi menyeluruh.

### Menengah

1. Modal dibuat dengan `innerHTML`. Konten saat ini sebagian besar berasal dari teks internal, tetapi pola ini perlu dibatasi dan diamankan sebelum menampilkan data pemain atau data eksternal.
2. URL objek backup langsung dicabut setelah klik unduh. Lebih aman mencabutnya setelah browser sempat memproses unduhan.
3. Nama data simpanan dan nilai bawaan belum memiliki versi migrasi yang jelas.
4. Ketergantungan CDN Phaser dan Google Fonts berarti pemuatan awal memerlukan internet. Perilaku saat offline belum disiapkan.
5. Tombol, dialog, dan scene belum memiliki pengujian otomatis atau daftar uji manual yang terdokumentasi.

## 3. Peta file saat ini

- `index.html`: wadah game, modal HTML, pemanggilan Phaser CDN, dan entry module.
- `style.css`: tata letak halaman, canvas, petunjuk rotasi, dan modal.
- `src/config.js`: konfigurasi Phaser, warna, serta baca/tulis LocalStorage.
- `src/main.js`: pembuatan instance Phaser dan pendaftaran scene.
- `src/scenes/SplashScene.js`: layar awal dan progres simulasi.
- `src/scenes/HomeScene.js`: halaman Home, profil, hadiah harian, pengaturan, toko, backup/restore.
- `src/scenes/MenuScene.js`: menu tujuan permainan.
- `src/scenes/MultiplayerScene.js`: pilihan Single Player dan alur tampilan LAN.

Direktori aset dan manager masih berupa placeholder `.gitkeep`.

## 4. Standar kode yang ditetapkan

- Nama variabel, fungsi, class buatan sendiri, parameter, komentar, dan pesan buatan proyek menggunakan bahasa Indonesia.
- Sintaks dan API resmi tetap persis seperti aslinya: JavaScript, HTML, CSS, Phaser, DOM, dan browser API.
- Gunakan satu istilah Indonesia yang konsisten untuk satu konsep.
- Pisahkan konfigurasi, adegan, entitas, sistem permainan, pengelola aset, dan antarmuka.
- Hindari fungsi terlalu panjang, duplikasi logika, nilai ajaib tanpa konstanta bernama, serta ketergantungan global yang tidak perlu.
- Setiap fitur harus memiliki status yang jujur: berfungsi, prototipe, atau belum dibuat.

## 5. Urutan pembenahan Phase 0

1. Refaktor nama kode buatan sendiri ke bahasa Indonesia dan rapikan struktur tanpa mengubah perilaku yang sudah ada.
2. Perbaiki validasi dan versi data simpanan serta alur backup/restore.
3. Pisahkan fitur yang benar-benar bekerja dari simulasi/prototipe; hilangkan klaim pemuatan aset yang tidak nyata.
4. Perjelas status pengaturan yang belum terhubung ke sistem audio/render.
5. Tambahkan dokumentasi arsitektur, cara menjalankan, dan checklist pengujian.
6. Jalankan pengujian browser untuk memastikan semua scene dan fungsi dasar tidak rusak.

## 6. Batas audit

Pemeriksaan ini dilakukan dari isi file pada GitHub. Belum dilakukan eksekusi browser otomatis, pengukuran FPS/RAM, atau pengujian pada perangkat Android. Semua klaim performa harus menunggu pengujian nyata.

## 7. Kriteria Phase 0 dinyatakan selesai

- [ ] Seluruh kode buatan proyek konsisten berbahasa Indonesia.
- [ ] Struktur file dan tanggung jawab setiap modul terdokumentasi.
- [ ] Tidak ada error JavaScript saat seluruh scene dasar dibuka dan dinavigasi.
- [ ] Penyimpanan, pemulihan, dan validasi data diuji.
- [ ] Fitur simulasi diberi label jelas atau dipisahkan dari fitur aktif.
- [ ] Cara menjalankan dan checklist pengujian tersedia.
- [ ] Perubahan sudah ditinjau sebelum digabung ke `develop`.

**Keputusan:** jangan gabungkan PR Stage 1 ke `develop` atau `main` dahulu. Lanjutkan pembenahan di cabang kerja dan pertahankan `main` sebagai rilis stabil.
