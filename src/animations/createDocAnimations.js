const creteDocAnimations = (anims) => {
  anims.create({
    key: 'doc-walk',
    frames: anims.generateFrameNumbers('doc'),
    frameRate: 24,
    repeat: -1
  })
};

export default creteDocAnimations;