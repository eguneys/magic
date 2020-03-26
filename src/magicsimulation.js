import Phy from './physics';

export default function MagicSimulation() {

  let heroPhysics = new Phy({gravity: [0, 10]});

  let magic;

  this.init = data => {
    magic = data.magic;

    let heroRect = magic.heroRect();
    heroPhysics.pos(heroRect.x, heroRect.y);
  };


  this.update = delta => {

    heroPhysics.update(delta * 0.016);

    let pos = heroPhysics.pos();
    magic.moveHero(pos[0], pos[1]);

  };

}
