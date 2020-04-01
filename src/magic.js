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

  let tiles = {};

  this.init = data => {

    allPos.forEach(pos => {
      let key = pos2key(pos);
      tiles[key] = {
        role: 'EMPTY',
        pos
      };
    });
    
  };

  this.each = (fn) => {
    objForeach(tiles, (_, tile) => fn(tile));
  };

}
