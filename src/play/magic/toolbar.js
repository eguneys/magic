import MagicSprite from './magicsprite';

const wParent = (parent, child) => {
  return {
    ...child,
    x: child.x + parent.x,
    y: child.y + parent.y
  };
};

export default function Toolbar(play, ctx, bs) {

  const { frames } = ctx;

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


  let maker;

  this.init = data => {
    maker = data.maker;

    dPlay.init({ maker, onClick: onPlayClicked });
  };

  const onPlayClicked = () => {
    play.addMage();
  };


  this.update = delta => {
    dPlay.update(delta);
  };


  this.render = () => {
    dPlay.render();
  };
  
}

function Button(play, ctx, bs, frame) {
  const { events, frames, layers: { fourLayer } } = ctx;
  
  let { local } = bs;


  let dS = new MagicSprite(this, ctx, bs,
                           frame);

  let collider;

  let maker;

  this.init = data => {
    maker = data.maker;

    dS.init({});
    dS.add(fourLayer);

    let bounds = {
      x: local.x,
      y: local.y,
      w: local.width,
      h: local.height
    };

    maker.buttonCollision(bounds, data.onClick);
  };

  this.update = delta => {
    dS.update(delta);
  };


  this.render = () => {
    dS.render();
  };

}
