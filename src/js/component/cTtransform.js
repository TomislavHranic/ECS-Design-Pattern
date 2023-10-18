import Vec2 from "../class/vec2.js";

export default class CTransform {
  constructor( p = new Vec2(), v = new Vec2 ) {
    this.position = p;
    this.velocity = v;
  }
}
