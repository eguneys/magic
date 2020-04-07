import MagicPool from '../magicpool';

import MagicSprite from './magicsprite';

export default function Mages(play, ctx, bs) {

  const { frames, layers: { threeLayer } } = ctx;

  let dPs = new MagicPool(() => {
    let local = {
      x: 0, y: 0,
      width: bs.mage.width,
      height: bs.mage.height
    };

    return new MagicSprite(play, ctx, { ...bs, local }, 
                           frames['mage']);
  });

  let magic;

  this.init = data => {
    magic = data.magic;
  };

  this.update = delta => {
    magic.eachMage(({ id, bounds }) => {
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
