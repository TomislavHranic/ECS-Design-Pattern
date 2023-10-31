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
    if ( this.entityManager.componentMap.hasOwnProperty( 'cInput' ) && this.systems.hasOwnProperty( 'sInputHandler' ) ) {
      for ( let key in this.entityManager.componentMap.cInput ) {
        this.systems.sInputHandler( this.game, this.entityManager.componentMap['cTransform'][key], this.entityManager.componentMap.cWeight[key].weight );
      }
    }

    if ( this.entityManager.componentMap.hasOwnProperty( 'cWeight' ) && this.systems.hasOwnProperty( 'sGravity' ) ) {
      for ( let key in this.entityManager.componentMap.cWeight ) {
        this.systems.sGravity( this.game, this.entityManager.componentMap['cTransform'][key], this.entityManager.componentMap.cWeight[key].weight );
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
