// Arena RTS awal: peta isometrik, pemilihan unit, perintah bergerak, dan kamera.
export default class BattlefieldScene extends Phaser.Scene {
  constructor() {
    super("BattlefieldScene");
    this.unitTerpilih = null;
    this.geserKamera = null;
    this.sedangMenggeser = false;
    this.sedangMencubit = false;
    this.jarakAwalCubit = 0;
    this.zoomAwalCubit = 1;
  }

  create(data = {}) {
    this.tingkatKesulitan = data.difficulty || "Normal";
    this.kamera = this.cameras.main;
    this.kamera.setBackgroundColor("#172b32");
    this.kamera.setBounds(0, 0, 2160, 1120);
    this.kamera.setZoom(1);
    this.gambarPeta();
    this.buatLingkungan();
    this.buatBangunan();
    this.buatAntarmuka();
    this.buatPasukan();
    this.pasangKendaliKamera();
    this.kamera.centerOn(1080, 500);
  }

  posisiIsometrik(kolom, baris) {
    return {
      x: 1000 + (kolom - baris) * 32,
      y: 80 + (kolom + baris) * 16
    };
  }

  gambarPeta() {
    const gambar = this.add.graphics();
    const warnaRumput = [0x668f55, 0x70985b, 0x62874f, 0x789e61];
    const titik = (x, y) => [
      new Phaser.Geom.Point(x, y - 16),
      new Phaser.Geom.Point(x + 32, y),
      new Phaser.Geom.Point(x, y + 16),
      new Phaser.Geom.Point(x - 32, y)
    ];

    for (let baris = 0; baris < 24; baris++) {
      for (let kolom = 0; kolom < 30; kolom++) {
        const posisi = this.posisiIsometrik(kolom, baris);
        const angka = (kolom * 17 + baris * 31) % 13;
        let warna = warnaRumput[angka % warnaRumput.length];

        const sungai = kolom >= 23 && kolom <= 24 && baris >= 5 && baris <= 18;
        const jalan = baris >= 14 && baris <= 15 && kolom >= 3 && kolom <= 21;

        if (sungai) warna = angka % 2 ? 0x397f9a : 0x438da5;
        else if (jalan) warna = angka % 2 ? 0xb59a68 : 0xc4aa78;
        else if (angka === 2 || angka === 9) warna = 0x789d5e;

        gambar.fillStyle(warna, 1);
        gambar.fillPoints(titik(posisi.x, posisi.y), true);
        gambar.lineStyle(1, sungai ? 0x5da6b8 : 0x8eae70, 0.22);
        gambar.strokePoints(titik(posisi.x, posisi.y), true);
      }
    }

    // Tepian sungai dan batu kecil memberi penanda visual pada area air.
    for (let baris = 7; baris <= 17; baris += 2) {
      const posisi = this.posisiIsometrik(22, baris);
      gambar.fillStyle(0x9b9a76, 1);
      gambar.fillCircle(posisi.x + 17, posisi.y + 5, 4);
      gambar.fillCircle(posisi.x - 12, posisi.y - 4, 3);
    }
  }

  buatLingkungan() {
    const lokasiPohon = [
      [4, 5], [6, 7], [8, 4], [17, 5], [19, 7],
      [5, 18], [8, 19], [17, 18], [19, 20], [12, 4],
      [2, 11], [4, 12], [15, 3], [20, 10], [10, 20]
    ];
    lokasiPohon.forEach(([kolom, baris], indeks) => {
      const posisi = this.posisiIsometrik(kolom, baris);
      this.buatPohon(posisi.x, posisi.y, indeks % 3);
    });

    [[21, 4], [21, 18], [25, 8], [26, 16], [3, 8], [11, 18]].forEach(([kolom, baris], indeks) => {
      const posisi = this.posisiIsometrik(kolom, baris);
      this.buatBatu(posisi.x, posisi.y, indeks % 2);
    });
  }

  buatPohon(x, y, variasi) {
    const wadah = this.add.container(x, y);
    const batang = this.add.rectangle(0, 1, 9, 25, 0x68452e);
    const daunBelakang = this.add.rectangle(0, -19, 34, 25, variasi === 1 ? 0x315f3e : 0x376d43);
    const daunAtas = this.add.rectangle(-2, -30, 23, 17, variasi === 2 ? 0x4e874c : 0x4c8950);
    const daunSamping = this.add.rectangle(11, -17, 12, 17, 0x2e593b);
    wadah.add([batang, daunBelakang, daunAtas, daunSamping]);
    wadah.setDepth(y + 3);
  }

  buatBatu(x, y, variasi) {
    const wadah = this.add.container(x, y);
    wadah.add([
      this.add.ellipse(0, 5, 34, 14, 0x8b927e),
      this.add.rectangle(-3, -2, 19, 13, variasi ? 0x9ca38f : 0x7e8878),
      this.add.rectangle(4, -7, 11, 8, 0xb4b8a2)
    ]);
    wadah.setDepth(y + 2);
  }

