export const sGravity = ( game, entityId ) => {
  // Our entity needs to have weight component attached for gravity to work
  if ( ! game.scene.entityManager.entities[entityId].components.hasOwnProperty('cWeight') ) {
    return;
  }

  // If we have bounding box on the entity, save the current y position to it as previous y position
  if ( game.scene.entityManager.entities[entityId].components.hasOwnProperty('cBoundingBox') ) {
    game.scene.entityManager.entities[entityId].components.cBoundingBox.previousPosition.y = game.scene.entityManager.entities[entityId].components.cTransform.position.y
  }

  game.scene.entityManager.entities[entityId].components.cTransform.velocity.y += game.scene.entityManager.entities[entityId].components.cWeight.value;
  game.scene.entityManager.entities[entityId].components.cTransform.position.mAdd( game.scene.entityManager.entities[entityId].components.cTransform.velocity );
}
