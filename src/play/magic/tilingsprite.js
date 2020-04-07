import Pool from 'poolf';
import MagicSprite from './magicsprite';

export default function TilingSprite(play, ctx, bs, frame) {

  const { layers: { oneLayer } } = ctx;

  let { x, y, tileWidth, tileHeight, alpha, width } = bs.local;

  let nbTiles = Math.ceil(width / tileWidth);

  let bg = new Pool(() => {
    return new MagicSprite(play, ctx, { bs, local: {
      alpha,
      width: tileWidth,
      height: tileHeight
    } }, frame);
  });

  let tileX;

  this.init = data => {
    tileX = 0;
    for (let i = 0; i < nbTiles + 1; i++) {
      bg.acquire(_ => {
        _.init({i});
        _.add(oneLayer);
      });
    }
  };

  this.tileX = (x) => tileX += x;

  this.update = delta => {
    bg.each(_ => {
      let { i } = _.data();
      const scrollWidth = width + tileWidth;
      let x = (tileX + i * tileWidth) % scrollWidth;
      if (x < 0) {
        x += scrollWidth;
      }
      if (x > width) {
        x -= scrollWidth;
      }
      _.move(x, 0);
      _.update(delta);
    });
  };


  this.render = () => {
    bg.each(_ => _.render());
  };
  
}
