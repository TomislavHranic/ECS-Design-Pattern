const sprite = new Image();
sprite.src = '/img/spritesheet.png';

export const playerSpritesheet = {
  img: sprite,
  config: {
    width          : 200,
    height         : 181.833333333,
    animation: {
      0: { // STAND_LEFT
        length: 7,
        row   : 1,
      },
      1: { // STAND_RIGHT
        length: 7,
        row   : 0,
      },
      2: { // JUMP_LEFT
        length: 7,
        row   : 3,
      },
      3: { // JUMP_RIGHT
        length: 7,
        row   : 2,
      },
      4: { // CROUCH_LEFT
        length: 5,
        row   : 9,
      },
      5: { // CROUCH_RIGHT
        length: 5,
        row   : 8,
      },
      6: { // FALL_LEFT
        length: 7,
        row   : 5,
      },
      7: { // FALL_RIGHT
        length: 7,
        row   : 4,
      },
      8: { // WALK_LEFT
        length: 9,
        row: 7,
      },
      9: { // WALK_RIGHT
        length: 9,
        row: 6,
      }
    }
  }
}
