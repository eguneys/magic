import MagicSimulation from '../magicsimulation';
import MagicMaker from '../magicmaker';
import Magic from '../magic';

import MagicMakerView from './magicmaker';
import Hero from './hero';
import Platforms from './platforms';
import PHandles from './phandles';

export default function Board(play, ctx, bs) {

  let magicMaker = new MagicMakerView(this, ctx, bs);
  let hero = new Hero(this, ctx, bs);
  let platforms = new Platforms(this, ctx, bs);
  let pHandles = new PHandles(this, ctx, bs);

  let simulation = new MagicSimulation();

  this.init = data => {

    let magic = new Magic();
    let maker = new MagicMaker();
    magicMaker.init({magic, maker});

    // magic.addHero(0, 10, 32, 64);
    // simulation.init({magic});

    // hero.init({magic});
    platforms.init({magic});
    pHandles.init({magic, maker});
  };

  this.update = delta => {
    magicMaker.update(delta);

    // hero.update(delta);
    platforms.update(delta);
    pHandles.update(delta);
  };


  this.render = () => {
    magicMaker.render();

    // hero.render();
    platforms.render();
    pHandles.render();
  };
  
}
