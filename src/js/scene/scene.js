import EntityManager from "../entity/entityManager.js";
import { sGravity } from "../system/sGravity.js";
import { sInputHandler } from "../system/sInputHandler.js";
import { sRender } from "../system/sRender.js";
import { sMovement } from "../system/sMovement.js";

export default class Scene {
  constructor( game, sceneName ) {
    this.sceneName     = sceneName;
    this.game          = game;
    this.systems       = {};
    this.entityManager = new EntityManager( this.game );
  }

  init() {
    this.addSystem( 'sRender' );
    this.addSystem( 'sGravity' );
    this.addSystem( 'sMovement' );
    this.addSystem( 'sInputHandler' );
    const player = this.entityManager.addPlayer(50.1, 50.1);
    this.mapEntitiesToSystems(player, ['sRender', 'sGravity', 'sMovement', 'sInputHandler' ]);
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
}
