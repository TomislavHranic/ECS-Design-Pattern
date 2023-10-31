import Vec2 from "../class/vec2.js";
import CSprite from "../component/cSprite.js";
import CTransform from "../component/cTransform.js";
import CBoundingBox from "../component/cBoundingBox.js";
import Entity from "./entity.js";
import CInput from "../component/cInput.js";
import CWeight from "../component/cWeight.js";

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
    const width = 50;
    const height = 50;
    const id = this.addEntity('player');
    this.game.addSystem( 'sRender' );
    this.game.addSystem( 'sGravity' );
    this.addCTransform(id, x, y);
    this.addCBoundingBox(id, x, y, width, height);
    this.addCWeight(id, 0.3);
    this.addCInput(id);
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

  addCBoundingBox(id, x = 0, y = 0, width = 0, height = 0) {
    if ( ! this.componentMap.hasOwnProperty( 'cBoundingBox' ) ) {
      this.componentMap[ 'cBoundingBox' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cBoundingBox' ) ) {
      this.entities[id]['components']['cBoundingBox'] = new CBoundingBox( new Vec2(x, y), width, height );
      this.componentMap['cBoundingBox'][id] = this.entities[id]['components']['cBoundingBox'];
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

  addCInput( id ) {
    this.game.addSystem( 'sInputHandler' );
    if ( ! this.componentMap.hasOwnProperty( 'cInput' ) ) {
      this.componentMap[ 'cInput' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cInput' ) ) {
      this.entities[id]['components']['cInput'] = new CInput();
      this.componentMap['cInput'][id] = this.entities[id]['components']['cInput'];
    }
  }

  addCWeight( id, weight ) {
    if ( ! this.componentMap.hasOwnProperty( 'cWeight' ) ) {
      this.componentMap[ 'cWeight' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cWeight' ) ) {
      this.entities[id]['components']['cWeight'] = new CWeight( weight );
      this.componentMap['cWeight'][id] = this.entities[id]['components']['cWeight'];
    }
  }
}
