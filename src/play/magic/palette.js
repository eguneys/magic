import Pool from 'poolf';
import MagicSprite from './magicsprite';

import { MagicRoles } from '../magic';

const frameByRole = {
  [MagicRoles.empty]: 'gray2',
  [MagicRoles.village]: 'mvill',
};

export default function Palette(play, ctx, bs) {

  const { events, frames, layers: { oneLayer } } = ctx;

  let { tileSize } = bs;

  let { x, y, width, height } = bs.palette;

  let local = {
    x: bs.palette.x + 5,
    y: bs.palette.y + 5,
    width: bs.tileSize,
    height: bs.tileSize,
    frame: frames['black']
  };

  let dTs = new Pool(() => new MagicSprite(this, ctx, { local, ...bs }), {
    name: 'Palette',
    warnLeak: 10000
  });

  let palette;
  let magic;

  this.init = data => {
    magic = data.magic;

    palette = [
      MagicRoles.empty,
      MagicRoles.village
    ];

    magic.select(palette[0]);
  };

  this.attach = () => {

    palette.forEach((role, i) => {
      let frame = frames[frameByRole[role]];

      let x = (i % 2) * tileSize,
          y = Math.floor(i / 2) * tileSize;

      dTs.acquire(_ => {
        _.init({role});
        _.add(oneLayer);
        _.move(x, y);
        _.frame(frame);
      });
    });
    
  };

  this.detach = () => {
    dTs.each(_ => _.remove());
    dTs.releaseAll();
  };

  const select = (epos) => {
    let hit = dTs.find(_ => _.hitTest(epos[0], epos[1]));

    if (hit) {
      magic.select(hit.data().role);
    }
  };

  const handleMouse = () => {
    const { current } = events.data;

    if (current) {

      let { epos, tapping } = current;

      if (tapping) {
        select(epos);
      }
    }
  };

  this.update = delta => {
    handleMouse();
    dTs.each(_ => _.update(delta));
  };


  this.render = () => {
    dTs.each(_ => _.render());
  };
  
}
