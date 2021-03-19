import Phaser from 'phaser';
import createPumpkinAnimations from '../animations/createPumpkinAnimations';
import createBasycLayers from '../layers/createBasicLayers';
import createPlayerMovements from '../movements/createPlayerMovements';

export default class Level02 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level02' });
    this.pumpkin = undefined;
  }

  preload() {
    // LOAD IMAGES
    this.load.image('tileset', 'images/tileset.png')

    //LOAD SPRITESHEET
    this.load.spritesheet('pumpkin', 'images/pumpkin_dude.png', { frameWidth: 16, frameHeight: 32 })

    //LOAD MAP
    this.load.tilemapTiledJSON('level02map', 'maps/level02map.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'level02map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('tileset');

    // input, physics, add for debug purpose only
    const { belowLayer, worldLayer, aboveLayer } = createBasycLayers(map, tileset, this.input, this.physics, this.add);

    this.pumpkin = this.physics.add
      .sprite(24, 368, 'pumpkin')
      .setSize(16, 22)
      .setOffset(0, 10);

    this.physics.add.collider(this.pumpkin, worldLayer);
    this.cursors = this.input.keyboard.createCursorKeys();

    createPumpkinAnimations(this.anims);
  }

  update() {
    const speed = 80;
    createPlayerMovements(this.pumpkin, this.cursors, speed);

    // Normalize and scale the velocity so that this.pumpkin can't move faster along a diagonal
    this.pumpkin.body.velocity.normalize().scale(speed);

    if (this.cursors.left.isDown || this.cursors.right.isDown || this.cursors.up.isDown || this.cursors.down.isDown) {
      this.pumpkin.anims.play('pumpkin-walk', true);
    } else {
      this.pumpkin.anims.play('pumpkin-stop', true);
      this.pumpkin.anims.stop();
    }
  }
}
