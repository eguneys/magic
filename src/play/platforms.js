import HeroSprite from './herosprite';
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
    magic.eachPlatform(({ id, r }) => {
      let dP = getDp(id);
      dP.move(r.x, r.y);
    });
  };


  this.render = () => {
    
  };
  
}

function Platform(play, ctx, bs) {

  let dS = new HeroSprite(this, ctx, bs);

  this.init = data => {
    this.id = data.id;
    dS.init({ x: 0, y: 0 });
    dS.add();
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
