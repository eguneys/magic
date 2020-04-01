import { callMaybe } from '../util';
import Magic from '../magic';

import Components from './components';
import MagicComponents from './magiccomponent';
import Me from './me';
import Palette from './palette';
import Toolbar from './toolbar';

import MePlay from './meplay';

export default function Maker(play, ctx, bs) {

  const { config } = ctx;

  let mepalette = new MePalette(this, ctx, bs);
  let toolbar = new Toolbar(this, ctx, bs);

  let meplay = new MePlay(this, ctx, bs);

  let meOrme = new Components(this, ctx, bs);

  let magic;

  this.init = data => {
    magic = new Magic();
    magic.init({});

    toolbar.init({});

    meOrme.init({
      'edit': mepalette,
      'play': meplay
    });

    meOrme.active('edit', { magic });
  };

  this.attach = () => {
    toolbar.attach();
  };

  const maybeSave = callMaybe(config.events.onSave);

  this.play = () => {
    let active = meOrme.activeKey() === 'play'?'edit':'play';
    meOrme.active(active, { magic });
  };

  this.save = () => {
    maybeSave(magic.export());
  };

  this.load = (data) => {
    magic.import(data);
  };

  this.update = delta => {
    toolbar.update(delta);
    mepalette.update(delta);
    meplay.update(delta);
  };


  this.render = () => {
    toolbar.render();
    mepalette.render();
  };
  
}

function MePalette(play, ctx, bs) {

  let mepalette = new MagicComponents(this, ctx, bs);
  let me = new Me(this, ctx, bs);
  let palette = new Palette(this, ctx, bs);

  mepalette.add(me);
  mepalette.add(palette);

  this.init = data => {
    let magic = data.magic;

    me.init({magic});
    palette.init({magic});
  };

  this.attach = () => {
    mepalette.attach();
  };

  this.detach = () => {
    mepalette.detach();
  };

  this.update = delta => {
    mepalette.update(delta);
  };


  this.render = () => {
    mepalette.render();
  };
  
}
