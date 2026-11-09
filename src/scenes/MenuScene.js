import { muatSimpanan, simpanPermainan } from "../config.js";
export default class MenuScene extends Phaser.Scene {
  constructor(){super("MenuScene");}
  create(){
    this.saveData=muatSimpanan();this.cameras.main.setBackgroundColor("#8bcfe0");const g=this.add.graphics();
    g.fillStyle(0xa7e0e9).fillRect(0,0,960,540);g.fillStyle(0xffe4a0).fillCircle(810,75,35);g.fillStyle(0x5c876e).fillRect(0,310,960,230);
    for(let i=0;i<7;i++){let x=i*150-10;g.fillStyle(0x71947b).fillRect(x,190,110,150);g.fillStyle(0xc27a59).fillTriangle(x-12,190,x+55,130,x+122,190);g.fillStyle(0xffd58b).fillRect(x+22,225,18,25);}
    g.fillStyle(0xc4b27c).fillRect(0,410,960,38);
    this.add.text(480,35,"KINGDOM HUB",{fontFamily:"Nunito",fontSize:"34px",fontStyle:"900",color:"#fff0c4",stroke:"#25485d",strokeThickness:6}).setOrigin(.5);
    this.add.text(480,72,`Commander ${this.saveData.player.name} • Level ${this.saveData.player.level}`,{fontFamily:"Nunito",fontSize:"14px",fontStyle:"800",color:"#18364d"}).setOrigin(.5);
    this.add.text(480,112,"Pilih tujuan kerajaanmu",{fontFamily:"Nunito",fontSize:"16px",fontStyle:"900",color:"#18364d"}).setOrigin(.5);
    this.hero=this.add.container(480,340);const p=(x,y,w,h,c)=>this.add.rectangle(x,y,w,h,c);this.hero.add([p(0,15,25,25,0x356a9a),p(0,-8,23,22,0xf1c19b),p(0,-20,28,9,0x70452f),p(-7,19,8,17,0x54403a),p(7,19,8,17,0x54403a)]);
    this.tweens.add({targets:this.hero,x:{from:420,to:540},duration:4200,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});
    this.makeButton(205,205,"CAMPAIGN",()=>this.info("Campaign","Mode campaign dan misi cerita akan hadir bersama sistem Arena pada Tahap 3."),210,52,0x9b663a);
    this.makeButton(480,205,"WORLD WAR / ARENA",()=>this.scene.start("MultiplayerScene"),240,52,0x28658e);
    this.makeButton(755,205,"HEROES",()=>this.info("Heroes","Roster awal: Alden (Knight), Mira (Archer), Pip (Healer). Koleksi 20+ hero dibangun pada tahap sistem Hero."),210,52,0x477b68);
    this.makeButton(205,278,"UPGRADE",()=>this.info("Upgrade","Upgrade hero, skill, dan equipment akan terhubung pada tahap sistem Hero."),210,52);
    this.makeButton(480,278,"GUILD",()=>this.info("Guild","Guild lokal dasar dan hadiah anggota direncanakan setelah fondasi battle stabil."),210,52);
    this.makeButton(755,278,"SHOP",()=>this.info("Shop","Toko kerajaan dapat diakses dari Home Screen."),210,52);
    this.makeButton(480,462,"KEMBALI KE HOME",()=>this.scene.start("HomeScene"),240,46,0x31566e,15);
    this.makeButton(850,462,"SETTINGS",()=>this.settings(),150,46,0x477b68,14);
    this.add.rectangle(480,390,580,48,0x18364d,.82).setStrokeStyle(2,0xc5e3f0);
    this.add.text(480,390,"EVENT: Festival Kerajaan • Bonus login harian +250 Gold",{fontFamily:"Nunito",fontSize:"15px",fontStyle:"900",color:"#ffe5a0"}).setOrigin(.5);
    this.makeButton(480,425,"KLAIM DAILY REWARD DI HOME",()=>this.scene.start("HomeScene"),260,32,0x477b68,11);
  }
  makeButton(x,y,label,fn,w=190,h=48,color=0x28658e,size=16){const b=this.add.rectangle(x,y,w,h,color).setStrokeStyle(3,0xd7efff).setInteractive({useHandCursor:true});this.add.text(x,y,label,{fontFamily:"Nunito",fontSize:`${size}px`,fontStyle:"900",color:"#fff4d1",align:"center",wordWrap:{width:w-16}}).setOrigin(.5);b.on("pointerdown",fn);b.on("pointerover",()=>b.setAlpha(.82));b.on("pointerout",()=>b.setAlpha(1));}
  info(title,body){this.modal(title,`<p>${body}</p><button class="action" id="close-info">Kembali</button>`);document.querySelector("#close-info").onclick=()=>document.querySelector("#dom-modal").classList.add("hidden");}
  settings(){const s=this.saveData.settings;this.modal("SETTINGS",`<button class="action" id="music">Musik: ${s.music?"ON":"OFF"}</button><button class="action" id="sound">Suara: ${s.sound?"ON":"OFF"}</button><label>Grafik</label><select id="graphics"><option ${s.graphics==="Low"?"selected":""}>Low</option><option ${s.graphics==="Medium"?"selected":""}>Medium</option><option ${s.graphics==="High"?"selected":""}>High</option></select>`);document.querySelector("#music").onclick=()=>{s.music=!s.music;simpanPermainan(this.saveData);this.settings();};document.querySelector("#sound").onclick=()=>{s.sound=!s.sound;simpanPermainan(this.saveData);this.settings();};document.querySelector("#graphics").onchange=e=>{s.graphics=e.target.value;simpanPermainan(this.saveData);this.settings();};}
  modal(title,html){const m=document.querySelector("#dom-modal");document.querySelector("#modal-title").textContent=title;document.querySelector("#modal-content").innerHTML=html;m.classList.remove("hidden");document.querySelector("#modal-close").onclick=()=>m.classList.add("hidden");}
}