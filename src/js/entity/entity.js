export default class Entity {
  constructor( id, type, parentId = false ) {
    this.id         = id;
    this.type       = type;
    this.parentId   = parentId;
    this.components = {};
    this.systems    = {};
  }

  addComponent( component ) {
    this.components[ component ] = 'component';
  }
}
