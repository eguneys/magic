export default function MagicMaker(play, ctx, bs) {

  const { events } = ctx;

  const { platform: { width: platformWidth, height: platformHeight } } = bs;

  let magic,
      maker;

  this.init = data => {
    magic = data.magic;
    maker = data.maker;
  };

  const addPlatform = (x, y) => {
    let pHandle = magic.addPlatform(x, y, platformWidth, platformHeight);

    let hHandle = maker.addHandle(x, y, platformWidth, platformHeight, 
                                  pHandle);

    magic.onePlatformCollidesAnyPlatform(pHandle, (platform) => {
      console.log(pHandle, platform);
    });
  };

  const highlightHandle = (x, y) => {
    maker.handleCollidesPoint(x, y, ({ item }) => {
      item.highlight = true;
    });
  };

  let selectedHandle;

  const handleSelect = (x, y) => {
    maker.handleCollidesPoint(x, y, (handle) => {
      selectedHandle = handle;
      handle.item.select = true;
    });
  };

  const handleMove = (x, y) => {
    if (selectedHandle) {
      selectedHandle = maker.moveHandle(selectedHandle, x, y);
      selectedHandle.item.data = magic.movePlatform(selectedHandle.item.data, x, y);
    }
  };

  const handleRelease = () => {
    delete selectedHandle.select;
    selectedHandle = null;
  };

  const handleMouse = () => {
    const { epos, current } = events.data;

    if (current) {

      let { tapping, start, epos, dpos, ending } = current;

      if (ending) {

        if (selectedHandle) {
          handleRelease(...epos);
        } else {
          addPlatform(start[0] + dpos[0], start[1] + dpos[1]);
        }
        
      } else {
        if (tapping) {
          handleSelect(...epos);
        } else {
          handleMove(...epos);
        }
      }
    }

    if (epos) {
      highlightHandle(epos[0], epos[1]);
    }
  };

  this.update = delta => {
    handleMouse();
  };


  this.render = () => {
    
  };
  
}
