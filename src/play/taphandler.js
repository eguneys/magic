import { tapHandler } from './util';
import { throttle } from '../util';

export default function Play(play, ctx, bs) {

  const bounds = {
    x: bs.tap.x,
    y: bs.tap.y,
    width: bs.tap.width,
    height: bs.tap.height
  };

  const { events } = ctx;

  let tapper;

  this.init = data => {
    tapper = data.tapper;
  };

  const safeTap = throttle((x, y) => {
    play.tap(x, y);
  }, 100);

  const handleTap = tapHandler(events, bounds, safeTap);

  this.update = delta => {
    handleTap();
  };


  this.render = () => {
    
  };
  
}
