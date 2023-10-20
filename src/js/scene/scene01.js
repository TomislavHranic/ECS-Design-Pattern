import EntityManager from "../entity/entityManager.js";

export default class Scene {
  constructor() {
    this.entityManager = new EntityManager();
    this.systems       = {};

    this.init();
  }

  init() {
    this.entityManager.addEntity( 'player' );
  }
}
