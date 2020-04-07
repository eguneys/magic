import MagicSprite from './magicsprite';
import MagicNumber from './magicnumber';
import MagicButton from './magicbutton';

export default function TapHud(play, ctx, bs) {

  const { frames, layers: { zeroLayer, oneLayer } } = ctx;

  let bg = new MagicSprite(this, ctx, {
    x: 0,
    y: 0,
    width: bs.width,
    height: bs.height,
    frame: frames['mdirt']
  });

  let dScore = new MagicNumber(this, ctx, {
    x: bs.score.x,
    y: bs.score.y,
    size: bs.score.height
  });


  let dUpgrade = new MagicButton(this, ctx, {
    x: bs.upgrade.x,
    y: bs.upgrade.y,
    width: bs.upgrade.width,
    height: bs.upgrade.height,
    frame: frames['button'],
    icon: frames['upgrade'],
    onClick: onUpgradeClick
  });


  function onUpgradeClick() {
    play.toggleUpgradeMenu();
  }

  let components = [];

  let tapper;

  this.init = data => {
    tapper = data.tapper;

    bg.init({});
    bg.add(zeroLayer);
    components.push(bg);

    dScore.init({});
    dScore.add(oneLayer);
    components.push(dScore);

    dUpgrade.init({});
    dUpgrade.add(oneLayer);
    components.push(dUpgrade);
  };

  this.update = delta => {
    dScore.setNumber(tapper.score());
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
