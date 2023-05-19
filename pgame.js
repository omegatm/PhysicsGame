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
        this.load.atlas('sheet', 'assets/Floors.png', 'assets/Floors.json');
        this.load.json('shapes','./assets/Floor.json');
    }
    create() {
        let shapes=this.cache.json.get("shapes");
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        let flag=this.add.sprite(this.game.config.width*.8, this.game.config.height*.7, 'flag').setOrigin(.5,.5)
        let ball=this.matter.add.image(this.game.config.width/2, this.game.config.height/2, 'ball');
        ball.setBody({
            type:'circle',
            radius:33
        });
        ball.setBounce(.5);
        ball.setInteractive();
        ball.setFrictionAir(0.01); 
        this.input.setDraggable(ball);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //gameObject.setPosition(dragX, dragY);
            const timer = this.time.addEvent({
                delay: 500,
                callback: this.input.emit('dragend'),
                callbackScope: this,
                loop: false 
              });
        });


    this.input.on('dragend', (pointer, gameObject) => {

      const velocityX = pointer.velocity.x * .1; 
      const velocityY = pointer.velocity.y * .1; 

      gameObject.setVelocity(velocityX, velocityY);
    });
        let groundX = this.sys.game.config.width / 2;
        let groundY = this.sys.game.config.height * 0.95;
        let ground = this.matter.add.sprite(groundX, groundY,'sheet', 'floor1.png',{shape:shapes.floor1});
        //ground.setBody({type:'fromVerts',verts: shapes.floor1});
       
        ground.displayWidth = this.sys.game.config.width;

    
        // ground.setBody({
        //     type: 'fromVerts',
        //     verts: ground.frame.vertices,
        //     flagInternal: true
        //   });
          
        ground.setStatic(true);

    
        //this.matter.add.collider(ball, ground);
       
       
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
        
    },
    physics:{
        default:'matter',
        matter:{
            gravity:{
               y:.9
            },
            debug:true
        }
    },
    scene: [Intro, Lv1],
    title: "physics Game",
});
