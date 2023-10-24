import Game from "./game.js";

const start = document.getElementById('start');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { willReadFrequently: true } );

canvas.height = 240;
canvas.width = Math.floor(240*16/9);

const game = new Game( ctx, canvas.width, canvas.height );
game.setScene( 'intro' );

let frameCount = 0;

start.addEventListener( 'click', () => {
  function gameLoop() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    // Update
    if ( false ) {
      frameCount++;
    } else {
      frameCount = 0;
      game.scene.entityManager.update(); // add/remove entities;
      game.scene.update();               // update the game;
    }

    // Render
    game.scene.render();

    requestAnimationFrame(gameLoop);
  }

  gameLoop();
});
