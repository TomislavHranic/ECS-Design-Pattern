import Vec2 from "../class/vec2.js";
import CSprite from "../component/cSprite.js";
import CTransform from "../component/cTransform.js";
import CBoundingBox from "../component/cBoundingBox.js";
import Entity from "./entity.js";
import CInput from "../component/cInput.js";
import CWeight from "../component/cWeight.js";
import CState from "../component/cState.js";
import { playerSpritesheet } from "../spritesheets/player.js";
import { blockSpritesheet } from "../spritesheets/block.js";

export default class EntityManager {
  constructor( game ) {
    this.game              = game;
    this.counter           = 0;
    this.entities          = {};
    this.spritesheets      = {};
    this.entityTypeMap     = {};
    this.componentMap      = {};
    this.systemMap         = {};    // each system holds array of entity ids using it
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

  addPlayer(x = 0.0, y = 0.0, width = 32, height = 32 ) {
    if ( ! this.spritesheets.hasOwnProperty( 'player' ) ) {
      this.spritesheets['player'] = playerSpritesheet;
    }

    const id = this.addEntity('player');

    this.addCTransform(id, x, y);
    this.addCBoundingBox(id, width, height, { left: 0.15, right: 0.15 });
    this.addCWeight(id, 0.2);
    this.addCInput(id);
    this.addCState(id);
    this.addCSprite( id, this.spritesheets.player);

    return id;
  }

  addBlock( x = 0.0, y = 0.0, width = 16, height = 16 ) {
    if ( ! this.spritesheets.hasOwnProperty( 'block' ) ) {
      this.spritesheets['block'] = blockSpritesheet;
    }

    const id = this.addEntity('block');

    this.addCTransform(id, x, y);
    this.addCBoundingBox(id, width, height);
    this.addCSprite(id, this.spritesheets.block);

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

  addCBoundingBox(id, width = 0, height = 0, definedPadding = {} ) {
    if ( ! this.componentMap.hasOwnProperty( 'cBoundingBox' ) ) {
      this.componentMap[ 'cBoundingBox' ] = {};
    }

    const boundingBoxPadding = { top: .5, bottom: .5, left: .5, right: .5 }

    if ( definedPadding.hasOwnProperty('top') ) {
      boundingBoxPadding.top = definedPadding.top;
    }

    if ( definedPadding.hasOwnProperty('bottom') ) {
      boundingBoxPadding.bottom = definedPadding.bottom;
    }

    if ( definedPadding.hasOwnProperty('left') ) {
      boundingBoxPadding.left = definedPadding.left;
    }

    if ( definedPadding.hasOwnProperty('right') ) {
      boundingBoxPadding.right = definedPadding.right;
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cBoundingBox' ) ) {
      this.entities[id]['components']['cBoundingBox'] = new CBoundingBox( width, height, boundingBoxPadding );
      this.componentMap['cBoundingBox'][id] = this.entities[id]['components']['cBoundingBox'];
    }
  }

  addCSprite( id, spritesheetData ) {
    if ( ! this.componentMap.hasOwnProperty( 'cSprite' ) ) {
      this.componentMap[ 'cSprite' ] = {};
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cSprite' ) ) {
      this.entities[id]['components']['cSprite'] = new CSprite( spritesheetData );
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
