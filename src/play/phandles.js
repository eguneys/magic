import MagicSprite from './magicsprite';
import Pool from 'poolf';

export default function PHandles(play, ctx, bs) {

  let magic,
      maker;

  let pool = new Pool(() => new PHandle(this, ctx, bs));

  this.init = data => {
    magic = data.magic;
    maker = data.maker;
  };

  const getDp = (id) => {
    let dP = pool.find(_ => _.id === id);

    if (!dP) {
      dP = pool.acquire(_ => _.init({
        id
      }));
    }
    return dP;
  };

  this.update = delta => {
    maker.eachHandle(({ item, r }) => {
      let { id, highlight } = item;

      let dP = getDp(id);

      dP.move(r.x, r.y);

      // if (highlight) {
      //   dP.visible(true);
      // } else {
      //   dP.visible(false);
      // }
      item.highlight = false;
    });
    pool.each(_ => _.update(delta));
  };


  this.render = () => {
    pool.each(_ => _.render());
  };
  
}

function PHandle(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  const { platform: { width: platformWidth,
                      height: platformHeight } } = bs;

  let dS = new MagicSprite(this, ctx, bs);

  this.init = data => {
    this.id = data.id;
    dS.init({ x: 0, y: 0, 
              width: platformWidth,
              height: platformHeight,
              frame: frames['phandle'] });
    dS.add();
  };

  this.visible = dS.visible;
  
  this.move = (x, y) => {
    dS.move(x, y);
  };

  this.update = delta => {
    dS.update(delta);
  };


  this.render = () => {
    dS.render();
  };
  
}
