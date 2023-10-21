import Game from "./game.js";
import Scene01 from "./scene/scene01.js";

const start = document.getElementById('start');
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d', { willReadFrequently: true } );

canvas.height = 240;
canvas.width = Math.floor(240*16/9);

const game = new Game( canvas.width, canvas.height );
game.setScene( new Scene01() )

start.addEventListener( 'click', () => {
  function animate() {
    ctx.clearRect( 0, 0, canvas.width, canvas.height );

    console.log(game);

    // requestAnimationFrame(animate);
  }

  animate();
});
