import MagicSprite from './magicsprite';
import MagicButton from './magicbutton';
import Magic9 from './magic9';

export default function TapUpgrade(play, ctx, bs) {

  const { frames, layers: { twoLayer } } = ctx;

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

  let components = [];

  this.init = data => {

    bg.init({});

    components.push(bg);

    dClose.init({});
    components.push(dClose);
  };

  this.add = () => {
    bg.add(twoLayer);
    dClose.add(twoLayer);
  };

  this.remove = () => {
    bg.remove();
    dClose.remove();
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
