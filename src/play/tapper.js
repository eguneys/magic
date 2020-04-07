import TapFx from  './tapfx';
import TapHud from './taphud';
import TapHandler from './taphandler';
import TapUpgrade from './tapupgrade';

import { Menus } from '../tapper';

export default function Tapper(play, ctx, bs) {

  const { frames, layers: { zeroLayer, oneLayer } } = ctx;

  let components = [];

  let tapper;

  let dFx = new TapFx(this, ctx, bs);
  let dHud = new TapHud(this, ctx, bs);
  let dTapHandler = new TapHandler(this, ctx, bs);
  let dUpgradeMenu = new TapUpgrade(this, ctx, bs);

  this.init = data => {
    tapper = data.tapper;

    dTapHandler.init({tapper});
    components.push(dTapHandler);

    dHud.init({tapper});
    components.push(dHud);

    dFx.init({tapper});
    components.push(dFx);

    dUpgradeMenu.init({tapper});
    components.push(dUpgradeMenu);
  };

  this.tap = (x, y) => {
    if (!tapper.tappy()) {
      return;
    }

    let tap = tapper.doTap();
    dFx.tap(tap, x, y);
  };

  this.toggleUpgradeMenu = () => {
    tapper.toggle(Menus.Upgrade);

    if (tapper.menu() === Menus.Upgrade) {
      dUpgradeMenu.add();
    } else {
      dUpgradeMenu.remove();
    }
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
