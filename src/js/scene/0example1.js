import Scene from "../class/scene.js";

export default class ExampleScene1 extends Scene {
  constructor( game , sceneName ) {
    super( game, sceneName );
  }

  init() {
    this.addSystem( 'sGravity' );
    this.addSystem( 'sInputHandler' );
    this.addSystem( 'sMovement' );
    this.addSystem( 'sCollisionDetection');
    this.addSystem( 'sSpritesheetAnimation' );
    this.addSystem( 'sRender' );
    const player = this.entityManager.addPlayer(50, 50);
    this.mapEntitiesToSystems(player, [ 'sGravity', 'sMovement', 'sCollisionDetection', 'sInputHandler', 'sSpritesheetAnimation' ]);

    let block = this.entityManager.addBlock(5*16, 150);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(6*16, 150);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(7*16, 150);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(8*16, 150);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(9*16, 150);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);

    //floor
    block = this.entityManager.addBlock(0*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(1*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(2*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(3*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(4*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(5*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(6*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(7*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(8*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);
    block = this.entityManager.addBlock(9*16, 220);
    this.mapEntitiesToSystems(block, ['sRender', 'sSpritesheetAnimation', 'sCollisionDetection']);

    this.mapEntitiesToSystems(player, [ 'sRender' ] );
  }
}
