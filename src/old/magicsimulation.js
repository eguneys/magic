import Phy from './physics';
import Pool from 'poolf';

export default function MagicSimulation() {

  let magic;

  let mages = new Pool(() => new MageSimulation());

  this.init = data => {
    magic = data.magic;
  };

  this.update = delta => {

    magic.eachMage((handle) => {
      let { item, r } = handle;
      let { id } = item;
      let dM = mages.find(_ => _.id === id);
      if (!dM) {
        magic.debug();
        dM = mages.acquire(_ => _.init({
          id,
          magic,
          handle,
          x: r.x,
          y: r.y
        }));
      }
    });

    mages.each(_ => _.update(delta));
  };

}

function MageSimulation() {
  let phy = new Phy({gravity: [0, 10]});

  let magic;
  let handle;

  this.init = data => {
    this.id = data.id;
    magic = data.magic;
    handle = data.handle;
    
    phy.pos(data.x, data.y);
  };

  const updateCollision = () => {
    
    magic.mageCollidesPlatform(handle, (platform) => {
      console.log(platform);
    });
  };

  this.update = delta => {
    phy.update(delta * 0.016);

    updateCollision();
    let pos = phy.pos();
    
    handle = magic.moveMage(handle, pos[0], pos[1]);

  };

}
