import { states } from "../config.js";

export const sMovement = ( game, entityId ) => {
  game.scene.entityManager.entities[entityId].components.cTransform.position.x += game.scene.entityManager.entities[entityId].components.cTransform.velocity.x;

  if ( game.scene.entityManager.entities[entityId].components.cTransform.velocity.x === 0.0 ) {
    roundXToWholeNumber(game.scene.entityManager.entities[entityId]);
  }
}


function roundXToWholeNumber(entity) {
  if ( entity.components.cTransform.position.x % 1 !== 0.0 ) {
    entity.components.cTransform.position.x = Math.round(entity.components.cTransform.position.x);
  }
}
