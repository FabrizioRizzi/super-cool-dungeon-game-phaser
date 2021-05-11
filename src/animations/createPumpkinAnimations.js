const cretePumpkinAnimations = (anims) => {
  anims.create({
    key: 'pumpkin-walk',
    frames: anims.generateFrameNumbers('pumpkin'),
    frameRate: 24,
    repeat: -1
  })
};

export default cretePumpkinAnimations;