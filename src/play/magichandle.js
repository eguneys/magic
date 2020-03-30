import MagicSprite from './magicsprite';

export default function MagicHandle(play, ctx, bs) {

  const { events, frames, layers: { fourLayer } } = ctx;

  const { platform: 
          { width: platformWidth, 
            height: platformHeight } } = bs;

  let local = {
    x: 0,
    y: 0,
    width: platformWidth,
    height: platformHeight
  };

  let dS = new MagicSprite(play, ctx, { ...bs, local }, frames['phandle']);

  let magic,
      maker;

  let platformBounds,
      bounds;

  let selected;

  this.init = data => {
    magic = data.magic;
    maker = data.maker;

    platformBounds = data.platformBounds;

    bounds = {
      x: data.x,
      y: data.y,
      w: platformWidth,
      h: platformHeight
    };

    selected = false;

    dS.init({});
    dS.add(fourLayer);

    maker.addHandleCollision(bounds, onSelect);
  };

  this.deselect = () => selected = false;

  this.selected = () => selected;

  this.move = (x, y) => {
    bounds.x = x;
    bounds.y = y;
    platformBounds.x = x;
    platformBounds.y = y;
  };

  const onSelect = () => {
    selected = true;
  };

  this.update = delta => {
    dS.move(bounds.x, bounds.y);
    dS.update(delta);
    dS.visible(selected);
  };


  this.render = () => {
    dS.render();
  };
  
}
