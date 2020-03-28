import { rect } from '../dquad/rect';

import Board from './board';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    const mage = rect(0, 0, 16, 32);

    const platform = rect(0, 0, 16, 16);

    let toolbarWidth = width * 0.1;
    const toolbar = rect(width - toolbarWidth, 0, toolbarWidth, height);

    return {
      mage,
      platform,
      toolbar,
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
