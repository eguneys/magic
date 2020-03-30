import { makeId } from './util';

export default function Magic() {

  let dMage;
  let dPlatforms = [];

  this.addPlatform = (x, y, w, h) => {
    let platform = {
      id: makeId(),
      bounds: {
        x, y,
        w, h
      }
    };

    dPlatforms.push(platform);
    return platform;
  };

  this.eachPlatform = (fn) => {
    dPlatforms.forEach(fn);
  };

  this.addMage = (x, y, w, h) => {
    let mage = {
      id: makeId(),
      bounds: {
        x, y,
        w, h
      }
    };
    dMage = mage;
  };

  this.eachMage = (fn) => {
    if (dMage) {
      fn(dMage);
    }
  };


}
