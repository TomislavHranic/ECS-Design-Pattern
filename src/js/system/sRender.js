export const sRender = ( game, entityId ) => {
  // If our entity has sprite
  if ( game.scene.entityManager.entities[entityId].components.hasOwnProperty('cSprite') ) {
    game.ctx.drawImage(
      game.scene.entityManager.entities[entityId].components.cSprite.spritesheetData.img,
      game.scene.entityManager.entities[entityId].components.cSprite.width * game.scene.entityManager.entities[entityId].components.cSprite.currentFrame,
      game.scene.entityManager.entities[entityId].components.cSprite.height * game.scene.entityManager.entities[entityId].components.cSprite.currentRow,
      game.scene.entityManager.entities[entityId].components.cSprite.width,
      game.scene.entityManager.entities[entityId].components.cSprite.height,
      game.scene.entityManager.entities[entityId].components.cTransform.position.x - game.scene.entityManager.entities[entityId].components.cTransform.width,
      game.scene.entityManager.entities[entityId].components.cTransform.position.y - game.scene.entityManager.entities[entityId].components.cTransform.height,
      game.scene.entityManager.entities[entityId].components.cTransform.width,
      game.scene.entityManager.entities[entityId].components.cTransform.height
    );
  }
  // game.ctx.fillRect(
  //   game.scene.entityManager.entities[entityId].components.cTransform.position.x - game.scene.entityManager.entities[entityId].components.cBoundingBox.width * .5,
  //   game.scene.entityManager.entities[entityId].components.cTransform.position.y - game.scene.entityManager.entities[entityId].components.cBoundingBox.height * .5,
  //   game.scene.entityManager.entities[entityId].components.cBoundingBox.width,
  //   game.scene.entityManager.entities[entityId].components.cBoundingBox.height
  // );
}
