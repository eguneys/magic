import MagicSprite from './magicsprite';
import MagicButton from './magicbutton';
import Magic9 from './magic9';
import ipol from '../ipol';

import MagicScroll from './magicscroll';

export default function TapUpgrade(play, ctx, bs) {

  const { frames, layers: { threeLayer, fourLayer } } = ctx;

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

  let dScroll = new MagicScroll(this, ctx, {
    x: bs.menu.x,
    y: bs.menu.y + 20,
    width: bs.menu.width,
    height: bs.menu.height - 40
  });

  function onCloseClick() {
    play.toggleUpgradeMenu();
  }

  let iFadeIn = new ipol(0, 0, {});

  let components = [];

  let tapper;

  let beginRemove;

  this.init = data => {
    tapper = data.tapper;
    bg.init({});
    components.push(bg);

    dScroll.init({});
    dScrollComponents();
    components.push(dScroll);

    dClose.init({});
    components.push(dClose);
  };

  this.add = () => {

    doRemove();
    iFadeIn.both(1, 0);

    bg.add(threeLayer);
    dClose.add(threeLayer);
    dScroll.add(fourLayer);
  };

  const dScrollComponents = () => {
    tapper.upgrades()
      .map((upgrade, i) => {
        let marginY = 10;
        let upgradeHeight = bs.menuUpgrade.height;

        let comp = new Upgrade(this, ctx, {
          x: bs.menu.x + marginY,
          y: bs.menu.y + marginY * 5.0 + i * (upgradeHeight + marginY),
          width: bs.menu.width - marginY * 2.0,
          height: upgradeHeight
        });
        comp.init({upgrade});
        return comp;
      }).forEach(_ => {
      dScroll.addComponent(_);
    });
  };

  this.remove = () => {
    iFadeIn.both(0, 1);
    beginRemove = true;
  };

  const doRemove = () => {
    beginRemove = false;
    bg.remove();
    dClose.remove();
    dScroll.remove();
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

function Upgrade(play, ctx, bs) {

  const { frames } = ctx;

  let bg = new Magic9(this, ctx, {
    x: bs.x,
    y: bs.y,
    width: bs.width,
    height: bs.height,
    tileWidth: 16,
    frames: frames['upgradebg9']
  });

  let components = [];

  this.init = data => {
    bg.init({});
    components.push(bg);
  };

  this.add = (layer) => {
    bg.add(layer);
  };

  this.remove = () => {
    bg.remove();
  };

  this.bounds = () => bg.bounds();

  this.move = (x, y) => {
    bg.move(x, y);
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
