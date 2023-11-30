import { hState } from "../handler/hStateHandler.js";
import { states } from "../config.js";
import Vec2 from "../class/vec2.js";

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

function checkBlockCollision(entity, checkedAgainstEntity) {
  const entityTop            = entity.components.cTransform.position.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top;
  const entityPreviousTop    = entity.components.cBoundingBox.previousPosition.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top;
  const entityBottom         = entity.components.cTransform.position.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;
  const entityPreviousBottom = entity.components.cBoundingBox.previousPosition.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;
  const entityLeft           = entity.components.cTransform.position.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;
  const entityPreviousLeft   = entity.components.cBoundingBox.previousPosition.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;
  const entityRight          = entity.components.cTransform.position.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;
  const entityPreviousRight  = entity.components.cBoundingBox.previousPosition.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;

  const againstTop    = checkedAgainstEntity.components.cTransform.position.y - checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.top;
  const againstBottom = checkedAgainstEntity.components.cTransform.position.y + checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.bottom;
  const againstLeft   = checkedAgainstEntity.components.cTransform.position.x - checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.left;
  const againstRight  = checkedAgainstEntity.components.cTransform.position.x + checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.right;

  let fromAbove = isFromAbove( entity, checkedAgainstEntity );
  let fromBelow = isFromBelow( entity, checkedAgainstEntity );
  let fromLeft  = isFromLeft( entity, checkedAgainstEntity );
  let fromRight = isFromRight( entity, checkedAgainstEntity );

  // If we intersected on the corner and both vertical and horizontal sides switched position,
  // determine where the intersecting point between frames would fall on the checkedAgainst entity
  // then decide if it was a horizontal or vertical collision
  if ( entity.components.cState.value === states.FALL_LEFT ||
       entity.components.cState.value === states.FALL_RIGHT ||
       entity.components.cState.value === states.JUMP_LEFT ||
       entity.components.cState.value === states.JUMP_RIGHT ) {

    if ( fromAbove && fromLeft ) {
      // check entity bottom left y on checkedAgainst right x: if lower (greater y) than checkedAgainst top then it's a side collision, else it's a top collision
      // y = ax + b
      // b = y1 - ax1
      // b = y2 - ax2
      // y1 - ax1 = y2 - ax2
      // y1 - y2 = ax1 - ax2
      // a = ( y1 - y2 ) / ( x1 - x2 )
      const a = ( entityPreviousBottom - entityBottom ) / ( entityPreviousLeft - entityLeft );
      const b = entityBottom - a * entityLeft;
      const y = a * againstRight + b;
      if ( y >= againstTop ) {
        // side collision
        fromAbove = false;
      } else {
        // top collision
        fromLeft = false;
      }

      fromBelow = false;
      fromRight = false;

      if (fromLeft && entityBottom - againstTop < 1 ) {
        entity.components.cTransform.position.y = againstTop;
        entity.components.cTransform.velocity.x = 0;
        entity.components.cTransform.position.x = againstLeft - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;

        return;
      }
    } else if ( fromAbove && fromRight ) {
      const a = ( entityPreviousBottom - entityBottom ) / ( entityPreviousRight - entityRight );
      const b = entityBottom - a * entityRight;
      const y = a * againstLeft + b;
      if ( y >= againstTop ) {
        // side collision
        fromAbove = false;
      } else {
        // top collision
        fromRight = false;
      }

      fromBelow = false;
      fromLeft  = false;

      if (fromRight && entityBottom - againstTop < 1 ) {
        entity.components.cTransform.position.y = againstTop;
        entity.components.cTransform.velocity.x = 0;
        entity.components.cTransform.position.x = againstRight + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;

        return;
      }
    } else if ( fromBelow && fromLeft ) {
      const a = ( entityPreviousTop - entityTop ) / ( entityPreviousLeft - entityLeft );
      const b = entityTop - a * entityLeft;
      const y = a * againstRight + b;
      if ( y <= againstBottom ) {
        // side collision
        fromBelow = false;
      } else {
        // top collision
        fromLeft = false;
      }

      fromAbove = false;
      fromRight = false;
    } else if ( fromBelow && fromRight ) {
      const a = ( entityPreviousTop - entityTop ) / ( entityPreviousRight - entityRight );
      const b = entityTop - a * entityRight;
      const y = a * againstLeft + b;
      if ( y <= againstBottom ) {
        // side collision
        fromBelow = false;
      } else {
        // top collision
        fromRight = false;
      }

      fromAbove = false;
      fromLeft  = false;
    }
  }

  // If we came from above: stop fall
  if ( fromAbove ) {
    if ( entity.components.cState.value === states.FALL_LEFT || entity.components.cState.value === states.FALL_RIGHT ) {
      hState( entity, 'stopFall' );
    }
    entity.components.cTransform.velocity.y = 0;
    entity.components.cTransform.position.y = againstTop - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;

    return;
  }

  // If we came from below: invert y velocity
  if ( fromBelow ) {
    if ( entity.components.cState.value === states.JUMP_LEFT || entity.components.cState.value === states.JUMP_RIGHT  ) {
      entity.components.cTransform.velocity.y *= -1;
    }
  }

  // If we came from above: stop fall
  if ( fromAbove ) {
    if ( entity.components.cState.value === states.FALL_LEFT || entity.components.cState.value === states.FALL_RIGHT ) {
      hState( entity, 'stopFall' );
    }
    entity.components.cTransform.velocity.y = 0;
    entity.components.cTransform.position.y = againstTop - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom;

    return;
  }

  // If we came from aside: stop
  if ( fromRight ) {
    entity.components.cTransform.velocity.x = 0;
    entity.components.cTransform.position.x = againstRight + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left;

    return;
  }

  if ( fromLeft ) {
    entity.components.cTransform.velocity.x = 0;
    entity.components.cTransform.position.x = againstLeft - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right;

    return;
  }

}