  buatBangunan() {
    const posisi = this.posisiIsometrik(13, 10);
    const bangunan = this.add.container(posisi.x, posisi.y);
    const bayangan = this.add.ellipse(0, 14, 112, 36, 0x334331, 0.35);
    const dinding = this.add.rectangle(0, -15, 72, 57, 0xc4a77a);
    const sisi = this.add.rectangle(28, -15, 16, 57, 0x8b6b4d);
    const pintu = this.add.rectangle(4, -5, 17, 34, 0x543d2e);
    const atap = this.add.triangle(0, -55, -48, 28, 48, 28, 0x9b4938);
    const lisAtap = this.add.rectangle(0, -28, 94, 7, 0xe0b65e);
    const menara = this.add.rectangle(0, -76, 27, 32, 0xcbb58b);
    const puncak = this.add.triangle(0, -98, -19, 12, 19, 12, 0x8e3f35);
    const bendera = this.add.rectangle(19, -108, 3, 23, 0x4d4d3d);
    const kain = this.add.rectangle(27, -104, 13, 8, 0xc64e43);
    bangunan.add([bayangan, dinding, sisi, pintu, atap, lisAtap, menara, puncak, bendera, kain]);
    bangunan.setDepth(posisi.y + 20);

    const tulisan = this.add.text(posisi.x, posisi.y + 34, "BALAI KERAJAAN", {
      fontFamily: "Nunito",
      fontSize: "12px",
      fontStyle: "900",
      color: "#fff2c6",
      stroke: "#263d2e",
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(posisi.y + 40);
  }

  buatPasukan() {
    this.daftarUnit = [
      { nama: "Pekerja", peran: "Pekerja", kolom: 11, baris: 13, warna: 0x4b83a8 },
      { nama: "Prajurit", peran: "Prajurit", kolom: 12, baris: 13, warna: 0x9b4b43 },
      { nama: "Pemanah", peran: "Pemanah", kolom: 14, baris: 13, warna: 0x527b4d }
    ];

    this.daftarUnit.forEach((dataUnit, indeks) => {
      const posisi = this.posisiIsometrik(dataUnit.kolom, dataUnit.baris);
      const wadah = this.add.container(posisi.x, posisi.y);
      const bayangan = this.add.ellipse(0, 14, 28, 11, 0x263c2b, 0.45);
      const lingkaran = this.add.ellipse(0, 13, 36, 15, 0xffdf70, 0).setStrokeStyle(2, 0xffe17b);
      lingkaran.setVisible(false);
      const kakiKiri = this.add.rectangle(-6, 13, 7, 13, 0x493a32);
      const kakiKanan = this.add.rectangle(6, 13, 7, 13, 0x493a32);
      const badan = this.add.rectangle(0, -1, 19, 23, dataUnit.warna);
      const sabuk = this.add.rectangle(0, 7, 19, 4, 0xd6b66b);
      const kepala = this.add.rectangle(0, -19, 15, 15, 0xe8bd91);
      const rambut = this.add.rectangle(0, -26, 16, 5, indeks === 1 ? 0x49382b : 0x67472f);
      const mata = this.add.rectangle(3, -19, 2, 2, 0x28313a);
      wadah.add([bayangan, lingkaran, kakiKiri, kakiKanan, badan, sabuk, kepala, rambut, mata]);
      wadah.setDepth(posisi.y + 30);
      dataUnit.wadah = wadah;
      dataUnit.lingkaran = lingkaran;
      dataUnit.posisiAwal = posisi;
    });
    this.pilihUnit(this.daftarUnit[0]);
  }

  pilihUnit(unit) {
    this.daftarUnit.forEach(dataUnit => dataUnit.lingkaran.setVisible(dataUnit === unit));
    this.unitTerpilih = unit;
    this.teksStatus.setText(unit ? unit.nama + " dipilih — ketuk tanah untuk bergerak." : "Pilih unit untuk memberi perintah.");
  }

  buatAntarmuka() {
    const panelAtas = this.add.rectangle(480, 29, 960, 58, 0x142b36, 0.94)
      .setStrokeStyle(1, 0x9dbb91).setScrollFactor(0).setDepth(1000);
    this.add.text(20, 15, "KINGDOM PIXEL RTS", {
      fontFamily: "Nunito", fontSize: "19px", fontStyle: "900", color: "#ffe5a0"
    }).setScrollFactor(0).setDepth(1001);

    this.add.text(380, 18, "ARENA LATIHAN  •  " + this.tingkatKesulitan.toUpperCase(), {
      fontFamily: "Nunito", fontSize: "12px", fontStyle: "900", color: "#d9e9d3"
    }).setScrollFactor(0).setDepth(1001);

    this.teksStatus = this.add.text(480, 505, "Pilih unit untuk memberi perintah.", {
      fontFamily: "Nunito", fontSize: "14px", fontStyle: "900",
      color: "#fff0c4", stroke: "#233c2d", strokeThickness: 4, align: "center"
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1001);

    const panelBawah = this.add.rectangle(480, 505, 650, 34, 0x142b36, 0.78)
      .setScrollFactor(0).setDepth(1000);
    this.teksStatus.setDepth(1002);

    const tombolKembali = this.add.rectangle(884, 29, 126, 34, 0x8a493d)
      .setStrokeStyle(2, 0xffdfaa).setInteractive({ useHandCursor: true })
      .setScrollFactor(0).setDepth(1002);
    this.add.text(884, 29, "KEMBALI", {
      fontFamily: "Nunito", fontSize: "12px", fontStyle: "900", color: "#fff4d4"
    }).setOrigin(0.5).setScrollFactor(0).setDepth(1003);
    tombolKembali.on("pointerdown", () => this.scene.start("MenuScene"));

    this.add.text(20, 475, "SERET: GESER PETA   •   CUBIT: ZOOM", {
      fontFamily: "Nunito", fontSize: "10px", fontStyle: "900", color: "#e4f0d6"
    }).setScrollFactor(0).setDepth(1001);
  }

  pasangKendaliKamera() {
    const ambilDuaJari = () => {
      const jariAktif = this.input.manager.pointers
        .slice(1)
        .filter(jari => jari.isDown);

      return jariAktif.length >= 2 ? jariAktif.slice(0, 2) : null;
    };

    const perbaruiCubit = () => {
      const duaJari = ambilDuaJari();
      if (!duaJari) return false;

      const jarak = Phaser.Math.Distance.Between(
        duaJari[0].x, duaJari[0].y,
        duaJari[1].x, duaJari[1].y
      );

      if (!this.sedangMencubit) {
        this.sedangMencubit = true;
        this.sedangMenggeser = false;
        this.geserKamera = null;
        this.jarakAwalCubit = Math.max(jarak, 1);
        this.zoomAwalCubit = this.kamera.zoom;
      } else {
        const perbandingan = jarak / this.jarakAwalCubit;
        this.kamera.setZoom(
          Phaser.Math.Clamp(this.zoomAwalCubit * perbandingan, 0.72, 1.45)
        );
      }

      return true;
    };

    this.input.on("pointerdown", pointer => {
      if (perbaruiCubit()) return;
      if (this.sedangMencubit || pointer.y < 60 || pointer.y > 485) return;

      this.geserKamera = {
        x: pointer.x,
        y: pointer.y,
        scrollX: this.kamera.scrollX,
        scrollY: this.kamera.scrollY
      };
      this.sedangMenggeser = false;
    });

    this.input.on("pointermove", pointer => {
      if (perbaruiCubit()) return;
      if (this.sedangMencubit || !this.geserKamera || !pointer.isDown) return;

      const bedaX = pointer.x - this.geserKamera.x;
      const bedaY = pointer.y - this.geserKamera.y;
      if (Math.abs(bedaX) + Math.abs(bedaY) > 7) this.sedangMenggeser = true;

      if (this.sedangMenggeser) {
        this.kamera.scrollX = this.geserKamera.scrollX - bedaX / this.kamera.zoom;
        this.kamera.scrollY = this.geserKamera.scrollY - bedaY / this.kamera.zoom;
      }
    });

    this.input.on("pointerup", pointer => {
      if (this.sedangMencubit) {
        const duaJariMasihAktif = ambilDuaJari();
        if (!duaJariMasihAktif) {
          this.sedangMencubit = false;
          this.jarakAwalCubit = 0;
        }
        this.geserKamera = null;
        this.sedangMenggeser = false;
        return;
      }

      if (!this.geserKamera) return;
      const digeser = this.sedangMenggeser;
      this.geserKamera = null;
      this.sedangMenggeser = false;
      if (digeser || pointer.y < 60 || pointer.y > 485) return;

      const posisiDunia = pointer.positionToCamera(this.kamera);
      const unitTerdekat = this.daftarUnit.find(unit =>
        Phaser.Math.Distance.Between(posisiDunia.x, posisiDunia.y, unit.wadah.x, unit.wadah.y) < 25
      );

      if (unitTerdekat) {
        this.pilihUnit(unitTerdekat);
        return;
      }

      if (!this.unitTerpilih) return;
      if (posisiDunia.x < 100 || posisiDunia.x > 2050 || posisiDunia.y < 45 || posisiDunia.y > 1000) return;
      this.perintahkanBergerak(this.unitTerpilih, posisiDunia.x, posisiDunia.y);
    });

    this.input.on("wheel", (pointer, objek, deltaX, deltaY) => {
      const zoomBaru = Phaser.Math.Clamp(this.kamera.zoom - deltaY * 0.001, 0.72, 1.45);
      this.kamera.setZoom(zoomBaru);
    });
  }

  perintahkanBergerak(unit, x, y) {
    this.tweens.killTweensOf(unit.wadah);
    const jarak = Phaser.Math.Distance.Between(unit.wadah.x, unit.wadah.y, x, y);
    const durasi = Phaser.Math.Clamp(jarak * 3.2, 350, 1800);
    this.tweens.add({
      targets: unit.wadah,
      x,
      y,
      duration: durasi,
      ease: "Linear",
      onUpdate: () => unit.wadah.setDepth(unit.wadah.y + 30),
      onComplete: () => this.teksStatus.setText(unit.nama + " tiba di lokasi tujuan.")
    });
    this.teksStatus.setText(unit.nama + " sedang bergerak...");
  }
}
