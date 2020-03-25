import { rect } from '../dquad/rect';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    let candy = rect(
      0, 0,
      32,
      32
    );

    return {
      width,
      height,
      bulletWidth: 32,
      candy
    };
  })();


  this.init = data => {

  };

  this.update = delta => {

  };


  this.render = () => {

  };
  
}
