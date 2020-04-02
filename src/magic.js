import { objForeach } from './util2';
import { makeId } from './util';

export default function Magic() {
  let rows = 64,
      cols = 36;

  const allPos = (() => {
    let res = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        res.push([i, j]);
      }
    }
    return res;
  })();

  const pos2key = (pos) => pos[0] + '.' + pos[1];
  const key2pos = (key) => key.split('.').map(_ => parseInt(_));

  const allKeys = allPos.map(pos2key);

  let monsterId = makeId('monster');
  let monsters = this.monsters = new MagicDiff();
  let tiles = {};

  const makeRole = (role) => {
    return {
      role
    };
  };

  const makeMonster = (key, role, pos) => {
    return {
      key,
      role,
      pos
    };
  };

  this.init = data => {

    allPos.forEach(pos => {
      let key = pos2key(pos);
      tiles[key] = makeRole(MagicRoles.empty);
    });
  };

  this.update = () => {
    monsters.update();
  };

  this.addMonster = (role, pos) => {
    let key = monsterId();
    let monster = makeMonster(key, role, pos);
    monsters.add(key, monster);
  };

  this.monster = key => monsters.object(key);

  this.allPos = allPos;

  this.tile = (pos) => tiles[pos2key(pos)];

  let selected;

  this.selected = () => selected;
  this.select = key => selected = key;

  this.paint = (pos) => {

    let key = pos2key(pos);



    tiles[key] = makeRole(selected);    
  };

  this.export = () => {
    let res = {};
    allKeys.forEach(key => {
      let tile = tiles[key];
      res[key] = {
        role: tile.role
      };
    });
    return res;
  };

  this.import = (res) => {
    objForeach(res, (key, { role }) => {
      tiles[key] = makeRole(role);
    });
  };
}

function MagicDiff() {
  
  let added = [];
  let objects = {};

  this.add = (key, value) => {
    added.push({ key, value });
  };

  this.added = () => added;

  this.object = key => objects[key];

  this.update = () => {
    if (added.length > 0) {
      for (let { key, value } of added) {
        objects[key] = value;
      }
      added = [];
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
