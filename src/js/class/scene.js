import EntityManager from "../entity/entityManager.js";
import { sGravity } from "../system/sGravity.js";
import { sInputHandler } from "../system/sInputHandler.js";
import { sRender } from "../system/sRender.js";
import { sMovement } from "../system/sMovement.js";
import { sSpritesheetAnimation } from "../system/sSpritesheetAnimation.js";
import { sCollisionDetection } from "../system/sCollisionDetection.js";

export default class Scene {
  constructor( game, sceneName ) {
    this.sceneName     = sceneName;
    this.game          = game;
    this.systems       = {};
    this.entityManager = new EntityManager( this.game );
  }

  init() {
  }

  mapEntitiesToSystems( entityId, systems = [] ) {
    systems.forEach(system => {
      if ( ! this.entityManager.systemMap.hasOwnProperty(system) ) {
        this.entityManager.systemMap[system] = [];
      }

      this.entityManager.systemMap[system].push(entityId);
    });
  }

  // Add systems
  addSystem( systemName ) {
    switch ( systemName ) {
      case 'sRender':
        this.addSRender();
        break;
      case 'sGravity':
        this.addSGravity();
        break;
      case 'sMovement':
        this.addSMovement();
        break;
      case 'sInputHandler':
        this.addSInputHandler();
        break;
      case 'sSpritesheetAnimation':
        this.addSSpritesheetAnimation();
        break;
      case 'sCollisionDetection':
        this.addSCollisionDetection();
      default:
        break;
    }
  }

  addSGravity() {
    if ( ! this.systems.hasOwnProperty( 'sGravity' ) ) {
      this.systems[ 'sGravity' ] = sGravity;
    }
  }

  addSMovement() {
    if ( ! this.systems.hasOwnProperty( 'sMovement' ) ) {
      this.systems[ 'sMovement' ] = sMovement;
    }
  }

  addSInputHandler() {
    if ( ! this.systems.hasOwnProperty( 'sInputHandler' ) ) {
      this.systems[ 'sInputHandler' ] = sInputHandler;
    }
  }

  addSRender() {
    if ( ! this.systems.hasOwnProperty( 'sRender' ) ) {
      this.systems[ 'sRender' ] = sRender;
    }
  }

  addSSpritesheetAnimation() {
    if ( ! this.systems.hasOwnProperty( 'sSpritesheetAnimation' ) ) {
      this.systems[ 'sSpritesheetAnimation' ] = sSpritesheetAnimation;
    }
  }

  addSCollisionDetection() {
    if ( ! this.systems.hasOwnProperty( 'sCollisionDetection' ) ) {
      this.systems[ 'sCollisionDetection' ] = sCollisionDetection;
    }
  }
}
