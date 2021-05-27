const createEnemyHorizontalMovement = (enemy, speed) => {
  enemy.body.setVelocityX(speed);
  if (speed < 0) {
    enemy.setFlipX(true);
  } else {
    enemy.setFlipX(false);
  }
  enemy.anims.play('doc-walk', true);
}

export default createEnemyHorizontalMovement;