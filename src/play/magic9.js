import { combineRect } from './util';
import MagicSprite from './magicsprite';

export default function Magic9(play, ctx, bs) {

  const makeSprite = (bounds, frame) => {
    return new MagicSprite(this, ctx, {
      ...bounds,
      frame: frame
    });
  };

  let frames = bs.frames;

  let baseX = bs.x,
      baseY = bs.y;

  let tileWidth = bs.tileWidth,
      tileHeight = bs.tileHeight || bs.tileWidth;

  let midWidth = bs.width - tileWidth * 2.0,
      midHeight = bs.height - tileHeight * 2.0;

  let bSs = [{
    x: baseX,
    y: baseY,
    width: tileWidth,
    height: tileHeight
  }, {
    x: baseX + tileWidth,
    y: baseY,
    width: midWidth,
    height: tileHeight
  }, {
    x: baseX + tileWidth + midWidth,
    y: baseY,
    width: tileWidth,
    height: tileHeight
  }, {
    x: baseX,
    y: baseY + tileHeight,
    width: tileWidth,
    height: midHeight
  }, {
    x: baseX + tileWidth,
    y: baseY + tileHeight,
    width: midWidth,
    height: midHeight    
  }, {
    x: baseX + tileWidth + midWidth,
    y: baseY + tileHeight,
    width: tileWidth,
    height: midHeight
  }, {
    x: baseX,
    y: baseY + tileHeight + midHeight,
    width: tileWidth,
    height: tileHeight
  }, {
    x: baseX + tileWidth,
    y: baseY + tileHeight + midHeight,
    width: midWidth,
    height: tileHeight
  }, {
    x: baseX + tileWidth + midWidth,
    y: baseY + tileHeight + midHeight,
    width: tileWidth,
    height: tileHeight
  }];

  let dSs = bSs.map((bounds, i) => makeSprite(bounds, frames[i]));

  let components = [];

  this.init = data => {

    dSs.forEach(_ => {
      _.init({});
      components.push(_);
    });
  };

  this.add = layer => {
    dSs.forEach(_ => {
      _.add(layer);
    });    
  };

  this.remove = () => {
    dSs.forEach(_ => {
      _.remove();
    });
  };

  this.move = (x, y) => {
    dSs.forEach(_ => _.move(x, y));
  };

  this.bounds = () => dSs
    .map(_ => _.bounds())
    .reduce((acc, dS) => 
      combineRect(acc, dS));

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
