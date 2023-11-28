import Game from "./game.js";

const start = document.getElementById('start');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { willReadFrequently: true } );

canvas.height = 240;
canvas.width = Math.floor(240*16/9);

const game = new Game( ctx, canvas.width, canvas.height );
game.setScene( 'intro' );

let lastTime = 0;

start.addEventListener( 'click', () => {
  if ( game.scene ) {

    function gameLoop(timestamp) {
      const deltaTime = timestamp - lastTime;
      lastTime = timestamp;

      ctx.clearRect( 0, 0, canvas.width, canvas.height );

      // Update
      game.deltaTime = deltaTime;
      game.update();  // update the game;

      requestAnimationFrame(gameLoop);
    }

    gameLoop(0);
  }
});
