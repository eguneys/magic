import HeroSprite from './herosprite';

import { onceOnCondition } from './util';

export default function HeroMove(play, ctx, bs) {

  const { events } = ctx;

  const { width, height,
          hero: { width: heroWidth, 
                  height: heroHeight } } = bs;


  let dBg = new HeroSprite(this, ctx, bs);

  let magic,
      maker;

  let bgAdd = onceOnCondition(
    () => { dBg.add(); },
    () => { dBg.remove(); },
    () => maker.putHero());

  this.init = data => {
    magic = data.magic;
    maker = data.maker;

    dBg.init({ x: 0, y: 0 });

  };

  const handleMouse = () => {
    const { epos } = events.data;

    console.log(epos);
  };

  this.update = delta => {
    handleMouse();

    bgAdd();
    dBg.update(delta);
  };


  this.render = () => {
    dBg.render();
  };
  
}
