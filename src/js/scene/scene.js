import EntityManager from "../entity/entityManager.js";

export default class Scene {
  constructor( game, sceneName ) {
    this.sceneName     = sceneName;
    this.game          = game;
    this.systems       = {};
    this.entityManager = new EntityManager( this.game );
  }

  init() {
    this.entityManager.addPlayer(50, 50);
  }

  update() {
    if ( this.entityManager.componentMap.hasOwnProperty( 'cTransform' ) && this.systems.hasOwnProperty( 'sPhysics' ) ) {
      for ( let key in this.entityManager.componentMap.cTransform ) {
        this.systems.sPhysics( this.entityManager.componentMap.cTransform[key] );
      }
    }
  }

  render() {
    if ( this.entityManager.componentMap.hasOwnProperty( 'cTransform' ) && this.systems.hasOwnProperty( 'sRender' ) ) {
      for ( let key in this.entityManager.componentMap.cTransform ) {
        this.systems.sRender( this.game.ctx, this.entityManager.componentMap.cTransform[key] );
      }
    }
  }
}
