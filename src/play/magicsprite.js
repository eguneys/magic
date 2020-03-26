import { sprite } from '../asprite';

export default function MagicSprite(play, ctx) {

  const { frames, layers: { oneLayer } } = ctx;

  let dBg = sprite(frames['hero']);

  let x, y,
      width,
      height;

  this.init = data => {
    x = data.x;
    y = data.y;
    width = data.width;
    height = data.height;
  };

  this.update = delta => {
  };

  this.move = (_x, _y) => {
    x = _x;
    y = _y;
  };
  this.size = (w, h) => {
    width = w;
    height = h;
  };

  this.add = () => {
    oneLayer.add(dBg);
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
