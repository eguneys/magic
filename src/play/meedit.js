import MeView from './meview';

export default function MePlay(play, ctx, bs) {

  const { events } = ctx;

  let dView = new MeView(play, ctx, bs);

  let magic;

  this.init = data => {
    magic = data.magic;
    dView.init({magic});
  };

  this.attach = () => {
    dView.attach();
  };

  this.detach = () => {
    dView.detach();
  };

  const drag = (pos) => {
    dView.drag(pos);
  };

  const commitDrag = () => {
    dView.commitDrag();
  };

  const paint = (epos) => {
    const hitPos = dView.hitPos(epos);

    if (hitPos) {

      magic.paint(hitPos);
    }
  };

  const resize = y => {
    dView.resize(y);
  };

  const handleMouse = () => {
    const { wheel, current } = events.data;

    if (current) {

      let { button, epos, dpos, ending } = current;

      if (button === 1) {
        drag(dpos);
        if (ending) {
          commitDrag();
        }
      } else {
        paint(epos);
      }      
    }
    if (wheel) {
      let { y } = wheel;

      resize(y);
    }
  };

  this.update = delta => {
    handleMouse();
    dView.update(delta);
  };


  this.render = () => {
    dView.render();
  };
  
}
