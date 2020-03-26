import QuadList from './dquad/quadlist';

export default function MagicCollision() {
  
  let body = new QuadList(0, 0, 1000, 1000, 7);

  let byKey = {};

  this.debug = body.debug;

  this.addCollision = (key, r, item) => {
    if (!byKey[key]) {
      byKey[key] = [];
    }
    let insertMe = {
      key,
      item,
      r
    };

    byKey[key].push(insertMe);
    body.insertWithRectangle(r, insertMe);
    return insertMe;
  };

  const safeRemoveFromArray = (arr, item) => {
    let i = arr.indexOf(item);
    if (i > -1) {
      arr.splice(i, 1);
    }
  };

  this.deleteCollision = (insertMe) => {
    safeRemoveFromArray(byKey[insertMe.key], insertMe);
    body.deleteWithRectangle(insertMe.r, insertMe);
  };

  this.updateCollision = (insertMe, r, item) => {
    this.deleteCollision(insertMe);
    return this.addCollision(insertMe.key, r, item);
  };

  this.detectCollisionForOne = (r, key2, onCollides) => {
    let dontLookItems = [];
    body.queryItemsWithRectangle(r, (handle2) => {
      let { key, item: item2, r: r2 } = handle2;
      if (key === key2) {
        if (dontLookItems.includes(item2)) {
          return;
        }
        onCollides(handle2);
        dontLookItems.push(item2);
      }
    });

  };

  this.detectCollisionForAll = (key1, key2, onCollides) => {
    let items = byKey[key1];

    if (items) {
      items.forEach(handle1 => {
        let { r: r1 } = handle1;
        body.queryItemsWithRectangle(r1, handle2 => {
          let {key, r: r2 } = handle2;

          if (key === key2 && key !== key1) {
            onCollides(handle2, handle1);
          }
        });
      });
    }
  };

  
  
  
}
