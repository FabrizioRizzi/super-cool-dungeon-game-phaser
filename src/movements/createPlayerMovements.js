const createPlayerMovements = (container, player, weapon, cursors, speed, playerWalk, playerStop) => {

  // Stop any previous movement from the last frame
  container.body.setVelocity(0);

  //Reset weapon position
  if (!weapon.flipX) {
    weapon.setPosition(8, 4);
  } else {
    weapon.setPosition(-8, 4);
  }
  weapon.setAngle(0);

  // Normalize and scale the velocity so that this.player can't move faster along a diagonal
  container.body.velocity.normalize().scale(speed);

  // Horizontal movement
  if (cursors.left.isDown) {
    container.body.setVelocityX(-speed);
    player.setFlipX(true);
    weapon.setFlipX(true);
    weapon.setPosition(-8, 4);
  } else if (cursors.right.isDown) {
    container.body.setVelocityX(speed);
    player.setFlipX(false);
    weapon.setFlipX(false);
    weapon.setPosition(8, 4);
  }

  // Vertical movement
  if (cursors.up.isDown) {
    container.body.setVelocityY(-speed);
  } else if (cursors.down.isDown) {
    container.body.setVelocityY(speed);
  }

  //Attack movement
  if (cursors.space.isDown) {
    if (!weapon.flipX) {
      weapon.setAngle(90);
      weapon.setPosition(12, 8);
    } else {
      weapon.setAngle(-90);
      weapon.setPosition(-12, 8);
    }
  }

  /*****************ANIMATIONS ****************/
  if (cursors.left.isDown || cursors.right.isDown || cursors.up.isDown || cursors.down.isDown) {
    player.anims.play(playerWalk, true);
  } else {
    player.anims.play(playerStop, true);
    player.anims.stop();
  }
}

export default createPlayerMovements;