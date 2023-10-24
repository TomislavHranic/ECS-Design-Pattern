export default class Entity {
  constructor( id, type, parentId = false ) {
    this.id         = id;
    this.type       = type;
    this.parentId   = parentId;
    this.components = {};
    this.systems    = {};
    this.alive      = true;
  }
}
