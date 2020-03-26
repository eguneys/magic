import Destructible from './dquad/destructible';

export default function Magic() {

  const makeId = (() => {
    let n = 1;
    return () => {
      return n++;
    };
  })();

  let body = new Destructible(0, 0, 1000, 1000, Visible);

  let collisions = {};

  this.addCollision = (key, r, item) => {
    let id = makeId();

    collisions[id] = {
      key,
      id,
      item
    };

    body.modifyByRectangle(r, collisions[id]);
  };
  
  
}
