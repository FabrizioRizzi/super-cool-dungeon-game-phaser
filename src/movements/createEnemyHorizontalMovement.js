const createEnemyHorizontalMovement = (enemy, speed, enemyWalk) => {
  enemy.body.setVelocityX(speed);
  if (speed < 0) {
    enemy.setFlipX(true);
  } else {
    enemy.setFlipX(false);
  }
  enemy.anims.play(enemyWalk, true);
}

export default createEnemyHorizontalMovement;