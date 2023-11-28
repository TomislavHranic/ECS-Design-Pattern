import { states } from "../config.js";

export const sMovement = ( game, entityId ) => {
  // If we have bounding box on the entity, save the current x position to it as previous x position
  if ( game.scene.entityManager.entities[entityId].components.hasOwnProperty('cBoundingBox') ) {
    game.scene.entityManager.entities[entityId].components.cBoundingBox.previousPosition.x = game.scene.entityManager.entities[entityId].components.cTransform.position.x
  }

  game.scene.entityManager.entities[entityId].components.cTransform.position.x += game.scene.entityManager.entities[entityId].components.cTransform.velocity.x;

  if ( game.scene.entityManager.entities[entityId].components.cTransform.velocity.x === 0.0 ) {
    roundXPositionToWholeNumber(game.scene.entityManager.entities[entityId].components.cTransform);
  }
}


function roundXPositionToWholeNumber(cTransform) {
  if ( cTransform.position.x % 1 !== 0.0 ) {
    cTransform.position.x = Math.round(cTransform.position.x);
  }
}
