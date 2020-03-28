import Collt from './collt';

export default function Maker() {

  let bounds = { x: 0, y: 0, width: 1000, height: 1000 };

  let collt = new Collt(bounds);

  this.buttonCollision = (bounds, onCollide) => {
    collt.addRectangle(onCollide, bounds);
  };

  this.buttonClick = (x, y) => {
    let buttons = collt.detectCollision({ x, y, w: 1, h: 1 });
    buttons.forEach(_ => _());
  };

  this.update = (delta) => {

  };
}
