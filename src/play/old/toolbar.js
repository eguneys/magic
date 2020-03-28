import MagicSprite from './magicsprite';

const wParent = (parent, child) => {
  return {
    ...child,
    x: child.x + parent.x,
    y: child.y + parent.y
  };
};

export default function Toolbar(play, ctx, bs) {

  const { events, frames } = ctx;

  const { width, height, toolbar } = bs;

  let nbButtons = 8;

  let buttonWidth = toolbar.width,
      buttonHeight = toolbar.height / nbButtons;

  let playBounds = { x: 0, y: 0,
                     width: buttonWidth,
                     height: buttonHeight };

  let dPlay = new Button(play, ctx, 
                         { local: wParent(toolbar, playBounds), ...bs },
                         frames['tPlay']);

  let dButtons = [dPlay];

  let magic,
      maker;

  this.init = data => {
    magic = data.magic;
    maker = data.maker;

    dPlay.init({maker, onClick: onPlayClicked });
  };


  const onPlayClicked = () => {
    play.addMage();
  };

  const highlightHandle = (x, y) => {
    maker.toolbarCollidesPoint(x, y, ({ item }) => {
      item.highlight = true;
    });
  };

  const getButtonByHandleId = (id) =>
        dButtons.find(_ => _.handleId() === id);

  const clickHandle = (x, y) => {
    maker.toolbarCollidesPoint(x, y, ({ item }) => {
      let button = getButtonByHandleId(item.id);

      button.click();
    });
  };

  const handleMouse = () => {
    let { epos, current } = events.data;

    if (current) {
      let { epos, ending } = current;

      if (ending) {
        clickHandle(...epos);
      }
      
    }

    if (epos) {
      highlightHandle(...epos);
    }
  };

  this.update = delta => {
    handleMouse();
    dPlay.update(delta);
  };


  this.render = () => {
    dPlay.render();
  };
  
}

function Button(play, ctx, bs, frame) {

  const { frames, layers: { fourLayer } } = ctx;

  let { local: { x, y, width, height } } = bs;

  let dS = new MagicSprite(this, ctx, bs,
                           frame);

  let handle;

  let maker;

  let onClick;

  this.init = data => {
    maker = data.maker;
    onClick = data.onClick;

    dS.init({});
    dS.add(fourLayer);

    handle = maker.addToolbar(x, y, width, height);
  };

  this.click = () => {
    onClick();
  };

  this.handle = () => handle;
  this.handleId = () => handle.item.id;

  this.update = delta => {
    dS.update(delta);
  };

  this.render = () => {
    dS.render();
  };

}
