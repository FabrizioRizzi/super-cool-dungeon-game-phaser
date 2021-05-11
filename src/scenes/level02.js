import Phaser from 'phaser';
import createBasycLayers from '../layers/createBasicLayers';
import createKnightAnimations from '../animations/createKnightAnimations';
import createPumpkinAnimations from '../animations/createPumpkinAnimations';
import createPlayerMovements from '../movements/createPlayerMovements';

export default class Level02 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level02' });
    this.knight = undefined;
    this.pumpkin = undefined;
    this.cursors = undefined;
    this.enemySpeed = 40;
  }

  preload() {
    // LOAD IMAGES
    this.load.image('tileset', 'images/tileset.png')

    //LOAD SPRITESHEET
    this.load.spritesheet('knight', 'images/knight.png', { frameWidth: 16, frameHeight: 32 })
    this.load.spritesheet('pumpkin', 'images/pumpkin_dude.png', { frameWidth: 16, frameHeight: 32 })

    //LOAD MAP
    this.load.tilemapTiledJSON('level02map', 'maps/level02map.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'level02map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('tileset');

    // input, physics, add for debug purpose only
    const { belowLayer, worldLayer, aboveLayer, nextLevel } = createBasycLayers(map, tileset, this.input, this.physics, this.add);
    
    this.knight = this.physics.add
      .sprite(24, 368, 'knight')
      .setSize(16, 22)
      .setOffset(0, 10);

    this.pumpkin = this.physics.add
      .sprite(48, 330, 'pumpkin')
      .setSize(16, 22)
      .setOffset(0, 10);

    this.physics.add.collider(this.knight, worldLayer);
    this.physics.add.collider(this.pumpkin, worldLayer, () => this.enemySpeed = -this.enemySpeed );
    this.physics.add.collider(this.knight, this.pumpkin, () => this.scene.start('Level02'));
    this.physics.add.collider(this.knight, nextLevel, () => this.scene.start('Level02'));
    this.cursors = this.input.keyboard.createCursorKeys();

    createKnightAnimations(this.anims);
    createPumpkinAnimations(this.anims);
  }

  update() {
    const speed = 80;
    createPlayerMovements(this.knight, this.cursors, speed);

    // Normalize and scale the velocity so that this.pumpkin can't move faster along a diagonal
    this.knight.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
      this.knight.anims.play('knight-walk', true);
    } else {
      this.knight.anims.play('knight-stop', true);
      this.knight.anims.stop();
    }

    this.pumpkin.body.setVelocityX(this.enemySpeed);
    if (this.enemySpeed < 0) {
      this.pumpkin.setFlipX(true);
    } else {
      this.pumpkin.setFlipX(false);
    }

    this.pumpkin.anims.play('pumpkin-walk', true);

  }
}
