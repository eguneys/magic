import MagicMouse from './magicmouse';
import MagicComponent from './magiccomponent';
import MagicSprite from './magicsprite';

export default function Toolbar(play, ctx, bs) {

  const { events, frames, layers: { twoLayer } } = ctx;

  let dSave = new MagicSprite(this, ctx, { local: {
    x: bs.toolbar.x,
    y: bs.toolbar.y,
    width: bs.tileSize * 2.0,
    height: bs.toolbar.height,
    frame: frames['red']
  }});

  let dPlay = new MagicSprite(this, ctx, { local: {
    x: bs.toolbar.x + bs.tileSize * 2.0,
    y: bs.toolbar.y,
    width: bs.tileSize * 2.0,
    height: bs.toolbar.height,
    frame: frames['green']
  }});

  let components = new MagicComponent(play, ctx, bs);
  let mouseHandler = new MagicMouse(play, ctx, {
    onClick: (epos) => {
      const hitSave = dSave.hitTest(...epos);
      const hitPlay = dPlay.hitTest(...epos);

      if (hitSave) {
        play.save();
      }

      if (hitPlay) {
        play.play();
      }

    }
  });

  components.add(dSave);
  components.add(dPlay);


  this.init = data => {
    dSave.init({});
    dPlay.init({});
  };


  this.attach = () => {
    dSave.add(twoLayer);
    dPlay.add(twoLayer);
  };

  this.detach = () => {
    dSave.remove();
    dPlay.remove();
  };

  this.update = delta => {
    mouseHandler.update(delta);
    components.update(delta);
  };


  this.render = () => {
    components.render();
  };
  
}
