export default class Entity {
  constructor( id, args ) {
    this.id         = id;
    this.type       = args.type;
    //this.parentId   = 0;
    this.components = {};
    this.alive      = args.alive;
  }
}
