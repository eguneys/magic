import { combineRect, withinRect } from './util';

import ipol from '../ipol';

export default function MagicScroll(play, ctx, bs) {

  const { events } = ctx;

  let components = [];

  let moveX,
      moveY;

  let scrollX, 
      scrollY;

  let bufferScroll;

  let layer;

  let iScrollOffset = new ipol(0, 0, {});
  let dirtyComponents;

  this.init = data => {
    moveX = 0;
    moveY = 0;
    scrollX = 0;
    scrollY = 0;

    bufferScroll = 0;

    iScrollOffset.both(0, 0);

    dirtyComponents = true;
  };

  this.add = (_layer) => {
    layer = _layer;
    dirtyComponents = true;
  };

  this.remove = () => {
    components.forEach(_ => _.remove());
  };

  this.addComponent = (component) => {
    components.push(component);
  };

  this.move = (x, y) => {
    moveX = x;
    moveY = y;
  };

  this.bounds = () => components
    .map(_ => _.bounds())
    .reduce((acc, dS) => 
      combineRect(acc, dS));

  const scroll = y => {
    bufferScroll = y;
    dirtyComponents = true;
  };

  const commitScroll = () => {
    scrollY += bufferScroll;
    bufferScroll = 0;
  };

  const handleSwipe = () => {
    const { current } = events.data;

    if (current) {
      let { ending, dpos } = current;

      scroll(dpos[1]);

      if (ending) {
        commitScroll();
      }

    }
    
  };

  const updateComponents = () => {

    if (!layer || !dirtyComponents) {
      return;
    }
    dirtyComponents = false;

    components.forEach(_ => {
      if (withinRect(bs, _.bounds())) {
        _.add(layer);
      } else {
        _.remove();
      }
    });
    
  };

  const handleBounds = (delta) => {
    let vScrollOffset = iScrollOffset.value();
    iScrollOffset.update(delta * 0.01);

    if (!iScrollOffset.settled()) {
      scrollY = vScrollOffset;
      dirtyComponents = true;
    } else {
      if (scrollY > 1) {
        iScrollOffset.both(scrollY, 0);
      }

      const allBounds = this.bounds();

      let allBoundsY1 = allBounds.y + allBounds.height;
      let bsY1 = bs.y + bs.height;
      let bottomDiff = allBoundsY1 - bsY1;

      if (bufferScroll === 0 && bottomDiff < -1) {
        iScrollOffset.both(scrollY, scrollY - bottomDiff);
      }

    }
  };

  this.update = delta => {
    handleSwipe();
    components.forEach(_ => _.update(delta));

    handleBounds(delta);
  };


  this.render = () => {
    components.forEach(_ => _.move(moveX + scrollX, moveY + scrollY + bufferScroll));
    components.forEach(_ => _.render());

    // bug fix
    updateComponents();
  };
  
}
