const createPlayerMovements = (player, cursors, speed) => {
  // Stop any previous movement from the last frame
  player.body.setVelocity(0);

  // Horizontal movement
  if (cursors.left.isDown) {
    player.body.setVelocityX(-speed);
    player.setFlipX(true);
  } else if (cursors.right.isDown) {
    player.body.setVelocityX(speed);
    player.setFlipX(false);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    player.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    player.body.setVelocityY(speed);
  }
}

export default createPlayerMovements;