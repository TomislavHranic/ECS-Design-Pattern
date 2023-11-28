import ExampleScene1 from "../scene/0example1.js"
import ExampleScene2 from "../scene/0example2.js";

export const sSceneSwitcher = (game, sceneName) => {
  switch (sceneName) {
    case 'example1':
      return new ExampleScene1( game, sceneName );
    case 'example2':
      return new ExampleScene2( game, sceneName );
    default:
      break;
  }
}
