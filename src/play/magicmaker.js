import Pool from 'poolf';

import MagicHandle from './magichandle';

export default function MagicMaker(play, ctx, bs) {

  const { events } = ctx;

  const { platform: { width: platformWidth,
                      height: platformHeight } } = bs;

  let magic,
      maker,
      magicCollision;

  let dHandles = new Pool(() => new MagicHandle(play, ctx, bs));

  this.init = data => {
    magic = data.magic;
    maker = data.maker;
  };

  const addPlatform = (x, y) => {
    let { bounds: platformBounds } = magic.addPlatform(x, y, 
                                                       platformWidth,
                                                       platformHeight);

    dHandles.acquire(_ => _.init({
      magic,
      maker,
      platformBounds,
      x, y
    }));
  };

  const clickHandle = (x, y) => {
    let collisions = maker.doHandleClick(x, y);

    if (collisions.length === 0) {
      addPlatform(x, y);
    }
  };

  const selectedHandle = () => dHandles.find(_ => _.selected());

  const moveHandle = (x, y) => {
    let selected = selectedHandle();

    if (selected) {
      selected.move(x, y);
    }
  };

  const endHandle = () => {
    let selected = selectedHandle();

    if (selected) {
      selected.deselect();
    }
  };

  const handleMouse = () => {
    let { epos, current } = events.data;

    if (current) {
      let { tapping, epos, ending } = current;

      if (tapping) {
        clickHandle(...epos);
      } else if (ending) {
        endHandle();
      } else {
        moveHandle(...epos);
      }
    }

    if (epos) {
      // highlightHandle(...epos);
    }
  };

  this.update = delta => {
    handleMouse();

    dHandles.each(_ => _.update(delta));

  };


  this.render = () => {
    dHandles.each(_ => _.render());
  };
  
}
