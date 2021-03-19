import Phaser from 'phaser'

export default class Level01 extends Phaser.Scene {
  constructor() {
    super('level-01');
    this.showDebug = false;
    this.player = undefined;
    this.cursors = undefined;
  }

  preload() {
    this.load.image('tileset', 'images/tileset.png')
    this.load.spritesheet('pumpkin', 'images/pumpkin_dude.png', { frameWidth: 16, frameHeight: 32 })
    this.load.spritesheet('knight', 'images/knight.png', { frameWidth: 16, frameHeight: 32 })

    this.load.tilemapTiledJSON('map', 'maps/map.json')
  }

  create() {

    const map = this.make.tilemap({ key: 'map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage("tileset");
    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const belowLayer = map.createLayer("belowplayer", tileset, 0, 0);
    const worldLayer = map.createLayer("world", tileset, 0, 0);
    const aboveLayer = map.createLayer("aboveplayer", tileset, 0, 0);

    //worldLayer.setCollisionByProperty({ "collides": true });
    worldLayer.setCollision([323, 35, 289, 257, 225, 227, 3, 261, 258, 290, 293, 294, 226, 262]);

    aboveLayer.setDepth(10);

    if (this.showDebug) {
      const debugGraphics = this.add.graphics().setAlpha(0.75);
      worldLayer.renderDebug(debugGraphics, {
        tileColor: null, // Color of non-colliding tiles
        collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
      });
    }

    this.player = this.physics.add
      .sprite(24, 368, "knight")
      .setSize(15, 20)
      .setOffset(0, 16);
    this.player.body.allowRotation = true;

    this.anims.create({
      key: 'walk',
      frames: this.anims.generateFrameNumbers("knight", { start: 0, end: 7 }),
      frameRate: 24,
      repeat: -1
    })
    this.anims.create({
			key: 'stop',
			frames: [ { key: "knight", frame: 0 } ],
			frameRate: 0
		})
    this.physics.add.collider(this.player, worldLayer);
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 80;
    // Stop any previous movement from the last frame
    this.player.body.setVelocity(0);

    // Horizontal movement
    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-speed);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(speed);
      this.player.setFlipX(false);
    }

    // Vertical movement
    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-speed);
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    this.player.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
      this.player.anims.play("walk", true);
    } else {
      this.player.anims.play("stop", true);
      this.player.anims.stop();
    }
  }

}
