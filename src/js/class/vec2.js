export default class Vec2 {
  constructor( x = 0.0, y = 0.0 ) {
    this.x = x;
    this.y = y;
  }

  mAdd( v = new Vec2() ) {
    this.x += v.x;
    this.y += v.y;
  }
}
