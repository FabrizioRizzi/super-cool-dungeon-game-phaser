import Phaser from 'phaser';
import createBasicLayers from '../layers/createBasicLayers';
import createKnightAnimations from '../animations/createKnightAnimations';
import createDocAnimations from '../animations/createDocAnimations';
import createPlayerMovements from '../movements/createPlayerMovements';
import createEnemyHorizontalMovement from '../movements/createEnemyHorizontalMovement';

export default class Level01 extends Phaser.Scene {
  constructor() {
    super({ key: 'Level01' });
    this.playerContainer = undefined;
    this.knight = undefined;
    this.dagger = undefined;
    this.doc = undefined;
    this.redPotion = undefined;
    this.cursors = undefined;
    this.playerSpeed = 80;
    this.enemySpeed = 40;
    this.scoreText = undefined;
    this.score = 0;
  }

  preload() {
    // LOAD IMAGES
    this.load.image('tileset', 'images/tileset.png');

    //LOAD SPRITESHEET
    this.load.spritesheet('knight', 'images/knight.png', { frameWidth: 16, frameHeight: 32 });
    this.load.spritesheet('doc', 'images/doc.png', { frameWidth: 16, frameHeight: 32 });
    this.load.image('redpotion', 'images/redpotion.png');
    this.load.image('dagger', 'images/dagger.png');

    //LOAD MAP
    this.load.tilemapTiledJSON('level01map', 'maps/level01map.json');
  }

  create() {
    const map = this.make.tilemap({ key: 'level01map', tileWidth: 16, tileHeight: 16 });
    const tileset = map.addTilesetImage('tileset');

    // input, physics, add for debug purpose only
    const { belowLayer, worldLayer, aboveLayer, nextLevel } = createBasicLayers(map, tileset, this.input, this.physics, this.add);

    this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });

    /**************** ADD PLAYER CONTAINER FOR KNIGHT AND DAGGER **************************/
    this.playerContainer = this.add
      .container(24, 368)
      .setSize(20, 22);

    this.physics.world.enableBody(this.playerContainer);

    this.knight = this.physics.add
      .sprite(0, 0, 'knight')
      .setSize(20, 22);

    this.dagger = this.physics.add.image(8, 4, 'dagger');

    this.playerContainer.add(this.knight);
    this.playerContainer.add(this.dagger);

    /**************** ADD ENEMY **************************/
    this.doc = this.physics.add
      .sprite(200, 80, 'doc')
      .setSize(16, 22)
      .setOffset(0, 10);
    
      
    /**************** ADD OTHER STUFF **************************/
    this.redPotion = this.physics.add.image(40, 120, 'redpotion');

    
    /**************** ADD COLLISIONS **************************/
    this.physics.add.collider(this.playerContainer, worldLayer);
    this.physics.add.collider(this.doc, worldLayer, () => this.enemySpeed = -this.enemySpeed);
    this.physics.add.collider(this.knight, this.redPotion, () => {
      this.redPotion.disableBody(true, true);
      this.score += 10;
      this.scoreText.setText('Score: ' + this.score);
    });
    this.physics.add.collider(this.knight, this.doc, () => {
      this.scene.start('Level01');
      this.score = 0;
      this.scoreText.setText('Score: ' + this.score);
    });
    this.physics.add.collider(this.knight, nextLevel, () => this.scene.start('Level02'));
   
    /**************** ADD ANIMATIONS **************************/
    createKnightAnimations(this.anims);
    createDocAnimations(this.anims);

    /**************** CURSORS **************************/
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {    
    createPlayerMovements(this.playerContainer, this.knight, this.dagger, this.cursors, this.playerSpeed, 'knight-walk', 'knight-stop');
    createEnemyHorizontalMovement(this.doc, this.enemySpeed);
  }
}
