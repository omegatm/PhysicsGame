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
        let ball=null;
        let flag=null;
    }
    preload(){
        this.load.image('flag', './assets/flag1.png');
        this.load.image('ball', './assets/ball.png');
        this.load.atlas('sheet', 'assets/Floors.png', 'assets/Floors.json');
        this.load.json('shapes','./assets/Floor.json');
    }
    create() {
        let shapes=this.cache.json.get("shapes");
        this.add.text(this.game.config.width * 0.2, this.game.config.height * 0.3, "Flick The Ball with the Mouse to reach the goal!").setColor('#00ff00').setFontSize(30);
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.flag=this.matter.add.sprite(this.game.config.width*.8, this.game.config.height*.73, 'flag').setOrigin(.5,.5).setStatic(true);
        this.ball=this.matter.add.image(this.game.config.width*.1, this.game.config.height/2, 'ball');
        this.ball.setBody({
            type:'circle',
            radius:33
        });
        this.ball.setBounce(.5);
        this.ball.setInteractive();
        this.ball.setFrictionAir(0.01); 
        this.input.setDraggable(this.ball);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //gameObject.setPosition(dragX, dragY);
            // const timer = this.time.addEvent({
            //     delay: 500,
            //     callback: this.input.emit('dragend'),
            //     callbackScope: this,
            //     loop: false 
            //   });
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
       
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
              if (
                (pair.bodyA === this.ball.body && pair.bodyB === this.flag.body) ||
                (pair.bodyA === this.flag.body && pair.bodyB === this.ball.body)
              ) {
                this.scene.start('lv2');
                
              }
            });
          });
        
       
    }
    
    update() {
       
       
      }
    }




class Lv2 extends Phaser.Scene {
    constructor() {
        super('lv2')
        let ball=null;
        let flag=null;
    }
    preload(){
        this.load.image('flag', './assets/flag1.png');
        this.load.image('ball', './assets/ball.png');
        this.load.atlas('sheet', 'assets/Floors.png', 'assets/Floors.json');
        this.load.json('shapes','./assets/Floor.json');
    }
    create() {
        let shapes=this.cache.json.get("shapes");
        this.add.text(this.game.config.width * 0.4, this.game.config.height * 0.3, "Flick The Ball with the Mouse to reach the goal!").setColor('#00ff00').setFontSize(30);
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.flag=this.matter.add.sprite(this.game.config.width*.8, this.game.config.height*.4, 'flag').setOrigin(.5,.5).setStatic(true);
        this.ball=this.matter.add.image(this.game.config.width*.1, this.game.config.height*.8, 'ball');
        this.ball.setBody({
            type:'circle',
            radius:33
        });
        this.ball.setBounce(.5);
        this.ball.setInteractive();
        this.ball.setFrictionAir(0.01); 
        this.input.setDraggable(this.ball);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //gameObject.setPosition(dragX, dragY);
            // const timer = this.time.addEvent({
            //     delay: 500,
            //     callback: this.input.emit('dragend'),
            //     callbackScope: this,
            //     loop: false 
            //   });
        });


    this.input.on('dragend', (pointer, gameObject) => {

      const velocityX = pointer.velocity.x * .1; 
      const velocityY = pointer.velocity.y * .1; 

      gameObject.setVelocity(velocityX, velocityY);
    });
        let groundX = this.sys.game.config.width / 2-315;
        let groundY = this.sys.game.config.height * 0.5;
        let ground = this.matter.add.sprite(groundX, groundY,'sheet', 'floor2.png',{shape:shapes.floor2});
        //ground.setBody({type:'fromVerts',verts: shapes.floor1});
       
        ground.displayWidth = this.sys.game.config.width;

    
        // ground.setBody({
        //     type: 'fromVerts',
        //     verts: ground.frame.vertices,
        //     flagInternal: true
        //   });
          
        ground.setStatic(true);

    
        //this.matter.add.collider(ball, ground);
       
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
              if (
                (pair.bodyA === this.ball.body && pair.bodyB === this.flag.body) ||
                (pair.bodyA === this.flag.body && pair.bodyB === this.ball.body)
              ) {
                this.scene.start('lv3');
                
              }
            });
          });
        
       
    }
    
    update() {
       
       
      }
    }
class Lv3 extends Phaser.Scene {
    constructor() {
        super('lv3')
        let ball=null;
        let flag=null;
    }
    preload(){
        this.load.image('flag', './assets/flag1.png');
        this.load.image('ball', './assets/ball.png');
        this.load.atlas('sheet', 'assets/Floors.png', 'assets/Floors.json');
        this.load.json('shapes','./assets/Floor.json');
    }
    create() {
        let shapes=this.cache.json.get("shapes");
        this.add.text(this.game.config.width * 0.2, this.game.config.height * 0.3, "Flick The Ball with the Mouse to reach the goal!").setColor('#00ff00').setFontSize(30);
        this.matter.world.setBounds(0, 0, this.game.config.width, this.game.config.height);
        this.cameras.main.setBackgroundColor('#FFFFFF');
        this.flag=this.matter.add.sprite(this.game.config.width*.8, this.game.config.height*.65, 'flag').setOrigin(.5,.5).setStatic(true);
        this.ball=this.matter.add.image(this.game.config.width*.1, this.game.config.height/2, 'ball');
        this.ball.setBody({
            type:'circle',
            radius:33
        });
        this.ball.setBounce(.5);
        this.ball.setInteractive();
        this.ball.setFrictionAir(0.01); 
        this.input.setDraggable(this.ball);
        this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
            //gameObject.setPosition(dragX, dragY);
            // const timer = this.time.addEvent({
            //     delay: 500,
            //     callback: this.input.emit('dragend'),
            //     callbackScope: this,
            //     loop: false 
            //   });
        });


    this.input.on('dragend', (pointer, gameObject) => {

      const velocityX = pointer.velocity.x * .1; 
      const velocityY = pointer.velocity.y * .1; 

      gameObject.setVelocity(velocityX, velocityY);
    });
        let groundX = this.sys.game.config.width / 2;
        let groundY = this.sys.game.config.height * 0.95;
        let ground = this.matter.add.sprite(groundX, groundY,'sheet', 'floor3.png',{shape:shapes.floor3});
        //ground.setBody({type:'fromVerts',verts: shapes.floor1});
       
        ground.displayWidth = this.sys.game.config.width;

    
        // ground.setBody({
        //     type: 'fromVerts',
        //     verts: ground.frame.vertices,
        //     flagInternal: true
        //   });
          
        ground.setStatic(true);

    
        //this.matter.add.collider(ball, ground);
       
        this.matter.world.on('collisionstart', (event) => {
            event.pairs.forEach((pair) => {
              if (
                (pair.bodyA === this.ball.body && pair.bodyB === this.flag.body) ||
                (pair.bodyA === this.flag.body && pair.bodyB === this.ball.body)
              ) {
                this.scene.start('outro');
                
              }
            });
          });
        
       
    }
    
    update() {
       
       
      }
}
class Outro extends Phaser.Scene {
    constructor() {
        super('outro')
    }
    create()
    {
        this.add.text(1920/2-250,540, "YOU DID IT!").setFontSize(60).setColor('#FFFFFF');
        this.cameras.main.setBackgroundColor(0x000000);
        
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
            debug:false
        }
    },
    scene: [Intro, Lv1,Lv2,Lv3,Outro],
    title: "physics Game",
});
