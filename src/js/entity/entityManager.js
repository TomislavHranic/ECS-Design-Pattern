import Entity from "./entity.js";

export default class EntityManager {
  constructor() {
    this.counter   = 0;
    this.entities  = {};
    this.entityMap = {};
  }

  addEntity( type ) {
    this.entities[ this.counter ] = new Entity( this.counter, type );
    if ( ! this.entityMap.hasOwnProperty( type ) ) {
      this.entityMap[ type ] = [];
    }

    this.entityMap[ type ].push( this.entities[ this.counter ] );

    console.log(this.entities);
    console.log(this.entityMap);

    return this.entities[ this.counter++ ];
  }
}
