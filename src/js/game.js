import { sSceneSwitcher } from "./system/sSceneSwitcher.js";

export default class Game {
  constructor( ctx, width, height ) {
    this.ctx       = ctx;
    this.width     = width;
    this.height    = height;
    this.gameState = {
      score: 0,
    }
    this.deltaTime;
    this.scene;
    this.keyDown = (e) => {
      Object.keys(this.scene.entityManager.componentMap.cInput).forEach( key => {
        if ( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ) === -1 ) {
          this.scene.entityManager.componentMap.cInput[key].keys.push( e.code );
        }
      });
    }
    this.keyUp = (e) => {
      Object.keys(this.scene.entityManager.componentMap.cInput).forEach( key => {
        if ( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ) >= 0 ) {
          this.scene.entityManager.componentMap.cInput[key].keys.splice( this.scene.entityManager.componentMap.cInput[key].keys.indexOf( e.code ), 1 );
        }
      });
    }

    this.setScene( 'example1' );
  }

  // Set scene
  setScene( sceneName ) {
    this.removeInputListener();
    this.scene = sSceneSwitcher( this, sceneName );
    this.scene.init();
    this.addInputListener();
  }

  // Add input listeners
  addInputListener() {
    if ( this.scene.entityManager.componentMap.hasOwnProperty('cInput') ) {
      window.addEventListener( 'keydown', this.keyDown );
      window.addEventListener( 'keyup', this.keyUp );
    }
  }

  removeInputListener() {
    window.removeEventListener( 'keydown', this.keyDown );
    window.removeEventListener( 'keyup', this.keyUp );
  }


  // Update
  update() {
    // update game
    Object.keys(this.scene.entityManager.systemMap).forEach( systemName => {
      this.scene.entityManager.systemMap[systemName].forEach( entityId => {
        this.scene.systems[systemName]( this, entityId );
      });
    });

    // reload scene
    Object.values( this.scene.entityManager.entityTypeMap.player ).forEach( (player) => {
      if ( player.components.cTransform.position.y > this.height) {
        if ( this.scene.sceneName === 'example1' ) {
          this.setScene('example2');
        } else {
          this.setScene('example1');
        }
      }
    });
  }
}
