import Phaser from 'phaser'

import Level01 from './scenes/level01'
import Level02 from './scenes/level02'

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 400,
  zoom: 2,
  title: 'Super Cool Dungeon Game',
  transparent: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  },
  scene: [Level01, Level02]
};

export default new Phaser.Game(config)