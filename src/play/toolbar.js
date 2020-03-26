import MagicSprite from './magicsprite';

export default function Toolbar(play, ctx, bs) {

  const { frames, layers: { fourLayer } } = ctx;

  const { width, height, toolbar: { width: toolbarWidth,
                                    height: toolbarHeight } } = bs;

  let buttonWidth = toolbarWidth / 10,
      buttonHeight = toolbarHeight;

  let playBounds = { x: 0, y: 0,
                     width: buttonWidth,
                     height: buttonHeight };

  let dPlay = new MagicSprite(this, ctx,
                              { local: playBounds, ...bs },
                              frames['tPlay']);

  let magic,
      maker;

  this.init = data => {
    magic = data.magic;
    maker = data.maker;

    dPlay.init({});
    dPlay.add(fourLayer);
  };

  this.update = delta => {
    dPlay.update(delta);
  };


  this.render = () => {
    dPlay.render();
  };
  
}
