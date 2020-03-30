import Collt from './collt';

export default function Maker() {

  let bounds = { x: 0, y: 0, width: 1000, height: 1000 };

  let cButtons = new ClickCollider(bounds),
      cHandles = new ClickCollider(bounds);

  this.buttonCollision = cButtons.addCollision;
  this.buttonClick = cButtons.doClick;

  this.addHandleCollision = cHandles.addCollision;
  this.doHandleClick = cHandles.doClick;

}

function ClickCollider(bounds) {
  let collt = new Collt(bounds);

  this.addCollision = (bounds, onCollide) => {
    collt.addRectangle(onCollide, bounds);
  };

  this.doClick = (x, y) => {
    let buttons = collt.detectCollision({ x, y, w: 1, h: 1 });
    buttons.forEach(_ => _());
    return buttons;
  };
}
