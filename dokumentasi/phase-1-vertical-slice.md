# Phase 1 — Vertical Slice RTS

Status: prototipe awal dibuat pada branch `up/phase-1-vertical-slice`.

## Tujuan tahap
Membangun satu arena kecil yang sudah dapat disentuh dan dimainkan, sebelum menambah ekonomi, pertempuran, campaign, atau multiplayer.

## Yang sudah dimasukkan
- Scene `BattlefieldScene` terdaftar di konfigurasi Phaser.
- Arena menggunakan susunan tile berbentuk diamond untuk memberi perspektif isometrik.
- Area rumput, jalan tanah, sungai, pohon, batu, dan satu balai kerajaan dibuat secara prosedural.
- Tiga unit contoh: pekerja, prajurit, dan pemanah.
- Unit dapat dipilih dengan klik atau ketukan.
- Unit terpilih dapat diperintahkan bergerak dengan klik atau ketukan pada area peta.
- Kamera dapat digeser dengan menyeret peta.
- Zoom kamera tersedia melalui roda mouse.
- Mode Single Player pada layar Multiplayer diarahkan ke arena latihan.
- Tombol kembali membawa pemain ke menu.

## Batasan yang masih berlaku
- Ini adalah prototipe gameplay dan susunan peta, bukan kualitas aset final.
- Bangunan, pohon, batu, dan unit masih digambar dari bentuk pixel sederhana di kode; belum memakai sprite sheet ilustrasi final.
- Pergerakan unit masih tween langsung menuju titik tujuan; belum ada pathfinding, tabrakan, atau penghindaran rintangan.
- Belum ada serangan, kesehatan, musuh AI, ekonomi, pembangunan, atau kondisi menang/kalah.
- Pilihan tingkat kesulitan saat ini hanya ditampilkan sebagai label arena; belum mengubah perilaku lawan.
- Zoom sentuh dua jari belum dibuat.
- Belum diuji di browser laptop maupun perangkat Android pada saat commit.

## Cara uji lokal
1. Pindah ke branch ini dan tarik perubahan dari GitHub.
2. Jalankan `index.html` melalui Live Server.
3. Dari Home pilih PLAY → WORLD WAR / ARENA → SINGLE PLAYER.
4. Pilih tingkat kesulitan, lalu masuk ke arena latihan.
5. Ketuk salah satu unit sampai lingkaran seleksi terlihat.
6. Ketuk area rumput atau jalan untuk memerintahkan unit bergerak.
7. Seret peta untuk menggeser kamera; gunakan roda mouse untuk zoom.
8. Tekan KEMBALI untuk kembali ke menu.

## Kriteria penerimaan awal
- Scene arena dapat dibuka tanpa error JavaScript.
- Peta dan tiga unit terlihat.
- Unit dapat dipilih dan berpindah ke titik tujuan.
- Kamera dapat digeser dan di-zoom dengan mouse.
- Tombol kembali berfungsi.
- Perilaku di Android landscape perlu diuji terpisah sebelum tahap ini dinyatakan lulus.

## Catatan sinkronisasi GitHub dan VS Code
GitHub adalah remote repository, sedangkan folder VS Code adalah salinan lokal. Sinkronisasi dilakukan menggunakan Git, bukan kode runtime game:
- `git fetch origin` mengambil informasi commit terbaru.
- `git switch --track origin/up/phase-1-vertical-slice` membuat branch lokal yang melacak branch GitHub.
- `git pull` mengambil dan menggabungkan commit terbaru ke branch lokal.
- Setelah mengedit lokal, gunakan `git add`, `git commit`, dan `git push` untuk mengirim perubahan kembali ke GitHub.

Jangan mengerjakan tahap ini langsung di `main`; branch `main` tetap untuk rilis stabil.
