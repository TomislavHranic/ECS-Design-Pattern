const sprite = new Image();
sprite.src = '/img/block.png';

export const blockSpritesheet = {
  img: sprite,
  config: {
    width          : 1184,
    height         : 1184,
    animation: {
      0: {
        length: 1,
        row   : 0,
      },
    }
  }
}
