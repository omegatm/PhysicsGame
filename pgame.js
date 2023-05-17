class Intro extends Phaser.Scene {
    constructor() {
        super('intro')
    }
    create() {
        let text=this.add.text(1920/2-250,540, "Click to start").setFontSize(60).setInteractive();
        //var text = this.add.bitMaptext(400, 300, 'Hover over me!').setOrigin(0.5);
    
            text.on('pointerover', ()=> {
                // Tween the text to a smaller size
                this.tweens.add({
                    targets: text,
                    scaleX: 0.8,
                    scaleY: 0.6,
                    duration: 100,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            });
            
            // Add event listener for mouseout event
            text.on('pointerout', function() {
                // Tween the text back to its original size
                this.tweens.add({
                    targets: text,
                    scaleX: 1,
                    scaleY: 1,
                    duration: 100,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            });
        
        this.input.on('pointerdown', () => {
                // Tween the text to a smaller size
                this.tweens.add({
                    targets: text,
                    scaleX: 0.8,
                    scaleY: 0.6,
                    duration: 50,
                    yoyo: true,
                    ease: 'Sine.easeInOut'
                });
            
            this.cameras.main.fade(1000, 0,0,0);
            this.time.delayedCall(1000, () => this.scene.start('lv1'));
        });
    }
}
class Lv1 extends Phaser.Scene {
    constructor() {
        super('lv1')
    }
    preload(){
        this.load.image('flag', './assets/flag1.png');
        this.load.image('ball', './assets/ball.png');
        this.load.image('floor1', './assets/floor1.png');
    }
    create() {
        this.cameras.main.setBackgroundColor('#FFFFFF');
        let flag=this.add.sprite(this.game.config.width/2-100, this.game.config.height/2, 'flag').setOrigin(.5,.5)
        let ball=this.add.physics.sprite(this.game.config.width/2, this.game.config.height/2, 'ball');
        ball.setGravityY(100);
 
        // let groundX=this.sys.game.config.width/2;
        // let groundY=this.sys.game.config.height*.95;
        // let ground=this.physics.add.sprite(groundX,groundY,"floor1");
        // ground.displayWidth=this.sys.game.config.width;
        // this.physics.add.collider(ball, ground);
        // ground.setImmovable();
       
       
    }
    
    update()
    {
    
    }
}

    


class Lv2 extends Phaser.Scene {
    constructor() {
        super('lv2')
    }
}
class Lv3 extends Phaser.Scene {
    constructor() {
        super('lv3')
    }
}
class Outro extends Phaser.Scene {
    constructor() {
        super('outro')
    }
}
const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1920,
        height: 1080,
        physics:{
            default:'arcade',
            arcade:{
                debug:true
            }
        }
    },
    scene: [Intro, Lv1],
    title: "physics Game",
});
