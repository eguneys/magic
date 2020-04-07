import { objForeach } from './util2';
import { makeId } from './util';
import Monster from './monster';

export const rows = 64,
    cols = 36;

export const allPos = (() => {
  let res = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      res.push([i, j]);
    }
  }
  return res;
})();

export const pos2key = (pos) => pos[0] + '.' + pos[1];
export const key2pos = (key) => key.split('.').map(_ => parseInt(_));

export const allKeys = allPos.map(pos2key);

const makeRole = (role) => {
  return {
    role
  };
};

const makeMonster = (magic, key, role, pos) => {
  let monster = new Monster(magic);
  monster.init({ key, pos });
  return monster;
};

const monsterId = makeId('monster');

const makeData = () => ({
  monsters: new MagicDiff(),
  tiles: {}
});

export default function Magic() {

  const data = this.data = makeData();

  this.init = config => {

    allPos.forEach(pos => {
      let key = pos2key(pos);
      data.tiles[key] = makeRole(MagicRoles.empty);
    });
  };

  this.update = () => {
    data.monsters.diff();

    data.monsters.each(_ => _.update());

    data.userMove = undefined;
  };

  this.addMonster = (role, pos) => {
    let key = monsterId();
    let monster = makeMonster(this, key, role, pos);
    data.monsters.add(key, monster);
    return monster;
  };

  this.userMove = (dir) => {
    data.userMove = dir;
  };

  this.selectMonster = (key) => {
    data.selectedMonster = key;
  };

  this.monster = key => data.monsters.object(key);

  this.allMonsters = data.monsters.allKeys;

  this.addedMonsters = data.monsters.added;

  this.allPos = allPos;

  this.tile = (pos) => data.tiles[pos2key(pos)];

  let selectedPalette;

  this.selected = () => selectedPalette;
  this.select = key => selectedPalette = key;

  this.paint = (pos) => {

    let key = pos2key(pos);

    data.tiles[key] = makeRole(selectedPalette);
  };

  this.export = () => {
    let res = {};
    allKeys.forEach(key => {
      let tile = data.tiles[key];
      res[key] = {
        role: tile.role
      };
    });
    return res;
  };

  this.import = (res) => {
    objForeach(res, (key, { role }) => {
      data.tiles[key] = makeRole(role);
    });
  };
}

function MagicDiff() {
  
  let added = {};
  let objects = {};

  this.add = (key, value) => {
    added[key] = value;
  };

  this.added = () => added;

  this.each = (fn) => {
    objForeach(objects, (key, obj) => fn(obj));
  };

  this.object = key => objects[key] || added[key];

  this.allKeys = () => {
    return Object.keys(objects);
  };

  this.diff = () => {
    if (Object.keys(added).length > 0) {
      for (let key of Object.keys(added)) {
        objects[key] = added[key];
      }
      added = {};
    }
  };

}

export const MagicRoles = {
  empty: 'empty',
  village: 'village',
  white: 'white',
  black: 'black',
  gray: 'gray',
  brown: 'brown'
};

export const MagicMonsters = {
  mage: 'mage'
};
