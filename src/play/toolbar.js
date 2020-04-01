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

  let components = new MagicComponent(play, ctx, bs);
  let mouseHandler = new MagicMouse(play, ctx, {
    onClick: (epos) => {
      const hitSave = dSave.hitTest(epos[0], epos[1]);

      if (hitSave) {
        play.save();
      }

    }
  });

  this.init = data => {

    dSave.init({});
    dSave.add(twoLayer);
    components.add(dSave);
  };

  this.update = delta => {
    mouseHandler.update(delta);
    components.update(delta);
  };


  this.render = () => {
    components.render();
  };
  
}
