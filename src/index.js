import Phaser from 'phaser'

import Level01 from './scenes/level01'

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 400,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 } // Top down game, so no gravity
    }
  },
  scene: [Level01]
};

export default new Phaser.Game(config)