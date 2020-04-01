import { callMaybe } from '../util';
import Magic from '../magic';

import Me from './me';
import Palette from './palette';
import Toolbar from './toolbar';

export default function Maker(play, ctx, bs) {

  const { config } = ctx;

  let components = [];
  let me = new Me(this, ctx, bs);
  let palette = new Palette(this, ctx, bs);
  let toolbar = new Toolbar(this, ctx, bs);

  let magic;

  this.init = data => {
    magic = new Magic();
    magic.init({});

    toolbar.init({});
    components.push(toolbar);

    me.init({magic});
    components.push(me);

    palette.init({magic});
    components.push(palette);
  };

  const maybeSave = callMaybe(config.events.onSave);

  this.save = () => {

    maybeSave(magic.export());

  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
