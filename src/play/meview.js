import Pool from 'poolf';
import Viewport from '../viewport';
import * as v from '../vec2';

import { MagicRoles, MagicMonsters } from '../magic';

import MagicSprite from './magicsprite';

const frameByMonsterRole = {
  [MagicMonsters.mage]: (monster) => {
    return 'green';
  }
};

export const frameByRole = {
  [MagicRoles.empty]: (item) => {
    let pos = item.pos;

    return (pos[0] + pos[1]) % 2 === 0 ? 'gray2':'gray3';
  },
  [MagicRoles.village]: () => 'yellow',
};


export default function MeView(play, ctx, bs) {

  const { frames } = ctx;
  let { tileSize } = bs;

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

  let dMs = new Pool(() => new Tile(this, ctx, bs), {
    name: 'MePlay Monster',
    warnLeak: 10000
  });

  let viewportMonster = new Viewport({
    vWidth: bs.width,
    vHeight: bs.height,
    getPosition: (item) => {
      let tile = magic.monster(item.key);
      return v.cscale(tile.pos, tileSize);
    },
    onOn: (item) => {
      let tile = magic.monster(item.key);

      let dO = dMs.acquire(_ => {
        _.init({pos: item.pos});
        _.resize(tileSize);
        _.frame(frames[frameByMonsterRole[tile.role](tile)]);
      });
      item.dO = dO;
    },
    onOff: (item) => {
      item.dO.release();
      dTs.release(item.dO);

      item.dO = undefined;
    },
    onView: (item, visiblePos) => {
      let tile = magic.monster(item.key);

      item.dO.move(...visiblePos);
      item.dO.frame(frames[frameByMonsterRole[tile.role](tile)]);
    }
  });

  this.init = data => {
    magic = data.magic;
  };

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

  const addMonsters = () => {
    let added = magic.monsters.added();

    for (let { key } of added) {
      viewportMonster.addChild({ key });
    }

  };

  this.drag = (pos) => {
    viewport.drag(pos);
    viewportMonster.drag(pos);
  };

  this.commitDrag = () => {
    viewport.commitDrag();
    viewportMonster.commitDrag();
  };

  this.resize = y => {
    tileSize = tileSize + y * 5;

    dTs.each(_ => _.resize(tileSize));    
  };

  this.hitPos = (epos) => {
    const hitTile = dTs.find(_ => _.hitTest(...epos));
    if (hitTile) {
      let pos = hitTile.pos();
      return pos;
    }
    return null;
  };

  this.update = delta => {
    addMonsters();

    viewport.update(delta);
    dTs.each(_ => _.update(delta));
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
