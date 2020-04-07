import MagicSprite from './magicsprite';
import MagicNumber from './magicnumber';

import ipol from '../ipol';

export default function TapIncrement(play, ctx, bs) {

  const { frames, layers: { twoLayer } } = ctx;

  let size = 20;

  let plusOffsetX = -size * 1.2,
      plusOffsetY = size * 0.5;

  const yOffset = size * 6;

  let dPlus = new MagicSprite(this, ctx, {
    x: 0,
    y: 0,
    width: size,
    height: size,
    frame: frames['qPlus']
  });

  let dScore = new MagicNumber(this, ctx, {
    x: 0,
    y: 0,
    size
  });

  let iLife = new ipol(0, 0, {});

  let x, y, tap;
  
  this.init = data => {
    x = data.x;
    y = data.y;
    tap = data.tap;

    iLife.both(0, 1);

    dScore.setNumber(tap);
    dScore.add(twoLayer);

    dPlus.add(twoLayer);
  };

  const releaseMe = () => {
    dPlus.remove();
    dScore.remove();

    play.releaseIncrement(this);
  };

  this.update = delta => {
    iLife.update(delta * 0.002);
    dScore.update();
    dPlus.update();

    if (iLife.settled()) {
      releaseMe();
    }
  };


  this.render = () => {
    let iValue = iLife.value();

    let offY = iValue * yOffset;
    let alpha = 1.0 - (iValue>0.6?iValue:0.0);

    dScore.move(x, y - offY);
    dScore.alpha(alpha);

    dPlus.move(x + plusOffsetX, plusOffsetY + y - offY);
    dPlus.alpha(alpha);

    dScore.render();
    dPlus.render();
  };
  
}
