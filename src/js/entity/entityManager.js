import Vec2 from "../class/vec2.js";
import CSprite from "../component/cSprite.js";
import CTransform from "../component/cTransform.js";
import Entity from "./entity.js";

export default class EntityManager {
  constructor( game ) {
    this.game              = game;
    this.counter           = 0;
    this.entities          = {};
    this.entityTypeMap     = {};
    this.componentMap      = {};
    this.entitiesToAdd     = [];
    this.entityIdsToRemove = [];
  }

  update() {
  }

  addEntity( type ) {
    this.entities[ this.counter ] = new Entity( this.counter, type );

    if ( ! this.entityTypeMap.hasOwnProperty( type ) ) {
      this.entityTypeMap[ type ] = {};
    }
    this.entityTypeMap[ type ][ this.counter ] = this.entities[ this.counter ];

    return this.counter++;
  }

  // Entities
  addPlayer(x = 0, y = 0) {
    const id = this.addEntity('player');
    this.game.addSystem( 'sRender' );
    this.game.addSystem( 'sPhysics' );
    this.addCTransform(id, x, y);
    //this.addCSprite(id)
  }

  // Components
  addCTransform(id, x = 0, y = 0, vx = 0, vy = 0 ) {
    if ( ! this.componentMap.hasOwnProperty( 'cTransform' ) ) {
      this.componentMap[ 'cTransform' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cTransform' ) ) {
      this.entities[id]['components']['cTransform'] = new CTransform( new Vec2(x, y) );
      this.componentMap['cTransform'][id] = this.entities[id]['components']['cTransform'];
    }
  }

  addCSprite( id ) {
    if ( ! this.componentMap.hasOwnProperty( 'cSprite' ) ) {
      this.componentMap[ 'cSprite' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cSprite' ) ) {
      this.entities[id]['components']['cSprite'] = new CSprite();
      this.componentMap['cSprite'][id] = this.entities[id]['components']['cSprite'];
    }
  }
}
