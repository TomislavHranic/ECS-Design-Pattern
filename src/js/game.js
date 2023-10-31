import Scene from "./scene/scene.js";
import { sGravity } from "./system/sGravity.js";
import { sInputHandler } from "./system/sInputHandler.js";
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
      case 'sGravity':
        this.addSGravity();
        break;
      default:
        this.addSInputHandler();
        break;
    }
  }

  // Systems
  addSInputHandler() {
    if ( ! this.scene.systems.hasOwnProperty( 'sInputHandler' ) ) {
      this.scene.systems[ 'sInputHandler' ] = sInputHandler;
    }
  }

  addSGravity() {
    if ( ! this.scene.systems.hasOwnProperty( 'sGravity' ) ) {
      this.scene.systems[ 'sGravity' ] = sGravity;
    }
  }

  addSRender() {
    if ( ! this.scene.systems.hasOwnProperty( 'sRender' ) ) {
      this.scene.systems[ 'sRender' ] = sRender;
    }
  }
}
