import MagicSprite from './magicsprite';
import MagicButton from './magicbutton';
import Magic9 from './magic9';
import ipol from '../ipol';

export default function TapUpgrade(play, ctx, bs) {

  const { frames, layers: { threeLayer } } = ctx;

  let bg = new Magic9(this, ctx, {
    x: bs.menu.x,
    y: bs.menu.y,
    width: bs.menu.width,
    height: bs.menu.height,
    tileWidth: bs.menuClose.width,
    frames: frames['menubg9']
  });

  let dClose = new MagicButton(this, ctx, {
    x: bs.menuClose.x,
    y: bs.menuClose.y,
    width: bs.menuClose.width,
    height: bs.menuClose.height,
    frame: frames['menuclose'],
    onClick: onCloseClick
  });

  function onCloseClick() {
    play.toggleUpgradeMenu();
  }

  let iFadeIn = new ipol(0, 0, {});

  let components = [];

  this.init = data => {

    bg.init({});

    components.push(bg);

    dClose.init({});
    components.push(dClose);
  };

  this.add = () => {

    iFadeIn.both(1, 0);

    bg.add(threeLayer);
    dClose.add(threeLayer);
  };

  let beginRemove;
  this.remove = () => {
    iFadeIn.both(0, 1);
    beginRemove = true;
  };

  const doRemove = () => {
    beginRemove = false;
    bg.remove();
    dClose.remove();
  };

  this.update = delta => {
    iFadeIn.update(delta * 0.01);

    let vFadeIn = iFadeIn.value();

    if (beginRemove && iFadeIn.settled()) {
      doRemove();
    }

    components.forEach(_ => _.move(-vFadeIn * bs.menu.width, 0));

    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
