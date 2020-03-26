import MagicSimulation from '../magicsimulation';
import Maker from '../maker';
import Magic from '../magic';

import MagicMaker from './magicmaker';
import Hero from './hero';
import Platforms from './platforms';

export default function Board(play, ctx, bs) {

  let magicMaker = new MagicMaker(this, ctx, bs);
  let hero = new Hero(this, ctx, bs);
  let platforms = new Platforms(this, ctx, bs);

  let simulation = new MagicSimulation();

  this.init = data => {

    let magic = new Magic();
    let maker = new Maker();
    magicMaker.init({magic});

    magic.addHero(0, 10, 32, 64);
    simulation.init({magic});

    hero.init({magic});
    platforms.init({magic});
  };

  this.update = delta => {
    magicMaker.update(delta);
    hero.update(delta);
    platforms.update(delta);
  };


  this.render = () => {
    magicMaker.render();
    hero.render();
    platforms.render();
  };
  
}
