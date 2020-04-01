import { callMaybe } from '../util';
import Maker from './maker';
import { rect } from '../dquad/geometry';

export default function Play(ctx) {

  const { config,
          canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    const tileSize = 24;

    let toolbar = rect(5, 5,
                       width,
                       tileSize);

    let palette = rect(0,
                       toolbar.y1,
                       tileSize * 2 + 10,
                       height);

    let me = rect(
      palette.x1,
      palette.y,
      tileSize * 2 + 10,
      height);

    return {
      tileSize,
      toolbar,
      me,
      palette,
      width,
      height
    };
  })();

  let components = [];

  let maker = new Maker(this, ctx, bs);

  const maybeLoad = callMaybe(config.events.onLoad);

  this.init = data => {
    maker.init({});
    components.push(maker);

    maybeLoad();
  };

  this.load = maker.load;

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
