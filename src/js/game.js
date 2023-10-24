import Scene from "./scene/scene.js";
import { sPhysics } from "./system/sPhysics.js";
import { sRender } from "./system/sRender.js";

export default class Game {
  constructor( ctx, width, height ) {
    this.ctx   = ctx;
    this.w     = width;
    this.h     = height;
    this.scene;
  }

  setScene( sceneName ) {
    this.scene = new Scene( this, sceneName );
    this.scene.init();
  }

  addSystem( systemName ) {
    switch ( systemName ) {
      case 'sRender':
        this.addSRender();
        break;
      case 'sPhysics':
        this.addSPhysics();
        break;
      default:
        break;
    }
  }

  // Systems
  addSPhysics() {
    if ( ! this.scene.systems.hasOwnProperty( 'physics' ) ) {
      this.scene.systems[ 'sPhysics' ] = sPhysics;
    }
  }

  addSRender() {
    if ( ! this.scene.systems.hasOwnProperty( 'render' ) ) {
      this.scene.systems[ 'sRender' ] = sRender;
    }
  }
}
