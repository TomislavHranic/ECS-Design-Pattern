export default class Game {
  constructor( width, height ) {
    this.w = width;
    this.h = height;
    this.scene;
  }

  setScene( scene ) {
    this.scene = scene;
  }
}
