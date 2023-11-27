import Scene from "./scene/scene.js";

export default class Game {
  constructor( ctx, width, height ) {
    this.ctx       = ctx;
    this.width     = width;
    this.height    = height;
    this.gameState = {
      score: 0,
    }
    this.scene;
  }

  // Set scene
  setScene( sceneName ) {
    this.scene = new Scene( this, sceneName );
    this.scene.init();
    this.addInputListener();
  }

  // Add input listeners
  addInputListener() {
    if ( this.scene.entityManager.componentMap.hasOwnProperty('cInput') ) {
      window.addEventListener( 'keydown', (e) => {
        Object.keys(this.scene.entityManager.componentMap.cInput).forEach( key => {
          if ( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ) === -1 ) {
            this.scene.entityManager.componentMap.cInput[key].keys.push( e.code );
          }
        });
      });

      window.addEventListener( 'keyup', (e) => {
        Object.keys(this.scene.entityManager.componentMap.cInput).forEach( key => {
          if ( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ) >= 0 ) {
            this.scene.entityManager.componentMap.cInput[key].keys.splice( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ), 1 );
          }
        });
      });
    }
  }

  // Update the scene
  update() {
    Object.keys(this.scene.entityManager.systemMap).forEach( systemName => {
      this.scene.entityManager.systemMap[systemName].forEach( entityId => {
        this.scene.systems[systemName]( this, entityId );
      });
    });
  }
}
