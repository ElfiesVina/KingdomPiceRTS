import { loadSave } from "../config.js";
export default class SplashScene extends Phaser.Scene {
  constructor(){super("SplashScene");}
  create(){
    const w=960,h=540; this.cameras.main.setBackgroundColor("#82c8df");
    const g=this.add.graphics(); g.fillStyle(0x9bdbeb).fillRect(0,0,w,h); g.fillStyle(0xffe7a3).fillCircle(790,90,38);
    for(let i=0;i<9;i++){const x=i*118-12,base=375+(i%3)*12;g.fillStyle([0x527c75,0x688b79,0x416b70][i%3]).fillRect(x,base-95-(i%2)*28,100,150);g.fillStyle(0xc77b57).fillRect(x-8,base-105-(i%2)*28,116,20);g.fillStyle(0xffd98a).fillRect(x+18,base-65-(i%2)*28,18,24);g.fillStyle(0x6c4e46).fillRect(x+58,base-48-(i%2)*28,22,48);}
    g.fillStyle(0x6d9b65).fillRect(0,375,w,165);g.fillStyle(0x8dbb70).fillRect(0,390,w,150);
    this.add.text(480,115,"KINGDOM",{fontFamily:"Nunito",fontSize:"62px",fontStyle:"900",color:"#fff2c5",stroke:"#28465a",strokeThickness:10}).setOrigin(.5);
    this.add.text(480,169,"PIXEL RTS",{fontFamily:"Nunito",fontSize:"24px",fontStyle:"900",color:"#ffe08a",stroke:"#28465a",strokeThickness:5}).setOrigin(.5);
    this.makeHero(480,305,2);
    this.add.text(480,410,"MEMUAT ASET GAME",{fontFamily:"Nunito",fontSize:"15px",fontStyle:"800",color:"#16364a"}).setOrigin(.5);
    this.add.rectangle(480,441,420,20,0x24465b).setStrokeStyle(3,0xffffff);
    this.progress=this.add.rectangle(272,441,0,12,0xffd36c).setOrigin(0,.5);
    this.percent=this.add.text(480,470,"0%",{fontFamily:"Nunito",fontSize:"15px",fontStyle:"900",color:"#17384c"}).setOrigin(.5);
    this.status=this.add.text(480,495,"Menyiapkan dunia...",{fontFamily:"Nunito",fontSize:"12px",color:"#23475c"}).setOrigin(.5);
    this.startButton=this.button(480,460,"TAP TO START",()=>this.scene.start("HomeScene"),230,48);this.startButton.setVisible(false);
    const steps=["Membangun kota pixel...","Menyiapkan pasukan...","Memuat antarmuka...","Menyiapkan penyimpanan..."];let p=0;
    this.time.addEvent({delay:280,repeat:steps.length-1,callback:()=>{p++;this.progress.width=416*(p/steps.length);this.percent.setText(`${Math.round(p/steps.length*100)}%`);this.status.setText(steps[p-1]);if(p===steps.length)this.time.delayedCall(350,()=>{this.status.setText("Dunia siap. Selamat datang, Commander!");this.startButton.setVisible(true);});}});
  }
  makeHero(x,y,scale=1){const c=this.add.container(x,y);const px=(xx,yy,ww,hh,color)=>this.add.rectangle(xx,yy,ww,hh,color);c.add([px(0,16,28,24,0x315d91),px(0,-5,25,25,0xf2bd91),px(0,-18,29,10,0x70462f),px(-7,17,9,18,0x523d38),px(8,17,9,18,0x523d38),px(0,1,5,5,0x26394b)]);c.setScale(scale);this.tweens.add({targets:c,y:y-5,duration:650,yoyo:true,repeat:-1,ease:"Sine.easeInOut"});return c;}
  button(x,y,label,callback,width=180,height=44){const bg=this.add.rectangle(x,y,width,height,0x27618a).setStrokeStyle(3,0xc4e4f4).setInteractive({useHandCursor:true});const txt=this.add.text(x,y,label,{fontFamily:"Nunito",fontSize:"17px",fontStyle:"900",color:"#fff4d1"}).setOrigin(.5);bg.on("pointerdown",callback);bg.on("pointerover",()=>bg.setFillStyle(0x397fa9));bg.on("pointerout",()=>bg.setFillStyle(0x27618a));return this.add.container(0,0,[bg,txt]);}
}