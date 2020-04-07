import MagicSprite from './magicsprite';
import Pool from 'poolf';


export default function MagePool(play, ctx, bs) {
  
  let magic;

  let pool = new Pool(() => new Mage(this, ctx, bs));

  this.init = data => {
    magic = data.magic;
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

    magic.eachMage((handle) => {
      let { item, r } = handle;
      let { id } = item;
      let dP = getDp(id);
      dP.move(r.x, r.y);
    });
    pool.each(_ => _.update(delta));
  };


  this.render = () => {
    pool.each(_ => _.render());
  };

};


export function Mage(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  const { width, height,
          mage: { width: mageWidth,
                  height: mageHeight } } = bs;

  let dSBounds = { x: 0, y: 0,
                   width: mageWidth,
                   height: mageHeight };

  let dBg = new MagicSprite(this, ctx, { local: dSBounds, ...bs },
                            frames['mage']);

  let magic;

  this.init = data => {
    this.id = data.id;
    magic = data.magic;

    dBg.init({});
    dBg.add(oneLayer);
  };

  this.move = (x, y) => {
    dBg.move(x, y);
  };

  this.update = delta => {
    dBg.update(delta);
  };


  this.render = () => {
    dBg.render();
  };
  
}
