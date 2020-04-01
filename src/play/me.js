import Pool from 'poolf';
import Viewport from '../viewport';
import * as v from '../vec2';

import { MagicRoles } from '../magic';

import MagicSprite from './magicsprite';


const frameByRole = {
  [MagicRoles.empty]: (item) => {
    let pos = item.pos;

    return (pos[0] + pos[1]) % 2 === 0 ? 'gray2':'gray3';
  },
  [MagicRoles.white]: () => 'white',
  [MagicRoles.black]: () => 'black',
  [MagicRoles.gray]: () => 'gray',
  [MagicRoles.brown]: () => 'brown'
};

export default function Me(play, ctx, bs) {

  const { events, frames } = ctx;

  let { tileSize } = bs;

  let { x, y, width, height } = bs.me;

  let magic;


  let dTs = new Pool(() => new Tile(this, ctx, bs), {
    name: 'Me',
    warnLeak: 10000
  });

  let viewport = new Viewport({
    vWidth: bs.width,
    vHeight: bs.height,
    getPosition: (item) => {
      return v.cscale(item.pos, tileSize);
    },
    onOn: (item) => {
      let tile = magic.tile(item.pos);

      let dO = dTs.acquire(_ => {
        _.init({pos: item.pos});
        _.resize(tileSize);
        _.frame(frames[frameByRole[tile.role](item)]);
      });
      item.dO = dO;
    },
    onOff: (item) => {
      item.dO.release();
      dTs.release(item.dO);

      item.dO = undefined;
    },
    onView: (item, visiblePos) => {
      let tile = magic.tile(item.pos);

      item.dO.move(...visiblePos);
      item.dO.frame(frames[frameByRole[tile.role](item)]);
    }
  });

  this.attach = () => {
    magic.allPos.forEach(pos => {
      viewport.addChild({ pos });
    });
  };

  this.detach = () => {
    viewport.removeChildren();
    dTs.each(_ => _.release());
    dTs.releaseAll();
  };

  this.init = data => {
    magic = data.magic;
  };

  const drag = (pos) => {
    viewport.drag(pos);
  };

  const commitDrag = () => {
    viewport.commitDrag();
  };

  const paint = (epos) => {
    const hitTile = dTs.find(_ => _.hitTest(...epos));

    if (hitTile) {
      let pos = hitTile.pos();

      magic.paint(pos);
    }
  };

  const resize = y => {
    tileSize = tileSize + y * 5;

    dTs.each(_ => _.resize(tileSize));
  };

  const handleMouse = () => {
    const { wheel, current } = events.data;

    if (current) {

      let { button, epos, dpos, ending } = current;

      if (button === 1) {
        drag(dpos);
        if (ending) {
          commitDrag();
        }
      } else {
        paint(epos);
      }      
    }
    if (wheel) {
      let { y } = wheel;

      resize(y);
    }
  };

  this.update = delta => {
    handleMouse();

    dTs.each(_ => _.update(delta));
    viewport.update(delta);
  };


  this.render = () => {
    dTs.each(_ => _.render());
  };
  
}

function Tile(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  let local = {
    x: bs.me.x,
    y: bs.me.y,
    width: bs.tileSize,
    height: bs.tileSize,
    frame: frames['black']
  };

  let dS = new MagicSprite(this, ctx, { local, ...bs });

  let pos;

  this.init = data => {
    pos = data.pos;

    dS.init({});
    dS.add(oneLayer);
  };

  this.release = () => {
    dS.remove();
  };

  this.pos = () => pos;

  this.hitTest = (x, y) => dS.hitTest(x, y);

  this.resize = (tileSize) => dS.resize(tileSize, tileSize);

  this.move = (x, y) => dS.move(x, y);
  this.frame = frame => dS.frame(frame);

  this.update = delta => {
    dS.update(delta);
  };


  this.render = () => {
    dS.render();
  };
  
}
