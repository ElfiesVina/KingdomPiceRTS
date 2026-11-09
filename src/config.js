// Konfigurasi utama dan pengelolaan data simpanan Kingdom Pixel RTS.

export const KONFIGURASI_PERMAINAN = {
  type: Phaser.AUTO,
  parent: "game",
  width: 960,
  height: 540,
  backgroundColor: "#152f42",
  pixelArt: true,
  roundPixels: true,
  antialias: false,
  render: {
    pixelArt: true,
    antialias: false,
    powerPreference: "low-power",
    clearBeforeRender: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 960,
    height: 540
  },
  input: { activePointers: 3, smoothFactor: 0 },
  fps: { target: 60, forceSetTimeOut: false },
  banner: false,
  audio: { disableWebAudio: false },
  scene: []
};

export const WARNA_PERMAINAN = {
  biruTua: 0x18364d,
  biruGelap: 0x102638,
  biru: 0x3c8fbd,
  biruLangit: 0x8dd4ec,
  krem: 0xfff0c4,
  emas: 0xffcf62,
  hijau: 0x68bd79,
  merah: 0xe66e69,
  putih: 0xffffff,
  redup: 0xb6cddd,
  panel: 0x214760
};

// Kunci ini dipertahankan agar simpanan dari versi prototipe tetap terbaca.
export const KUNCI_SIMPANAN = "kingdom_pixel_rts_save_v1";

const DATA_BAWAAN = {
  player: {
    name: "Commander",
    level: 1,
    gold: 1200,
    gems: 35,
    energy: 20,
    xp: 0
  },
  settings: {
    music: true,
    sound: true,
    graphics: "Low"
  },
  buildings: {
    townHall: 1,
    barracks: 1,
    farm: 1,
    mine: 1,
    blacksmith: 1
  },
  heroes: ["Alden", "Mira", "Pip"],
  daily: {
    claimedAt: 0,
    streak: 0
  },
  rankingPoints: 0,
  tutorialDone: false
};

function adalahObjek(nilai) {
  return nilai !== null && typeof nilai === "object" && !Array.isArray(nilai);
}

function angkaAman(nilai, bawaan, minimum = 0) {
  return Number.isFinite(nilai) && nilai >= minimum ? nilai : bawaan;
}

function rapikanSimpanan(data) {
  const sumber = adalahObjek(data) ? data : {};

  const pemain = adalahObjek(sumber.player) ? sumber.player : {};
  const pengaturan = adalahObjek(sumber.settings) ? sumber.settings : {};
  const bangunan = adalahObjek(sumber.buildings) ? sumber.buildings : {};
  const harian = adalahObjek(sumber.daily) ? sumber.daily : {};

  const kualitasGrafik = ["Low", "Medium", "High"];

  return {
    ...DATA_BAWAAN,
    ...sumber,
    player: {
      ...DATA_BAWAAN.player,
      ...pemain,
      name: typeof pemain.name === "string" && pemain.name.trim()
        ? pemain.name.trim().slice(0, 24)
        : DATA_BAWAAN.player.name,
      level: angkaAman(pemain.level, DATA_BAWAAN.player.level, 1),
      gold: angkaAman(pemain.gold, DATA_BAWAAN.player.gold),
      gems: angkaAman(pemain.gems, DATA_BAWAAN.player.gems),
      energy: angkaAman(pemain.energy, DATA_BAWAAN.player.energy),
      xp: angkaAman(pemain.xp, DATA_BAWAAN.player.xp)
    },
    settings: {
      ...DATA_BAWAAN.settings,
      ...pengaturan,
      music: typeof pengaturan.music === "boolean"
        ? pengaturan.music
        : DATA_BAWAAN.settings.music,
      sound: typeof pengaturan.sound === "boolean"
        ? pengaturan.sound
        : DATA_BAWAAN.settings.sound,
      graphics: kualitasGrafik.includes(pengaturan.graphics)
        ? pengaturan.graphics
        : DATA_BAWAAN.settings.graphics
    },
    buildings: Object.fromEntries(
      Object.entries(DATA_BAWAAN.buildings).map(([nama, tingkat]) => [
        nama,
        angkaAman(bangunan[nama], tingkat, 1)
      ])
    ),
    heroes: Array.isArray(sumber.heroes)
      ? sumber.heroes.filter(nama => typeof nama === "string").slice(0, 100)
      : [...DATA_BAWAAN.heroes],
    daily: {
      ...DATA_BAWAAN.daily,
      ...harian,
      claimedAt: angkaAman(harian.claimedAt, 0),
      streak: angkaAman(harian.streak, 0)
    },
    rankingPoints: angkaAman(sumber.rankingPoints, 0),
    tutorialDone: typeof sumber.tutorialDone === "boolean"
      ? sumber.tutorialDone
      : DATA_BAWAAN.tutorialDone
  };
}

// Membaca data, memeriksa bentuknya, lalu melengkapi bagian yang belum tersedia.
export function muatSimpanan() {
  try {
    const teksSimpanan = localStorage.getItem(KUNCI_SIMPANAN);

    if (!teksSimpanan) {
      return rapikanSimpanan(DATA_BAWAAN);
    }

    const dataTersimpan = JSON.parse(teksSimpanan);

    if (!adalahObjek(dataTersimpan)) {
      console.warn("Data simpanan tidak berbentuk objek. Data bawaan digunakan.");
      return rapikanSimpanan(DATA_BAWAAN);
    }

    return rapikanSimpanan(dataTersimpan);
  } catch (kesalahan) {
    console.warn("Data simpanan gagal dibaca. Data bawaan digunakan:", kesalahan);
    return rapikanSimpanan(DATA_BAWAAN);
  }
}

// Mengembalikan true hanya jika data benar-benar berhasil disimpan.
export function simpanPermainan(dataPermainan) {
  try {
    if (!adalahObjek(dataPermainan)) {
      console.warn("Penyimpanan dibatalkan: data permainan tidak valid.");
      return false;
    }

    const dataBersih = rapikanSimpanan(dataPermainan);
    localStorage.setItem(KUNCI_SIMPANAN, JSON.stringify(dataBersih));
    return true;
  } catch (kesalahan) {
    console.warn("Data permainan gagal disimpan:", kesalahan);
    return false;
  }
}
