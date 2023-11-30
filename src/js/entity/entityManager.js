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
import { config } from "../config.js";

// Systems
import { sGravity } from "../system/sGravity.js";
import { sInputHandler } from "../system/sInputHandler.js";
import { sRender } from "../system/sRender.js";
import { sMovement } from "../system/sMovement.js";
import { sSpritesheetAnimation } from "../system/sSpritesheetAnimation.js";
import { sCollisionDetection } from "../system/sCollisionDetection.js";
const systems = {
  'sGravity'             : sGravity,
  'sInputHandler'        : sInputHandler,
  'sRender'              : sRender,
  'sMovement'            : sMovement,
  'sSpritesheetAnimation': sSpritesheetAnimation,
  'sCollisionDetection'  : sCollisionDetection,
}

const debug = config.debug;

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
  addEntityX( args = false ) {
    // Bail early if args[object] have not been passed
    if ( this.notArgs( args ) ) {
      if ( debug ) this.errorNotArgs( args );

      return;
    }

    // Bail early if entity[object] is not set
    if ( this.notEntity( args ) ) {
      if ( debug ) this.errorNotEntity( args );

      return;
    }

    // Bail early if entity.type[string] is not set
    if ( this.notEntityType( args ) ) {
      if ( debug ) this.errorNotEntityType( args );

      return;
    }

    // Bail early if it would be a second player added
    if ( this.playerExists( args ) ) {
      if ( debug ) this.errorPlayerExists( args );

      return;
    }

    /**
     * Create entity
     */
    const id = this.counter;

    this.counter++;

    // If entity.alive[boolean] property is not set, assume it's false
    if ( this.notAlive( args ) ) {
      if ( debug ) this.warningNotAlive( args );

      args.entity['alive'] = false;
    }

    // Create and add entity to entities object
    this.entities[ id ] = new Entity( id, args.entity );

    // Create entity map type if it doesn't exist
    if ( this.doesntHaveProperty( this.entityTypeMap, args.entity.type ) ) {
      this.entityTypeMap[ args.entity.type ] = {};
    }

    // Add entity to entity map
    this.entityTypeMap[ args.entity.type ][ id ] = this.entities[ id ];


    /**
     * Attach Transform Component
     *
     * Entity positioning is determined by centerpoint transform.position[Vec2], transform.width[number] and transform.height[number].
     * However, minimal number of args to determine entity's transform and position are either:
     *  - centerpoint transform.position[Vec2], transform.width[number] and transform.height[number], or
     *  - tranform.from[Vec2] and transform.to[Vec2] rectangle, from which centerpoint, width and height can be derived.
     * From-to, if defined, will override position-width-height.
     * If both minimal number of args conditions are not satisfied transform will not be added.
     */
    if ( this.hasTransform( args ) && ( this.isTransformPWH( args ) || this.isTransformFT( args ) ) ) {
      if ( this.isTransformFT( args ) ) {
        // Derive position, width and height
        args.transform['position'] = new Vec2(
          ( args.transform.from.x + args.transform.to.x ) / 2,
          ( args.transform.from.y + args.transform.to.y ) / 2,
        );

        args.transform['width']  = Math.abs( args.transform.from.x - args.transform.to.x );
        args.transform['height'] = Math.abs( args.transform.from.y - args.transform.to.y );

        if ( debug ) this.infoTransformPWHDerived( [ this.entities[id], args.transform ] );
      }

      // Create component map type if it doesn't exist
      if ( this.doesntHaveProperty( this.componentMap, 'cTransform' ) ) {
        this.componentMap[ 'cTransform' ] = {};
      }

      // Check if transform.rotation[number] is set, if not: set it as defaultTransformRotation
      if ( this.notTransformRotation( args ) ) {
        if ( debug ) this.warningNotTransformRotation( [ this.entities[id], args.transform ]);

        args.transform['rotation'] = config.defaultTransformRotation;
      }

      // Check if transform.velocity[Vec2] is set, if not: set it to (0,0)
      if ( this.notTransformVelocity( args ) ) {
        if ( debug ) this.warningNotTransformVelocity( [ this.entities[id], args.transform ] );

        args.velocity = new Vec2();
      }

      this.entities[id]['components']['cTransform'] = new CTransform( args.transform );
      this.componentMap['cTransform'][id] = this.entities[id]['components']['cTransform'];

      if ( debug ) this.infoTransformAttached( this.entities[id] );
    } else if ( debug && this.hasTransform( args ) ) {
      this.errorTransformUnderdefined( [ this.entities[id], args.transform ] );
    }

    /**
     * Attach Sprite Component
     */
    if ( ! this.spritesheets.hasOwnProperty( 'block' ) ) {
      this.spritesheets['block'] = blockSpritesheet;
    }

    this.addCSprite(id, this.spritesheets.block);

    /**
     * Attach components' dependent systems
     */
    if ( args.hasOwnProperty('systems') ) {
      for ( let i = 0; i < args.systems.length; i++ ) {
        if ( ! this.game.scene.systems.hasOwnProperty( args.systems[i] ) ) {
          this.game.scene.systems[ args.systems[ i ] ] = systems[ args.systems[ i ] ];
        }
        if ( ! this.systemMap.hasOwnProperty( args.systems[i] ) ) {
          this.systemMap[ args.systems[i] ] = [];
        }
        this.systemMap[ args.systems[i] ].push(id)
      }
    }
  }

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
    this.addCSprite(id, this.spritesheets.block);

    return id;
  }

  // Components
  addCTransform(id, x = 0.0, y = 0.0, vx = 0.0, vy = 0.0 ) {
    if ( ! this.componentMap.hasOwnProperty( 'cTransform' ) ) {
      this.componentMap[ 'cTransform' ] = {};
    }

    const args = {
      position: new Vec2( x, y ),
      velocity: new Vec2( vx, vy ),
      width: 100,
      height: 100,
      rotation: 0,
    }

    if ( ! this.entities[id].components.hasOwnProperty( 'cTransform' ) ) {
      this.entities[id]['components']['cTransform'] = new CTransform( args );
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

  // Helper functions
  doesntHaveProperty( who, property ) { return ( ! who.hasOwnProperty( property ) ) }
  hasTransform( args ) { return ( args.hasOwnProperty('transform') && args.transform && typeof args.transform === 'object' ) }
  isTransformFT( args ) { return ( args.transform.hasOwnProperty('from') && typeof args.transform.from === 'object' && args.transform.from.constructor.name === 'Vec2' && args.transform.hasOwnProperty('to') && typeof args.transform.to === 'object' && args.transform.to.constructor.name === 'Vec2' ) }
  isTransformPWH( args ) {
    console.log(args.transform.position.constructor.name);
    return ( args.transform.hasOwnProperty('position') && typeof args.transform.position === 'object' && args.transform.position.constructor.name === 'Vec2' && args.transform.hasOwnProperty('width') && typeof args.transform.width === 'number' && args.transform.hasOwnProperty('height') && typeof args.transform.height === 'number' ) }
  notAlive( args ) { return ( ! args.entity.hasOwnProperty('alive') || typeof args.entity.alive !== 'boolean' ) }
  notArgs( args ) { return ( ! args || typeof args !== 'object' ) }
  notEntity( args) { return ( ! args.hasOwnProperty( 'entity' ) || ! args.entity || typeof args.entity !== 'object' ) }
  notEntityType( args ) { return ( ! args.entity.hasOwnProperty( 'type' ) || ! args.entity.type || typeof args.entity.type !== 'string' ) }
  notTransformRotation( args ) { return ( ! args.transform.hasOwnProperty('rotation') || typeof args.transform.rotation !== 'number' ) }
  notTransformVelocity( args ) { return ( ! args.transform.hasOwnProperty('velocity') || typeof args.transform.velocity !== 'object' && args.transform.velocity.constructor.name === 'Vec2' )}
  playerExists( args ) { return ( args.entity.type === 'player' && this.entityTypeMap.hasOwnProperty( args.type ) ) }

  // Errors
  errorNotArgs( args ) { console.error('\'args\' have not been passed, or are not of type \'object\'. Entity was not created.\n', args) }
  errorNotEntity( args ) { console.error('\'entity\' property is not of type \'object\', is an empty object or is not defined. Entity was not created.\n', args) }
  errorNotEntityType( args ) { console.error('\'entity.type\' property is not of type \'string\', is an empty string or is not defined. Entity was not created.\n', args) }
  errorPlayerExists( args ) { console.error('Entity of type \'' + args.entity.type + '\' already exists. Cannot add another entity of type \'' + args.entity.type + '\'. Entity was not created.\n', args) }
  errorTransformUnderdefined( args ) { console.error('Transform underdefined. Missing one or more of minimum property values, eiher position-width-height, or from-to. Attaching Transform component to entity failed.\n', args) }

  // Warnings
  warningNotAlive( args ) { console.warn( '\'entity.alive\' property is not of type \'boolean\' or is not defined. \'entity.alive\' property will be set to \'false\'.\n', args ) }
  warningNotTransformRotation( args ) { console.warn( '\'transform.rotation\' property is not of type \'number\' or is not defined. \'transform.rotation\' property will be set to \'defaultTransformRotation\': ' + config.defaultTransformRotation + '.\n', args ) }
  warningNotTransformVelocity( args ) { console.warn( '\'transform.velocity\' property is not of type \'Vec2\' or is not defined. \'transform.velocity\' property will be set to (0, 0)[Vec2].\n', args ) }

  // Info
  infoTransformAttached( args ) { console.info( 'Transform component attached to entity.\n', args ) }
  infoTransformPWHDerived( args) { console.info( 'Transform position, width and height are derived from \'transform.from-transform.to\' rectangle.\n', args ) }
}
