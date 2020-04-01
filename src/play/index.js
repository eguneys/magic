import Me from './me';

export default function Play(ctx) {

  const { canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    const tileSize = 24;

    return {
      tileSize,
      width,
      height
    };
  })();

  let components = [];

  let me = new Me(this, ctx, bs);

  this.init = data => {

    me.init({});
    components.push(me);
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
