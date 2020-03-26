import { makeId, safeRemoveFromArray } from './util';
import { rect } from './dquad/geometry';

import MagicCollision from './magiccolision';

export default function Magic() {

  let coll = new MagicCollision();

  let Handle = 'handle';

  const handleItem = (data) => ({
    id: makeId(),
    handle: true,
    data
  });

  let handles = [];

  this.handles = () => handles;
  this.eachHandle = (fn) => handles.forEach(fn);

  this.addHandle = (x, y, w, h, data) => {
    let pRect = rect(x, y, w, h);
    let hHandle = coll.addCollision(Handle, pRect, handleItem(data));

    handles.push(hHandle);
    return hHandle;
  };

  this.removeHandle = (hHandle) => {
    safeRemoveFromArray(handles, hHandle);
    coll.deleteCollision(hHandle);
  };

  this.handleCollidesPoint = (x, y, onCollide) => {
    let r = rect(x, y, 10, 10);
    coll.detectCollisionForOne(r, Handle, (item) => {
      onCollide(item);
    });
  };
}
