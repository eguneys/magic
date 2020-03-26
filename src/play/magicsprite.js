import { sprite } from '../asprite';

export default function MagicSprite(play, ctx, bs, frame) {

  const { frames, layers: { oneLayer } } = ctx;

  let dBg = sprite(frames['hero']);

  let { x, y,
        width,
        height } = bs.local;

  if (frame) {
    dBg.frame = frame;
  }

  this.init = data => {
  };

  this.update = delta => {
  };

  this.visible = a => dBg.visible = a;

  this.move = (_x, _y) => {
    x = _x;
    y = _y;
  };
  this.size = (w, h) => {
    width = w;
    height = h;
  };
  this.frame = frame => {
    dBg.frame = frame;
  };

  this.add = (layer) => {
    layer.add(dBg);
  };

  this.remove = () => {
    dBg.remove();
  };


  this.render = () => {
    dBg.width = width;
    dBg.height = height;
    dBg.position.set(x, y);
  };
  
}
