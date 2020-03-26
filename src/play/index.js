import { rect } from '../dquad/rect';

import Board from './board';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    const hero = rect(0, 0, 16, 32);

    const platform = rect(0, 0, 16, 16);

    return {
      hero,
      platform,
      width,
      height
    };
  })();

  let board = new Board(this, ctx, bs);


  this.init = data => {
    board.init({});
  };

  this.update = delta => {
    board.update(delta);
  };


  this.render = () => {
    board.render();
  };
  
}
