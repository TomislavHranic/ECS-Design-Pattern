import { states } from "../config.js";

const smoothFactor = .29;
const jumpFactor = 5.5;
const velocity = 1.2;


export const hState = ( entity, newState ) => {
  if ( entity.components.cState.value === states.STAND_LEFT ) {
    if ( newState === 'noKeysPressed' && entity.components.cTransform.velocity.x !== 0 ) {
      accelerate(entity, 0);

      return;
    }

    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_LEFT;

      return;
    }

    if ( newState === 'left' ) {
      entity.components.cState.value = states.WALK_LEFT;

      return;
    }

    if ( newState === 'right' ) {
      entity.components.cState.value = states.STAND_RIGHT;

      return;
    }

    if ( newState === 'up' ) {
      entity.components.cTransform.velocity.y = -jumpFactor;
      entity.components.cState.value = states.JUMP_LEFT;
    }

    return;
  }



  if ( entity.components.cState.value === states.STAND_RIGHT ) {
    if ( newState === 'noKeysPressed' && entity.components.cTransform.velocity.x !== 0 ) {
      accelerate(entity, 0);

      return;
    }

    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_RIGHT;

      return;
    }

    if ( newState === 'right' ) {
      entity.components.cState.value = states.WALK_RIGHT;

      return;
    }

    if ( newState === 'left' ) {
      entity.components.cState.value = states.STAND_LEFT;

      return;
    }

    if ( newState === 'up' ) {
      entity.components.cTransform.velocity.y = -jumpFactor;
      entity.components.cState.value = states.JUMP_RIGHT;
    }

    return;
  }



  if ( entity.components.cState.value === states.WALK_LEFT ) {
    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_LEFT;

      return;
    }

    if ( newState === 'left' ) {
      accelerate(entity, -velocity);

      return;
    }


    if ( newState === 'right' ) {
      entity.components.cState.value = states.STAND_RIGHT;

      return;
    }

    if ( newState === 'up' ) {
      entity.components.cTransform.velocity.y = -jumpFactor;
      entity.components.cState.value = states.JUMP_LEFT;

      return;
    }

    if ( newState === 'noKeysPressed' ) {
      entity.components.cState.value = states.STAND_LEFT;
    }

    return;
  }



  if ( entity.components.cState.value === states.WALK_RIGHT ) {
    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_RIGHT;

      return;
    }

    if ( newState === 'right' ) {
      accelerate(entity, velocity);

      return;
    }

    if ( newState === 'left' ) {
      entity.components.cState.value = states.STAND_LEFT;

      return;
    }

    if ( newState === 'up' ) {
      entity.components.cTransform.velocity.y = -jumpFactor;
      entity.components.cState.value = states.JUMP_RIGHT;

      return;
    }

    if ( newState === 'noKeysPressed' ) {
      entity.components.cState.value = states.STAND_RIGHT;
    }

    return;
  }



  if ( entity.components.cState.value === states.JUMP_LEFT ) {
    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_LEFT;

      return;
    }

    if ( newState === 'left' ) {
      accelerate(entity, -velocity);

      return;
    }

    if ( newState === 'right' ) {
      entity.components.cState.value = states.JUMP_RIGHT;
    }

    return;
  }

  if ( entity.components.cState.value === states.JUMP_RIGHT ) {
    if ( entity.components.cTransform.velocity.y > 0 ) {
      entity.components.cState.value = states.FALL_RIGHT;

      return;
    }

    if ( newState === 'right' ) {
      accelerate(entity, velocity);

      return;
    }

    if ( newState === 'left' ) {
      entity.components.cState.value = states.JUMP_LEFT;
    }

    return;
  }

  if ( entity.components.cState.value === states.FALL_LEFT ) {
    if ( newState === 'left' ) {
      accelerate(entity, -velocity);

      return;
    }

    if ( newState === 'right' ) {
      entity.components.cState.value = states.FALL_RIGHT;

      return;
    }

    if ( newState === 'stopFall' ) {
      entity.components.cTransform.velocity.y = 0;
      entity.components.cState.value = states.STAND_LEFT;
    }

    return;
  }

  if ( entity.components.cState.value === states.FALL_RIGHT ) {
    if ( newState === 'right' ) {
      accelerate(entity, velocity);

      return;
    }

    if ( newState === 'left' ) {
      entity.components.cState.value = states.FALL_LEFT;

      return;
    }

    if ( newState === 'stopFall' ) {
      entity.components.cTransform.velocity.y = 0;
      entity.components.cState.value = states.STAND_RIGHT;
    }

    return;
  }
}


function accelerate(entity, velocity) {
  if ( entity.components.cTransform.velocity.x < velocity && entity.components.cTransform.velocity.x + smoothFactor <= velocity ) {
    entity.components.cTransform.velocity.x += smoothFactor;

    return;
  }

  if ( entity.components.cTransform.velocity.x > velocity && entity.components.cTransform.velocity.x - smoothFactor >= velocity ) {
    entity.components.cTransform.velocity.x -= smoothFactor;

    return;
  }

  entity.components.cTransform.velocity.x = velocity;
}
