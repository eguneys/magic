import MagicSimulation from '../magicsimulation';
import MagicMaker from '../magicmaker';
import Magic from '../magic';

import MagicMakerView from './magicmaker';
import MagePool from './mage';
import Platforms from './platforms';
import PHandles from './phandles';
import Toolbar from './toolbar';

export default function Board(play, ctx, bs) {

  let magicMaker = new MagicMakerView(this, ctx, bs);

  let magePool = new MagePool(this, ctx, bs);
  let platforms = new Platforms(this, ctx, bs);
  let pHandles = new PHandles(this, ctx, bs);

  let toolbar = new Toolbar(this, ctx, bs);

  let simulation = new MagicSimulation();

  let magic,
      maker;

  this.init = data => {

    magic = new Magic();
    maker = new MagicMaker();
    magicMaker.init({magic, maker});

    magePool.init({magic});
    platforms.init({magic});
    pHandles.init({magic, maker});
    toolbar.init({magic, maker});

    simulation.init({magic});
  };

  this.addMage = () => {
    magic.addMage(0, 10, 32, 64);
  };

  this.update = delta => {
    magicMaker.update(delta);

    magePool.update(delta);
    platforms.update(delta);
    pHandles.update(delta);
    toolbar.update(delta);

    simulation.update(delta);
  };


  this.render = () => {
    magicMaker.render();

    magePool.render();
    platforms.render();
    pHandles.render();
    toolbar.render();
  };
  
}
