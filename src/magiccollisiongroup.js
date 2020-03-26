import { makeId, safeRemoveFromArray } from './util';
import { rect } from './dquad/geometry';

import MagicCollision from './magiccolision';

export default function MagicCollisionGroup() {
  let coll = new MagicCollision();

  const makeItem = (data, type, iRect) => ({
    id: makeId(),
    mr: iRect.copy(),
    type,
    data
  });

  let itemsByType = {};

  this.itemsByType = (type) => itemsByType[type];
  this.eachItemByType = (type) => fn => itemsByType[type].forEach(fn);

  this.addItemByType = (type) => {
    if (!itemsByType[type]) {
      itemsByType[type] = [];
    }
    let itemList = itemsByType[type];
    return (x, y, w, h, data) => {
      let iRect = rect(x, y, w, h);
      let handle = coll.addCollision(type, iRect,
                                     makeItem(data, type, iRect));
      itemList.push(handle);
      return handle;
    };
  };

  this.removeItemByType = (type) => {
    let itemList = itemsByType[type];
    return handle => {
      safeRemoveFromArray(itemList, handle);
      coll.deleteCollision(handle);
    };
  };

  this.moveItemByType = (type) => {
    let itemList = itemsByType[type];
    return (handle, x, y) => {
      safeRemoveFromArray(itemList, handle);
      handle.item.mr.move(x, y);
      let newHandle = coll.updateCollision(handle,
                                           handle.item.mr, 
                                           handle.item);
      itemList.push(newHandle);
      return newHandle;
    };
  };

  this.oneTypeCollidesPoint = type1 => (x, y, onCollide) => {
    let pR = rect(x, y, 10, 10);
    coll.detectCollisionForOne(pR, type1, item => {
      onCollide(item);
    });
  };

  this.typesCollides = (type1, type2) => (onCollide) => {
    coll.detectCollisionForAll(type1, type2, onCollide);
  };

  this.oneTypeCollidesAnyType = type1 => (handle, onCollide) => {
    coll.detectCollisionForOne(handle.r, type1, (item) => {
      if (handle.item !== item) {
        onCollide(item);
      }
    });
  };

  this.oneTypeCollidesOtherType = (type1, type2) => (handle, onCollide) => {
    coll.detectCollisionForOne(handle.r, type1, (item) => {
      if (handle.item !== item && item.type === type2) {
        onCollide(item);
      }
    });
  };

  
};
