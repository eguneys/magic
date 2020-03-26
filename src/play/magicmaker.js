export default function MagicMaker(play, ctx, bs) {

  const { events } = ctx;

  const { platform: { width: platformWidth, height: platformHeight } } = bs;

  let magic;

  this.init = data => {
    magic = data.magic;
  };

  const addPlatform = (x, y) => {
    magic.addPlatform(x, y, platformWidth, platformHeight);
  };

  const handleMouse = () => {
    const { current } = events.data;

    if (current) {

      let { start, dpos, ending } = current;

      if (ending) {

        addPlatform(start[0] + dpos[0], start[1] + dpos[1]);
        
      } else {
        // console.log(start, dpos);
      }
    }

  };

  this.update = delta => {
    handleMouse();
  };


  this.render = () => {
    
  };
  
}
