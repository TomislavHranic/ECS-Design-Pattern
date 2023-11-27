export default class Entity {
  constructor( id, type, parentId = null ) {
    this.id         = id;
    this.type       = type;
    this.parentId   = parentId;
    this.components = {};
    this.alive      = true;
  }
}
