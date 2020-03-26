import MagicSprite from './magicsprite';
import Pool from 'poolf';

export default function Platforms(play, ctx, bs) {

  let magic;

  let pool = new Pool(() => new Platform(this, ctx, bs));

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

    magic.eachPlatform((handle) => {
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
  
}

function Platform(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  const { platform: { width: platformWidth,
                      height: platformHeight } } = bs;

  let dSBounds = { x: 0, y: 0, 
                   width: platformWidth,
                   height: platformHeight };

  let dS = new MagicSprite(this, ctx, 
                           { local: dSBounds, ...bs }, 
                           frames['platform']);

  this.init = data => {
    this.id = data.id;
    dS.init({});
    dS.add(oneLayer);
  };
  
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
