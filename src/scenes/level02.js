import Phaser from 'phaser';
import createBasycLayers from '../layers/createBasicLayers';
import createKnightAnimations from '../animations/createKnightAnimations';
import createPumpkinAnimations from '../animations/createPumpkinAnimations';
import createPlayerMovements from '../movements/createPlayerMovements';
import createEnemyHorizontalMovement from '../movements/createEnemyHorizontalMovement'; 

export default class Level02 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level02' });
    this.knight = undefined;
    this.dagger = undefined;
    this.pumpkin = undefined;
    this.cursors = undefined;
    this.playerSpeed = 80;
    this.enemySpeed = 40;
  }

  preload() {
    // LOAD IMAGES
    this.load.image('tileset', 'images/tileset.png');

    //LOAD SPRITESHEET
    this.load.spritesheet('knight', 'images/knight.png', { frameWidth: 16, frameHeight: 32 });
    this.load.image('dagger', 'images/dagger.png');
    this.load.spritesheet('pumpkin', 'images/pumpkin_dude.png', { frameWidth: 16, frameHeight: 32 });

    //LOAD MAP
    this.load.tilemapTiledJSON('level02map', 'maps/level02map.json')
  }

  create() {
    const map = this.make.tilemap({ key: 'level02map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('tileset');

    // input, physics, add for debug purpose only
    const { belowLayer, worldLayer, aboveLayer, nextLevel } = createBasycLayers(map, tileset, this.input, this.physics, this.add);

    /**************** ADD PLAYER CONTAINER FOR KNIGHT AND DAGGER **************************/
    this.playerContainer = this.add
      .container(24, 368)
      .setSize(20, 22);

    this.physics.world.enableBody(this.playerContainer);

    this.knight = this.physics.add
      .sprite(0, 0, 'knight')
      .setSize(20, 22);

    this.dagger = this.physics.add.image(8, 4, 'dagger');

    this.playerContainer.add(this.dagger);
    this.playerContainer.add(this.knight);

    /**************** ADD ENEMY **************************/
    this.pumpkin = this.physics.add
      .sprite(48, 330, 'pumpkin')
      .setSize(16, 22)
      .setOffset(0, 10);

    /**************** ADD COLLISIONS **************************/
    this.physics.add.collider(this.playerContainer, worldLayer);
    this.physics.add.collider(this.pumpkin, worldLayer, () => this.enemySpeed = -this.enemySpeed);
    this.physics.add.collider(this.dagger, this.pumpkin, () => {
      this.pumpkin.disableBody(true, true);
    });
    this.physics.add.collider(this.playerContainer, this.pumpkin, () => this.scene.start('Level02'));
    this.physics.add.collider(this.playerContainer, nextLevel, () => this.scene.start('Level01'));

    /**************** ADD ANIMATIONS **************************/
    createKnightAnimations(this.anims);
    createPumpkinAnimations(this.anims);

    /**************** CURSORS **************************/
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    createPlayerMovements(this.playerContainer, this.knight, this.dagger, this.cursors, this.playerSpeed, 'knight-walk', 'knight-stop');
    createEnemyHorizontalMovement(this.pumpkin, this.enemySpeed, 'pumpkin-walk');
  }
}
