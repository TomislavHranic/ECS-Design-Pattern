export default class CSprite {
  constructor( spritesheetData ) {
    this.spritesheetData       = spritesheetData;
    this.width                 = this.spritesheetData.config.width;
    this.height                = this.spritesheetData.config.height;
    this.animation             = this.spritesheetData.config.animation;
    this.currentAnimationState = 0;
    this.currentLength         = this.spritesheetData.config.animation[0].length;
    this.currentRow            = this.spritesheetData.config.animation[0].row;
    this.currentFrame          = 0;
    this.frameInterval         = 1000/30;
    this.frameTimer            = 0;
  }
}
