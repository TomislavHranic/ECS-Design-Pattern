export const sSpritesheetAnimation = ( game, entityId ) => {
  // Our entiy can have diferent animations dependent on state
  // If entity has states, and the state is different than animation state, and that specific animation state exists change the animation state
  if ( game.scene.entityManager.entities[entityId].components.hasOwnProperty('cState') &&
       game.scene.entityManager.entities[entityId].components.cState.value !== game.scene.entityManager.entities[entityId].components.cSprite.currentAnimationState &&
       game.scene.entityManager.entities[entityId].components.cSprite.animation.hasOwnProperty(game.scene.entityManager.entities[entityId].components.cState.value ) ) {

    game.scene.entityManager.entities[entityId].components.cSprite.currentAnimationState = game.scene.entityManager.entities[entityId].components.cState.value;
    game.scene.entityManager.entities[entityId].components.cSprite.currentLength = game.scene.entityManager.entities[entityId].components.cSprite.animation[game.scene.entityManager.entities[entityId].components.cSprite.currentAnimationState].length;
    game.scene.entityManager.entities[entityId].components.cSprite.currentRow = game.scene.entityManager.entities[entityId].components.cSprite.animation[game.scene.entityManager.entities[entityId].components.cSprite.currentAnimationState].row;
    game.scene.entityManager.entities[entityId].components.cSprite.currentFrame = 0;
  }

  // If we don't have animation set current frame to 0 and return
  if ( game.scene.entityManager.entities[entityId].components.cSprite.currentLength === 1 ) {
    if ( game.scene.entityManager.entities[entityId].components.cSprite.currentFrame !== 0 ) {
      game.scene.entityManager.entities[entityId].components.cSprite.currentFrame = 0;
    }

    return;
  }

  // Increment frame if frame timer is larger than frame interval
  if ( game.scene.entityManager.entities[entityId].components.cSprite.frameTimer < game.scene.entityManager.entities[entityId].components.cSprite.frameInterval ) {
    game.scene.entityManager.entities[entityId].components.cSprite.frameTimer += game.deltaTime;
  } else {
    // console.log(game.scene.entityManager.entities[entityId].components.cSprite.frameTimer);
    // console.log(game.scene.entityManager.entities[entityId].components.cSprite.frameInterval);
    game.scene.entityManager.entities[entityId].components.cSprite.currentFrame++;
    game.scene.entityManager.entities[entityId].components.cSprite.frameTimer = 0;
  }

  // Reset current frame if length is reached
  if ( game.scene.entityManager.entities[entityId].components.cSprite.currentFrame === game.scene.entityManager.entities[entityId].components.cSprite.currentLength ) {
    game.scene.entityManager.entities[entityId].components.cSprite.currentFrame = 0;
  }
}
