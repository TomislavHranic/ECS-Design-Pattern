export const sGravity = ( game, transform, boundingBox = null, weight = 0 ) => {
  transform.velocity.y += weight;
  transform.position.y += transform.velocity.y;

  if ( transform.position.y >= game.h - 50 ) {
    transform.velocity.y = 0;
    transform.position.y = game.h - 50;
  }

  if ( boundingBox ) {
    boundingBox.position.y = game.h - 50;
  }
}