function isNotIntersecting( entity, checkedAgainstEntity ) {
  // we have to ensure overlap with .9 factor because if entity is coliding with 2 chekcedAgainst while walking it can be detected as side collision and bug out
  return entity.components.cTransform.position.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left >= checkedAgainstEntity.components.cTransform.position.x + checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.right ||
         entity.components.cTransform.position.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right <= checkedAgainstEntity.components.cTransform.position.x - checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.left ||
         entity.components.cTransform.position.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top >= checkedAgainstEntity.components.cTransform.position.y + checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.bottom ||
         entity.components.cTransform.position.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom <= checkedAgainstEntity.components.cTransform.position.y - checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.top;
}

function isFromBelow( entity, checkedAgainstEntity ) {
  // entity.y < entityPrevious.y && entityTop < againstBottom
  return entity.components.cTransform.position.y <
         entity.components.cBoundingBox.previousPosition.y &&
         entity.components.cTransform.position.y - entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.top <
         checkedAgainstEntity.components.cTransform.position.y + checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.bottom;
}

function isFromAbove( entity, checkedAgainstEntity ) {
  // entity.y > entityPrevious.y && entityBottom > againstTop
  return entity.components.cTransform.position.y >
         entity.components.cBoundingBox.previousPosition.y &&
         entity.components.cTransform.position.y + entity.components.cBoundingBox.height * entity.components.cBoundingBox.boundingBoxPadding.bottom >
         checkedAgainstEntity.components.cTransform.position.y - checkedAgainstEntity.components.cBoundingBox.height * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.top;
}

function isFromRight( entity, checkedAgainstEntity ) {
  // entity.x < entityPrevious.x && entityLeft < againstRight
  return entity.components.cTransform.position.x <
         entity.components.cBoundingBox.previousPosition.x &&
         entity.components.cTransform.position.x - entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.left <
         checkedAgainstEntity.components.cTransform.position.x + checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.right;
}

function isFromLeft( entity, checkedAgainstEntity ) {
  // entityRight > entityPreviousRight && entityRight > againstLeft
  return entity.components.cTransform.position.x >
         entity.components.cBoundingBox.previousPosition.x &&
         entity.components.cTransform.position.x + entity.components.cBoundingBox.width * entity.components.cBoundingBox.boundingBoxPadding.right >
         checkedAgainstEntity.components.cTransform.position.x - checkedAgainstEntity.components.cBoundingBox.width * checkedAgainstEntity.components.cBoundingBox.boundingBoxPadding.left;
}
