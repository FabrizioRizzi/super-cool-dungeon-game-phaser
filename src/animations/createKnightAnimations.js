const createKnightAnimations = (anims) => {
  anims.create({
    key: 'knight-walk',
    frames: anims.generateFrameNumbers('knight', { start: 0, end: 7 }),
    frameRate: 24,
    repeat: -1
  })
  anims.create({
    key: 'knight-stop',
    frames: [ { key: 'knight', frame: 0 } ],
    frameRate: 0
  })
};

export default createKnightAnimations;