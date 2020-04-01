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

  let tiles = {};

  const makeRole = (role) => {
    return {
      role
    };
  };

  this.init = data => {

    allPos.forEach(pos => {
      let key = pos2key(pos);
      tiles[key] = makeRole(MagicRoles.empty);
    });
    
  };

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

export const MagicRoles = {
  empty: 'empty',
  white: 'white',
  black: 'black',
  gray: 'gray',
  brown: 'brown'
};
