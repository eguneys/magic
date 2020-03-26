import HeroSprite from './herosprite';

import { alwaysOnCondition, onceOnCondition } from './util';

export default function Hero(play, ctx, bs) {

  const { width, height,
          hero: { width: heroWidth, 
                  height: heroHeight } } = bs;


  let dBg = new HeroSprite(this, ctx, bs);

  let magic;

  let bgAdd = onceOnCondition(
    () => { dBg.add(); },
    () => { dBg.remove(); },
    () => magic.hero());

  const moveBg = delta => {
    let rect = magic.heroRect();
    dBg.move(rect.x, rect.y);
  };

  let bgMove = alwaysOnCondition(
    moveBg, () => magic.hero());

  this.init = data => {
    magic = data.magic;

    dBg.init({magic});

  };

  this.update = delta => {

    bgAdd();
    moveBg();

    dBg.update(delta);
  };


  this.render = () => {
    dBg.render();
  };
  
}
