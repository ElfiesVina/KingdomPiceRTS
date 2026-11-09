export const GAME_CONFIG = {
  type: Phaser.AUTO, parent: "game", width: 960, height: 540,
  backgroundColor: "#152f42", pixelArt: true, roundPixels: true, antialias: false,
  render: { pixelArt: true, antialias: false, powerPreference: "low-power", clearBeforeRender: true },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: 960, height: 540 },
  input: { activePointers: 3, smoothFactor: 0 },
  fps: { target: 60, forceSetTimeOut: false },
  banner: false, audio: { disableWebAudio: false }, scene: []
};
export const COLORS = {
  navy: 0x18364d, deep: 0x102638, blue: 0x3c8fbd, sky: 0x8dd4ec,
  cream: 0xfff0c4, gold: 0xffcf62, green: 0x68bd79, red: 0xe66e69,
  white: 0xffffff, muted: 0xb6cddd, panel: 0x214760
};
export const SAVE_KEY = "kingdom_pixel_rts_save_v1";
export function loadSave() {
  const fallback = {
    player:{name:"Commander",level:1,gold:1200,gems:35,energy:20,xp:0},
    settings:{music:true,sound:true,graphics:"Low"},
    buildings:{townHall:1,barracks:1,farm:1,mine:1,blacksmith:1},
    heroes:["Alden","Mira","Pip"],daily:{claimedAt:0,streak:0},
    rankingPoints:0,tutorialDone:false
  };
  try {
    const saved=JSON.parse(localStorage.getItem(SAVE_KEY)||"null");
    return saved&&typeof saved==="object" ? {
      ...fallback,...saved,
      player:{...fallback.player,...(saved.player||{})},
      settings:{...fallback.settings,...(saved.settings||{})},
      buildings:{...fallback.buildings,...(saved.buildings||{})},
      daily:{...fallback.daily,...(saved.daily||{})}
    } : fallback;
  } catch { return fallback; }
}
export function saveGame(data) {
  try { localStorage.setItem(SAVE_KEY,JSON.stringify(data)); return true; }
  catch(error) { console.warn("Save gagal:",error); return false; }
}