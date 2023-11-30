import Scene from "../class/scene.js";
import Vec2 from "../class/vec2.js";

export default class ExampleScene1 extends Scene {
  constructor( game , sceneName ) {
    super( game, sceneName );
  }

  init() {
    // this.addSystem( 'sGravity' );
    // this.addSystem( 'sInputHandler' );
    // this.addSystem( 'sMovement' );
    // this.addSystem( 'sCollisionDetection');
    // this.addSystem( 'sSpritesheetAnimation' );
    // this.addSystem( 'sRender' );
    // let entity = this.entityManager.addPlayer(50, 50);
    // let player = entity;
    // this.mapEntitiesToSystems(entity, [ 'sGravity', 'sCollisionDetection', 'sMovement', 'sInputHandler', 'sSpritesheetAnimation' ]);

    this.entityManager.addEntityX({
      entity: {
        type: 'block',
        alive: true,
      },
      transform: {
        position: new Vec2( 250.0, 150.0 ),
        velocity: new Vec2(  -1.0,   0.0 ),
        width   : 16,
        height  : 16,
      },
      sprite: {
        sprite: 'block',
      },
      systems: [
        'sSpritesheetAnimation',
        'sRender',
      ],
    });

    // entity = this.entityManager.addBlock(5*16, 150);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(6*16, 150);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(7*16, 150);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(8*16, 150);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(9*16, 150);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);

    // //floor
    // entity = this.entityManager.addBlock(0*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(1*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(2*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(3*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(4*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(5*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(6*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(7*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(8*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);
    // entity = this.entityManager.addBlock(9*16, 220);
    // this.mapEntitiesToSystems(entity, ['sRender', 'sSpritesheetAnimation']);

    // this.mapEntitiesToSystems(player, [ 'sRender' ] );
  }
}
