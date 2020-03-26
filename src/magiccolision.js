import QuadList from './dquad/quadlist';

export default function MagicCollision() {
  
  let body = new QuadList(0, 0, 1000, 1000);

  let byKey = {};

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

  this.detectCollision = (key1, key2, onCollides) => {
    let items = byKey[key1];

    if (items) {
      items.forEach(({ item1, r }) => {
        body.queryItemsWithRectangle(r, ({key, item2, r }) => {
          if (key === key2) {
            onCollides(item1, item2);
          }
        });
      });
    }
  };

  
  
  
}
