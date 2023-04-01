(()=>{"use strict";var e,t={178:(e,t,i)=>{var s=i(260),n=i.n(s);class r extends n().Scene{constructor(e,t){super(e),this.config=t,this.screenCenter=[t.width/2,t.height/2],this.fontSize=34,this.lineHeight=42,this.fontOptions={fontSize:`${this.fontSize}px`,fill:"#fff"}}create(){if(this.add.image(0,0,"sky").setOrigin(0),this.config.canGoBack){this.add.image(this.config.width-10,this.config.height-10,"back").setOrigin(1).setScale(2).setInteractive().on("pointerup",(()=>{this.scene.start("MenuScene")}))}}createMenu(e,t){let i=0;e.forEach((e=>{const s=[this.screenCenter[0],this.screenCenter[1]+i];e.textGO=this.add.text(...s,e.text,this.fontOptions).setOrigin(.5,1),i+=this.lineHeight,t(e)}))}}const a=r;const c=class extends a{constructor(e){super("PlayScene",e),this.bird=null,this.pipes=null,this.isPaused=!1,this.pipeHorizontalDistance=0,this.moveVelocity=400,this.jumpVelocity=500,this.score=0,this.currentLandingPipe=null,this.scoreText="",this.creditText="",this.currentDifficulty="easy",this.pipeVelocity=100,this.difficulties={easy:{pipeHorizontalDistanceRange:[0,50],pipeVerticalDistanceRange:[200,250]},normal:{pipeHorizontalDistanceRange:[0,50],pipeVerticalDistanceRange:[170,220]},hard:{pipeHorizontalDistanceRange:[0,50],pipeVerticalDistanceRange:[140,190]}}}create(){this.currentDifficulty="easy",super.create(),this.createBird(),this.createSpike(),this.createPipes(),this.createColliders(),this.createScore(),this.createPause(),this.handleInputs(),this.listenToEvents(),this.anims.create({key:"fly",frames:this.anims.generateFrameNumbers("bird",{start:1,end:7}),frameRate:8,repeat:-1}),this.bird.play("fly"),this.anims.create({key:"left",frames:this.anims.generateFrameNumbers("bird",{start:0,end:7}),frameRate:10,repeat:-1}),this.anims.create({key:"right",frames:this.anims.generateFrameNumbers("bird",{start:8,end:15}),frameRate:10,repeat:-1})}update(){this.checkGameStatus(),this.recyclePipes()}listenToEvents(){this.pauseEvent||(this.pauseEvent=this.events.on("resume",(()=>{this.initialTime=3,this.countDownText=this.add.text(...this.screenCenter,"Begin in: "+this.initialTime,this.fontOptions).setOrigin(.5),this.timedEvent=this.time.addEvent({delay:1e3,callback:this.countDown,callbackScope:this,loop:!0})})))}countDown(){this.initialTime--,this.countDownText.setText("Begin in: "+this.initialTime),this.initialTime<=0&&(this.isPaused=!1,this.countDownText.setText(""),this.physics.resume(),this.timedEvent.remove())}createBG(){this.add.image(0,0,"sky").setOrigin(0)}createBird(){this.bird=this.physics.add.sprite(this.config.startPosition.x,this.config.startPosition.y,"bird").setFlipX(!0).setScale(1.5).setOrigin(0),this.bird.setBodySize(this.bird.width,this.bird.height-8),this.bird.body.gravity.y=600,this.bird.setCollideWorldBounds(!0)}createSpike(){this.spike=this.physics.add.sprite(this.config.width/2,this.config.height,"spike").setScale(1).setImmovable(!0).setOrigin(0),this.spike.setCollideWorldBounds(!0)}createPipes(){this.pipes=this.physics.add.group();for(let e=0;e<4;e++){const e=this.pipes.create(0,0,"pipe").setImmovable(!0).setScale(.75).setOrigin(0,0),t=this.pipes.create(0,0,"pipe").setImmovable(!0).setScale(.75).setOrigin(0,0);e.x=50,e.y=500,t.x=350,t.y=500,this.placePipe(e,t)}this.pipes.setVelocityY(100)}createColliders(){this.physics.add.collider(this.bird,this.pipes,null,null,this),this.physics.add.collider(this.bird,this.spike,this.gameOver,null,this)}createScore(){this.score=0,this.scoreText=this.add.text(16,16,"Score: 0",{fontSize:"32px",fill:"#000"})}createCredit(){this.creditText=this.add.text(16,580,"Programmed by: Thien Phuoc Hoang",{fontSize:"15px",fill:"#FF0000"})}createPause(){this.isPaused=!1;this.add.image(this.config.width-10,this.config.height-10,"pause").setInteractive().setScale(3).setOrigin(1).on("pointerdown",(()=>{this.isPaused=!0,this.physics.pause(),this.scene.pause(),this.scene.launch("PauseScene")}))}handleInputs(){this.input.keyboard.on("keydown_UP",(function(){this.move(0)}),this),this.input.keyboard.on("keydown_LEFT",(function(){this.move(1)}),this),this.input.keyboard.on("keydown_RIGHT",(function(){this.move(2)}),this)}checkGameStatus(){this.bird.y,this.config.height}placePipe(e,t){const i=this.difficulties[this.currentDifficulty],s=this.getTopMostPipe(),n=Phaser.Math.Between(...i.pipeHorizontalDistanceRange),r=Phaser.Math.Between(n+e.width,this.config.width-t.width-n),a=s-Phaser.Math.Between(...i.pipeVerticalDistanceRange);e.x=r-e.width,e.y=a,t.x=r+n+30,t.y=a}recyclePipes(){const e=[];this.pipes.getChildren().forEach((t=>{t.getBounds().top>=this.config.height&&(e.push(t),2===e.length&&(this.placePipe(...e),this.increaseScore(),this.increaseDifficulty()))}))}increaseDifficulty(){10===this.score&&(this.currentDifficulty="normal",this.pipes.setVelocityY(150)),20===this.score&&(this.currentDifficulty="hard",this.pipes.setVelocityY(200))}getTopMostPipe(){let e=this.config.height;return this.pipes.getChildren().forEach((function(t){t.y<e&&(e=t.y)})),e}gameOver(){this.physics.pause(),this.bird.setTint(15616036),this.time.addEvent({delay:10,callback:()=>{this.scene.launch("RestartScene")},loop:!1})}move(e){this.isPaused||(0==e?this.bird.body.velocity.y=-this.jumpVelocity:1==e?(this.bird.body.velocity.x=-this.moveVelocity,this.bird.anims.play("right",!0)):2==e?(this.bird.body.velocity.x=this.moveVelocity,this.bird.anims.play("left",!0)):this.bird.body.velocity.x=0)}increaseScore(){this.score++,this.scoreText.setText(`Score: ${this.score}`)}};const h=class extends a{constructor(e){super("MenuScene",e),this.menu=[{scene:"PlayScene",text:"Play"},{scene:null,text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&this.scene.start(e.scene),"Exit"===e.text&&this.game.destroy(!0)}))}};class o extends n().Scene{constructor(){super("PreloadScene")}preload(){this.load.image("sky","assets/sky.png"),this.load.spritesheet("bird","assets/slime-Sheet.png",{frameWidth:32,frameHeight:21}),this.load.image("spike","assets/spike.png"),this.load.image("pipe","assets/pipe.png"),this.load.image("pause","assets/pause.png"),this.load.image("back","assets/back.png")}create(){this.scene.start("MenuScene")}}const l=o;const p=class extends a{constructor(e){super("ScoreScene",{...e,canGoBack:!0})}create(){super.create();const e=localStorage.getItem("bestScore");this.add.text(...this.screenCenter,`Best Score: ${e||0}`,this.fontOptions).setOrigin(.5)}};const d=class extends a{constructor(e){super("PauseScene",e),this.menu=[{scene:"PlayScene",text:"Continue"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this))}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Continue"===e.text?(this.scene.stop(),this.scene.resume(e.scene)):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}};const u=class extends a{constructor(e){super("RestartScene",e),this.menu=[{scene:"PlayScene",text:"Restart"},{scene:"MenuScene",text:"Exit"}]}create(){super.create(),this.createMenu(this.menu,this.setupMenuEvents.bind(this)),this.gameOverText=this.add.text(this.config.width/2-100,this.config.height/2-80,"Game Over",{fontSize:"40px",fill:"#ff0000"})}setupMenuEvents(e){const t=e.textGO;t.setInteractive(),t.on("pointerover",(()=>{t.setStyle({fill:"#ff0"})})),t.on("pointerout",(()=>{t.setStyle({fill:"#fff"})})),t.on("pointerup",(()=>{e.scene&&"Restart"===e.text?(this.physics.pause(),this.time.addEvent({delay:10,callback:()=>{this.scene.start("PlayScene")},loop:!1})):(this.scene.stop("PlayScene"),this.scene.start(e.scene))}))}},f={width:400,height:600,startPosition:{x:40,y:100}},y=[l,h,p,c,d,u],g=e=>new e(f),m={type:n().AUTO,...f,pixelArt:!0,physics:{default:"arcade",arcade:{}},scene:y.map(g)};new(n().Game)(m)}},i={};function s(e){var n=i[e];if(void 0!==n)return n.exports;var r=i[e]={exports:{}};return t[e](r,r.exports,s),r.exports}s.m=t,e=[],s.O=(t,i,n,r)=>{if(!i){var a=1/0;for(l=0;l<e.length;l++){for(var[i,n,r]=e[l],c=!0,h=0;h<i.length;h++)(!1&r||a>=r)&&Object.keys(s.O).every((e=>s.O[e](i[h])))?i.splice(h--,1):(c=!1,r<a&&(a=r));if(c){e.splice(l--,1);var o=n();void 0!==o&&(t=o)}}return t}r=r||0;for(var l=e.length;l>0&&e[l-1][2]>r;l--)e[l]=e[l-1];e[l]=[i,n,r]},s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var i in t)s.o(t,i)&&!s.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={143:0};s.O.j=t=>0===e[t];var t=(t,i)=>{var n,r,[a,c,h]=i,o=0;if(a.some((t=>0!==e[t]))){for(n in c)s.o(c,n)&&(s.m[n]=c[n]);if(h)var l=h(s)}for(t&&t(i);o<a.length;o++)r=a[o],s.o(e,r)&&e[r]&&e[r][0](),e[r]=0;return s.O(l)},i=self.webpackChunkphaser_webpack_boilerplate=self.webpackChunkphaser_webpack_boilerplate||[];i.forEach(t.bind(null,0)),i.push=t.bind(null,i.push.bind(i))})();var n=s.O(void 0,[736],(()=>s(178)));n=s.O(n)})();