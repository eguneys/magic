import { sprite } from '../asprite';

export default function HeroSprite(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  const { width, height,
          hero: { width: heroWidth, 
                  height: heroHeight } } = bs;

  let dBg = sprite(frames['hero']);
  dBg.width = heroWidth,
  dBg.height = heroHeight;

  let x, y;

  this.init = data => {
    x = data.x;
    y = data.y;
  };

  this.update = delta => {
  };

  this.move = (_x, _y) => {
    x = _x;
    y = _y;
  };

  this.add = () => {
    oneLayer.add(dBg);
  };

  this.remove = () => {
    dBg.remove();
  };


  this.render = () => {
    dBg.position.set(x, y);
  };
  
}
