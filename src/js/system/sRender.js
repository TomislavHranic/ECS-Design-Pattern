export const sRender = ( game, entityId ) => {
  game.ctx.fillRect( game.scene.entityManager.entities[entityId].components.cTransform.position.x, game.scene.entityManager.entities[entityId].components.cTransform.position.y, 50, 50 );
}
