const createBasicLayers = (map, tileset, input, physics, add) => {
  // Parameters: layer name (or index) from Tiled, tileset, x, y
  const belowLayer = map.createLayer('belowplayer', tileset, 0, 0);
  const worldLayer = map.createLayer('world', tileset, 0, 0);
  const aboveLayer = map.createLayer('aboveplayer', tileset, 0, 0);
  const nextLevel = map.createLayer('nextLevel', tileset, 0, 0);

  //worldLayer.setCollisionByProperty({ 'collides': true });
  worldLayer.setCollision([3, 10, 41, 48, 50, 51, 52, 57, 58, 61, 62, 64, 65, 68, 69, 75]);
  nextLevel.setCollision([46, 83])

  aboveLayer.setDepth(10);

  // Debug graphics
  input.keyboard.once('keydown-DELETE', event => {
    // Turn on physics debugging to show player's hitbox
    physics.world.createDebugGraphic();

    // Create worldLayer collision graphic above the player, but below the help text
    const graphics = add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);
    worldLayer.renderDebug(graphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });
  });

  return { belowLayer, worldLayer, aboveLayer, nextLevel };
}

export default createBasicLayers;