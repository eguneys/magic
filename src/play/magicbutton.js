import { tapHandler } from './util';
import MagicSprite from './magicsprite';

export default function MagicButton(play, ctx, bs) {

  const { events } = ctx;

  let bounds = {
    x: bs.x,
    y: bs.y,
    width: bs.width,
    height: bs.height
  };

  let dUpgrade = new MagicSprite(this, ctx, {
    ...bounds,
    frame: bs.frame
  });

  let dLogo;

  if (bs.icon) {
    dLogo = new MagicSprite(this, ctx, {
      x: bs.x + bs.width * 0.25,
      y: bs.y,
      width: bs.width * 0.5,
      height: bs.height,
      frame: bs.icon
    });
  }

  let components = [];

  this.init = data => {
    dUpgrade.init({});
    components.push(dUpgrade);

    if (dLogo) {
      dLogo.init({});
      components.push(dLogo);
    }
  };

  this.add = layer => {
    dUpgrade.add(layer);
    dLogo && dLogo.add(layer);
  };

  this.remove = () => {
    dUpgrade.remove();
    dLogo && dLogo.remove();
  };

  const handleTap = tapHandler(events, bounds, bs.onClick);

  this.update = delta => {
    handleTap();
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
