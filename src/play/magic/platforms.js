import MagicPool from '../magicpool';

import MagicSprite from './magicsprite';

export default function Platforms(play, ctx, bs) {

  const { frames, layers: { threeLayer } } = ctx;

  let dPs = new MagicPool(() => {
    let local = {
      x: 0, y: 0,
      width: bs.platform.width,
      height: bs.platform.height
    };

    return new MagicSprite(play, ctx, { ...bs, local }, 
                           frames['platform']);
  });

  let magic;

  this.init = data => {
    magic = data.magic;
  };

  this.update = delta => {
    magic.eachPlatform(({ id, bounds }) => {
      let dP = dPs.getOrAcquire(id, _ => {
        _.init({});
        _.add(threeLayer);
      });


      dP.move(bounds.x, bounds.y);
    });

    dPs.each(_ => _.update(delta));
  };


  this.render = () => {
    dPs.each(_ => _.render());
  };
  
}
