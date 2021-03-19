import Phaser from 'phaser';
import createBasicLayers from '../layers/createBasicLayers';
import createKnightAnimations from '../animations/createKnightAnimations';
import createDocAnimations from '../animations/createDocAnimations';
import createPlayerMovements from '../movements/createPlayerMovements';

export default class Level01 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level01' });
    this.knight = undefined;
    this.doc = undefined;
    this.cursors = undefined;
    this.enemySpeed = 40;
  }

  preload() {
    // LOAD IMAGES
    this.load.image('tileset', 'images/tileset.png')

    //LOAD SPRITESHEET
    this.load.spritesheet('knight', 'images/knight.png', { frameWidth: 16, frameHeight: 32 })
    this.load.spritesheet('doc', 'images/doc.png', { frameWidth: 16, frameHeight: 32 })

    //LOAD MAP
    this.load.tilemapTiledJSON('level01map', 'maps/level01map.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'level01map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('tileset');

    // input, physics, add for debug purpose only
    const { belowLayer, worldLayer, aboveLayer, nextLevel } = createBasicLayers(map, tileset, this.input, this.physics, this.add);

    this.knight = this.physics.add
      .sprite(24, 368, 'knight')
      .setSize(16, 22)
      .setOffset(0, 10);

    this.doc = this.physics.add
      .sprite(200, 80, 'doc')
      .setSize(16, 22)
      .setOffset(0, 10);

    this.physics.add.collider(this.knight, worldLayer);
    this.physics.add.collider(this.doc, worldLayer, () => this.enemySpeed = -this.enemySpeed );
    this.physics.add.collider(this.knight, this.doc, () => this.scene.start('Level01'));
    this.physics.add.collider(this.knight, nextLevel, () => this.scene.start('Level02'));
    this.cursors = this.input.keyboard.createCursorKeys();

    createKnightAnimations(this.anims);
    createDocAnimations(this.anims);
  }

  update() {
    const speed = 80;
    createPlayerMovements(this.knight, this.cursors, speed);

    this.doc.body.setVelocityX(this.enemySpeed);
    if (this.enemySpeed < 0) {
      this.doc.setFlipX(true);
    } else {
      this.doc.setFlipX(false);
    }

    this.doc.anims.play('doc-walk', true);


    // Normalize and scale the velocity so that this.knight can't move faster along a diagonal
    this.knight.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
      this.knight.anims.play('knight-walk', true);
    } else {
      this.knight.anims.play('knight-stop', true);
      this.knight.anims.stop();
    }
  }
}
