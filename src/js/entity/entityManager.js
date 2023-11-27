import Vec2 from "../class/vec2.js";
import CSprite from "../component/cSprite.js";
import CTransform from "../component/cTransform.js";
import CBoundingBox from "../component/cBoundingBox.js";
import Entity from "./entity.js";
import CInput from "../component/cInput.js";
import CWeight from "../component/cWeight.js";
import CState from "../component/cState.js";

export default class EntityManager {
  constructor( game ) {
    this.game              = game;
    this.counter           = 0;
    this.entities          = {};
    this.entityTypeMap     = {};
    this.componentMap      = {};
    this.systemMap         = {}; // each system holds array of entity ids using it
    this.entitiesToAdd     = [];
    this.entityIdsToRemove = [];
  }

  // Entities
  addEntity( type ) {
    const entityId = this.counter;
    this.entities[ entityId ] = new Entity( entityId, type );

    if ( ! this.entityTypeMap.hasOwnProperty( type ) ) {
      this.entityTypeMap[ type ] = {};
    }
    this.entityTypeMap[ type ][ entityId ] = this.entities[ entityId ];

    this.counter++;

    return entityId;
  }

  addPlayer(x = 0.0, y = 0.0, systems = {} ) {
    const width = 50;
    const height = 50;
    const id = this.addEntity('player');
    this.addCTransform(id, x, y);
    this.addCBoundingBox(id, x, y, width, height);
    this.addCWeight(id, 0.2);
    this.addCInput(id);
    this.addCState(id);
    return id;
  }

  // Components
  addCTransform(id, x = 0.0, y = 0.0, vx = 0.0, vy = 0.0 ) {
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

  addCState( id ) {
    if ( ! this.componentMap.hasOwnProperty( 'cState' ) ) {
      this.componentMap[ 'cState' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cState' ) ) {
      this.entities[id]['components']['cState'] = new CState();
      this.componentMap['cState'][id] = this.entities[id]['components']['cState'];
    }
  }
}
