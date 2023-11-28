import { hState } from "../handler/hStateHandler.js";
import { states } from "../config.js";

export const sCollisionDetection = ( game, entityId ) => {

  // Check player
  if ( game.scene.entityManager.entities[entityId].type === 'player' ) {
    game.scene.entityManager.systemMap.sCollisionDetection.forEach( id => {
      // Return if self
      if ( entityId === id ) return;

      // Block collision
      if ( game.scene.entityManager.entities[id].type === 'block' && ! isNotIntersecting( game.scene.entityManager.entities[entityId], game.scene.entityManager.entities[id] ) ) {
        console.log('intersecting');
        checkBlockCollision( game.scene.entityManager.entities[entityId], game.scene.entityManager.entities[id] );

        return;
      }
    });

    return;
  }
}

function checkBlockCollision(entity, checkedAgainstentity) {
  const entityTop            = entity.components.cTransform.position.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top;
  const entityPreviousTop    = entity.components.cBoundingBox.previousPosition.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top;
  const entityBottom         = entity.components.cTransform.position.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;
  const entityPreviousBottom = entity.components.cBoundingBox.previousPosition.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;
  const entityLeft           = entity.components.cTransform.position.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;
  const entityPreviousLeft   = entity.components.cBoundingBox.previousPosition.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;
  const entityRight          = entity.components.cTransform.position.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;
  const entityPreviousRight  = entity.components.cBoundingBox.previousPosition.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;

  const againstTop    = checkedAgainstentity.components.cTransform.position.y - checkedAgainstentity.components.cBoundingBox.height * checkedAgainstentity.components.cBoundingBox.boundingBoxPadding.top;
  const againstBottom = checkedAgainstentity.components.cTransform.position.y + checkedAgainstentity.components.cBoundingBox.height * checkedAgainstentity.components.cBoundingBox.boundingBoxPadding.bottom;
  const againstLeft   = checkedAgainstentity.components.cTransform.position.x - checkedAgainstentity.components.cBoundingBox.width * checkedAgainstentity.components.cBoundingBox.boundingBoxPadding.left;
  const againstRight  = checkedAgainstentity.components.cTransform.position.x + checkedAgainstentity.components.cBoundingBox.width * checkedAgainstentity.components.cBoundingBox.boundingBoxPadding.right;

  // If we intersected on the corner and both vertical and horizontal sides switched position,
  // determine where the intersecting point between frames would fall on acheckedAgainst entity
  // then decide if it was a horizontal or vertical collision

  // If we came from above: stop fall
  if ( entityBottom >= entityPreviousBottom && entityBottom >= againstTop ) {
    if ( entity.components.cState.value === states.FALL_LEFT || entity.components.cState.value === states.FALL_RIGHT ) {
      hState( entity, 'stopFall' );
    }
    entity.components.cTransform.velocity.y = 0;
    entity.components.cTransform.position.y = againstTop - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;

    return;
  }

  // If we came from aside: stop
  if ( entityLeft < entityPreviousLeft && entityLeft < againstRight ) {
    entity.components.cTransform.velocity.x = 0;
    entity.components.cTransform.position.x = againstRight + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;

    return;
  } else if ( entityRight > entityPreviousRight && entityRight > againstLeft ) {
    entity.components.cTransform.velocity.x = 0;
    entity.components.cTransform.position.x = againstLeft - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;

    return;
  }


  // If we came from below: invert y velocity
  if ( entityTop < entityPreviousTop && entityTop <= againstBottom ) {
    if ( entity.components.cState.value === states.JUMP_LEFT || entity.components.cState.value === states.JUMP_RIGHT  ) {
      entity.components.cTransform.velocity.y *= -1;
    }
  }
}

function isNotIntersecting( entity, checkedAgainstEntity ) {
  return entity.components.cTransform.position.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left > checkedAgainstEntity.components.cTransform.position.x + checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.right ||
         entity.components.cTransform.position.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right < checkedAgainstEntity.components.cTransform.position.x - checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.left ||
         entity.components.cTransform.position.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top > checkedAgainstEntity.components.cTransform.position.y + checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.bottom ||
         entity.components.cTransform.position.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom < checkedAgainstEntity.components.cTransform.position.y - checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.top;
}
