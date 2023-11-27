import { hState } from "../handler/hStateHandler.js";

export const sGravity = ( game, entityId ) => {
  // Our entity needs to have weight component attached for gravity to work
  if ( ! game.scene.entityManager.entities[entityId].components.hasOwnProperty('cWeight') ) {
    return;
  }

  game.scene.entityManager.entities[entityId].components.cTransform.velocity.y += game.scene.entityManager.entities[entityId].components.cWeight.value;
  game.scene.entityManager.entities[entityId].components.cTransform.position.mAdd( game.scene.entityManager.entities[entityId].components.cTransform.velocity );

  // Our entity needs to have state component attached to change states
  if ( ! game.scene.entityManager.entities[entityId].components.hasOwnProperty('cState') ) {
    return;
  }

  if ( game.scene.entityManager.entities[entityId].components.cTransform.position.y >= game.height - 50 ) {
    if ( game.scene.entityManager.entities[entityId].components.cState.value > 1 ) {
      hState( game.scene.entityManager.entities[entityId], 'stopFall' );
    }
    game.scene.entityManager.entities[entityId].components.cTransform.position.y = game.height - 50;
  }
}
