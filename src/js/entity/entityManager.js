import CSprite from "../component/cSprite.js";
import Entity from "./entity.js";

export default class EntityManager {
  constructor() {
    this.counter      = 0;
    this.entities     = {};
    this.entityTypeMap    = {};
    this.componentMap = {};
  }

  addEntity( type ) {
    this.entities[ this.counter ] = new Entity( this.counter, type );

    if ( ! this.entityTypeMap.hasOwnProperty( type ) ) {
      this.entityTypeMap[ type ] = {};
    }
    this.entityTypeMap[ type ][ this.counter ] = this.entities[ this.counter ];

    return this.counter++;
  }

  // Components
  addCSprite( entityId, spritesheet ) {
    this.entities[ entityId ].components[ 'CSprite' ] = new CSprite()
  }
}
