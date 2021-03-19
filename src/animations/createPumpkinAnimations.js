const cretePumpkinAnimations = (anims) => {
  anims.create({
    key: 'pumpkin-walk',
    frames: anims.generateFrameNumbers('pumpkin', { start: 0, end: 7 }),
    frameRate: 24,
    repeat: -1
  })
  anims.create({
    key: 'pumpkin-stop',
    frames: [ { key: 'pumpkin', frame: 0 } ],
    frameRate: 0
  })
};

export default cretePumpkinAnimations;