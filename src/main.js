import Loop from 'loopz';

import Api from './start';
import Assets from './assets';
import Events from './events';
import Canvas from './canvas';
import Config from './config';

import makeLayers from './layers';
import makeFrames from './sprites';

import HitBox from './hitbox';

import Play from './play';

export function app(element, options) {

  let assetsUrl = 'assets/images/';

  const api = new Api();

  new Assets({
    'magic': 'magic.png',
    'numbers': 'numbers.png',
    'hud': 'mhud.png'
  }, { assetsUrl }).start()
    .then(assets => {

      const canvas = new Canvas(element);

      const events = new Events(canvas);
      events.bindTouch();

      const hitBox = new HitBox(canvas);

      const frames = makeFrames(canvas.scene, assets);

      const config = Config(options);

      const context = {
        config,
        events,
        assets,
        canvas,
        hitBox,
        frames,
        layers: makeLayers(canvas.scene)
      };

      let play = new Play(context);
      api.init(play);

      play.init({});

      new Loop(delta => {
        events.update(delta);
        play.update(delta);
        play.render();
        canvas.scene.render();
      }).start();
    });

  return api.api();
}
