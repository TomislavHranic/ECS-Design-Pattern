import { hState } from "../handler/hStateHandler.js";

export const sInputHandler = ( game, entityId ) => {
  if ( game.scene.entityManager.entities[entityId].components.cInput.keys.includes('ArrowUp') ) {
    hState( game.scene.entityManager.entities[entityId], 'up' );
  }

  if ( game.scene.entityManager.entities[entityId].components.cInput.keys.includes('ArrowLeft') ) {
    hState( game.scene.entityManager.entities[entityId], 'left' );
  }

  if ( game.scene.entityManager.entities[entityId].components.cInput.keys.includes('ArrowRight') ) {
    hState( game.scene.entityManager.entities[entityId], 'right' );
  }

  if ( game.scene.entityManager.entities[entityId].components.cInput.keys.includes('ArrowDown') ) {
    hState( game.scene.entityManager.entities[entityId], 'down' );
  };

  if ( game.scene.entityManager.entities[entityId].components.cInput.keys.length === 0 ) {
    hState( game.scene.entityManager.entities[entityId], 'noKeysPressed' );
  }
}
