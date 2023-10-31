import Vec2 from "../class/vec2.js";

export default class CBoundingBox {
  constructor( p = new Vec2(), w = 0, h = 0 ) {
    this.position = p;
    this.width    = w;
    this.height   = h;
  }
}
