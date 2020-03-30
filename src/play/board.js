import Magic from '../magic';
import Maker from '../maker';
import MagicSimulation from '../magicsimulation';

import Toolbar from './toolbar';
import ButtonClick from './buttonclick';
import MagicMaker from './magicmaker';
import Platforms from './platforms';
import Mages from './mages';

export default function Board(play, ctx, bs) {

  let components = [];
  let toolbar = new Toolbar(this, ctx, bs);
  let buttonClick = new ButtonClick(this, ctx, bs);
  let magicMaker = new MagicMaker(this, ctx, bs);

  let platforms = new Platforms(this, ctx, bs);
  let mages = new Mages(this, ctx, bs);

  let magic,
      maker;

  let magicCollision,
      magicSimulation;

  this.init = data => {

    magicSimulation = new MagicSimulation();
    magic = new Magic();
    maker = new Maker();

    magicSimulation.init({ magic });

    mages.init({ magic });
    components.push(mages);

    platforms.init({ magic });
    components.push(platforms);

    buttonClick.init({ maker });
    magicMaker.init({ magic, maker });
    components.push(magicMaker);

    toolbar.init({magic, maker});
    components.push(toolbar);
  };

  this.addMage = () => {
    const { mage: { width, height } } = bs;
    magic.addMage(0, 0, width, height);
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
    buttonClick.update(delta);
    magicSimulation.update(delta);
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
