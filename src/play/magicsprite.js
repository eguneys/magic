import { sprite } from '../asprite';

export default function MagicSprite(play, ctx, bs) {

  let { x, y,
        width,
        height,
        frame,
        alpha = 1,
        angle = 0 } = bs.local;

  let dBg = sprite(frame);

  dBg.alpha = alpha;
  dBg.width = width;
  dBg.height = height;

  let data;

  this.init = _data => {
    data = _data;
  };

  this.data = () => data;

  this.update = delta => {};

  this.visible = a => dBg.visible = a;

  this.alpha = a => dBg.alpha = a;

  this.pos = () => [x, y];

  this.hitTest = (posX, posY) => {
    let left = x,
        right = x + width,
        top = y,
        bottom = y + height;

    return left <= posX && right > posX &&
      top <= posY && bottom > posY;
  };

  this.move = (_x, _y) => {
    x = _x;
    y = _y;
  };

  this.rotate = _angle => angle = _angle;

  this.resize = (w, h) => {
    width = w;
    height = h;

    dBg.width = width;
    dBg.height = height;
  };
  this.frame = frame => {
    dBg.frame = frame;

    dBg.width = width;
    dBg.height = height;
  };

  this.add = (layer) => {
    layer.add(dBg);
  };

  this.remove = () => {
    dBg.remove();
  };


  this.render = () => {
    dBg.position.set(x, y);
    dBg.rotation = angle;
  };
  
}
