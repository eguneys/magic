import { sprite } from '../asprite';

export default function MagicSprite(play, ctx, bs) {

  let { x: baseX, y: baseY,
        width,
        height,
        frame,
        alpha = 1,
        angle = 0 } = bs;

  let dBg = sprite(frame);

  dBg.alpha = alpha;
  dBg.width = width;
  dBg.height = height;

  let x,
      y;

  let data;

  this.init = _data => {
    x = 0;
    y = 0;
    data = _data;
  };

  const visibleX = () => baseX + x;
  const visibleY = () => baseY + y;

  this.data = () => data;

  this.update = delta => {};

  this.visible = a => dBg.visible = a;

  this.alpha = a => dBg.alpha = a;

  this.pos = () => [x, y];

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
    dBg.position.set(visibleX(), visibleY());
    dBg.rotation = angle;
  };
  
}
