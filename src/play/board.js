import MagicSimulation from '../magicsimulation';
import Maker from '../maker';
import Magic from '../magic';

import Hero from './hero';

export default function Board(play, ctx, bs) {

  let hero = new Hero(this, ctx, bs);

  let simulation = new MagicSimulation();

  this.init = data => {

    let magic = new Magic();
    let maker = new Maker();

    magic.addHero(0, 10, 32, 64);
    simulation.init({magic});

    hero.init({magic});

  };

  this.update = delta => {
    hero.update(delta);
    simulation.update(delta);
  };


  this.render = () => {
    hero.render();
  };
  
}
