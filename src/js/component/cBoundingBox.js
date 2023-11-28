import Vec2 from "../class/vec2.js";

export default class CBoundingBox {
  constructor( w = 0, h = 0, boundingBoxPadding, previousPosition = new Vec2() ) {
    this.width    = w;
    this.height   = h;
    this.previousPosition = previousPosition;
    this.boundingBoxPadding = boundingBoxPadding;
  }
}
