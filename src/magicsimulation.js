import Collt from './collt';

import MagicPhy from './magicphysics';

import MagicPool from './magicpool';

export default function MagicSimulation() {
  
  let magic;

  let bounds = { x: 0, y: 0, width: 1000, height: 1000 };

  let collt = new Collt(bounds);

  let mages = new MagicPool(() => new MageSimulation());

  let platforms = new MagicPool(() => new PlatformSimulation());
  
  this.init = data => {
    magic = data.magic;
  };

  this.update = delta => {
    collt.updateQ();
    magic.eachMage(({id, bounds}) => {
      let mage = mages.getOrAcquire(id, _ => _.init({
        magic,
        collt,
        bounds
      }));
    });

    magic.eachPlatform(({ id, bounds }) => {
      let p = platforms.getOrAcquire(id, _ => _.init({
        magic,
        collt,
        bounds
      }));
    });
    
    platforms.each(_ => _.update(delta));
    mages.each(_ => _.update(delta));
  };

}

function PlatformSimulation() {

  let magic,
      magicCollision;

  let bounds;

   this.init = data => {
     magic = data.magic;

     bounds = data.bounds;

     let collt = data.collt;

     collt.addRectangle({}, bounds);
  }; 


  this.update = delta => {
  };

  
}

function MageSimulation() {
  
  let magic;
  let collt;

  let bounds;

  let phy = new MagicPhy();

  this.init = data => {
    magic = data.magic;
    collt = data.collt;
    bounds = data.bounds;

    phy.init({bounds});
    phy.grounded(false);
  };
  let collides = {};

  const collideX = (h) => collides[h] = true;
  const collideA = () => collideX('a');
  const collideB = () => collideX('b');
  const collideC = () => collideX('c');
  const collideD = () => collideX('d');

  const collideT = () => collideX('t');
  const collideH = () => collideX('h');
  const collideL = () => collideX('l');
  const collideR = () => collideX('r');
  const collideReset = () => {
    collides.a = false;
    collides.b = false;
    collides.c = false;
    collides.d = false;

    collides.t = false;
    collides.h = false;
    collides.l = false;
    collides.r = false;
  };

  const updateCollisions = () => {
    collideReset();
    collt.detectPointQ(bounds.x, 
                       bounds.y, collideA);
    collt.detectPointQ(bounds.x + bounds.w, 
                       bounds.y, collideC);

    collt.detectPointQ(bounds.x, 
                       bounds.y + bounds.h * 0.5, collideB);
    collt.detectPointQ(bounds.x + bounds.w, 
                       bounds.y + bounds.h * 0.5, collideD);

    collt.detectPointQ(bounds.x, 
                       bounds.y + bounds.h, collideL);

    collt.detectPointQ(bounds.x + bounds.w, 
                       bounds.y + bounds.h, collideR);

    collt.detectPointQ(bounds.x + bounds.w * 0.5,
                       bounds.y + bounds.h, collideH);


    if (collides.l && collides.r) {
      phy.grounded(true);
    }
  };

  this.update = delta => {

    updateCollisions();

    phy.update(delta);
  };

}
