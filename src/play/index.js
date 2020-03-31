import { rect } from '../dquad/rect';

import Canabalt from './canabalt';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;


    return {
      width,
      height
    };
  })();

  let canabalt = new Canabalt(this, ctx, bs);


  this.init = data => {
    canabalt.init({});
  };

  this.update = delta => {
    canabalt.update(delta);
  };


  this.render = () => {
    canabalt.render();
  };
  
}
