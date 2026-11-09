import { KONFIGURASI_PERMAINAN, muatSimpanan, simpanPermainan } from "./config.js";
import SplashScene from "./scenes/SplashScene.js";
import HomeScene from "./scenes/HomeScene.js";
import MenuScene from "./scenes/MenuScene.js";
import MultiplayerScene from "./scenes/MultiplayerScene.js";

const permainan = new Phaser.Game({
  ...KONFIGURASI_PERMAINAN,
  scene: [SplashScene, HomeScene, MenuScene, MultiplayerScene]
});

// Antarmuka global ini dipertahankan sementara agar alat debug prototipe lama tetap kompatibel.
window.KingdomRTS = {
  game: permainan,
  getSave: muatSimpanan,
  save: simpanPermainan
};

window.addEventListener("contextmenu", kejadian => kejadian.preventDefault());
window.addEventListener("orientationchange", () => {
  setTimeout(() => permainan.scale.refresh(), 120);
});
