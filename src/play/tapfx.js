import Pool from 'poolf';
import TapIncrement from './tapincrement';

export default function TapFx(play, ctx, bs) {

  let increments = new Pool(() => new TapIncrement(this, ctx, bs));

  let tapper;
  this.init = data => {
    tapper = data.tapper;
  };

  this.update = delta => {
    increments.each(_ => _.update(delta));
  };

  this.tap = (tap, x, y) => {
    increments.acquire(_ => _.init({
      tap,
      x,
      y
    }));
  };

  this.releaseIncrement = _ => increments.release(_);

  this.render = () => {
    increments.each(_ => _.render());
  };
  
}
