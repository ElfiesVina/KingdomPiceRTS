import { GAME_CONFIG, loadSave, saveGame } from "./config.js";
import SplashScene from "./scenes/SplashScene.js";
import HomeScene from "./scenes/HomeScene.js";
import MenuScene from "./scenes/MenuScene.js";
import MultiplayerScene from "./scenes/MultiplayerScene.js";
const game = new Phaser.Game({...GAME_CONFIG,scene:[SplashScene,HomeScene,MenuScene,MultiplayerScene]});
window.KingdomRTS = {game,getSave:loadSave,save:saveGame};
window.addEventListener("contextmenu",event=>event.preventDefault());
window.addEventListener("orientationchange",()=>setTimeout(()=>game.scale.refresh(),120));