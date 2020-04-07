import { rect } from '../dquad/geometry';
import TapperView from './tapper';

import Tapper from '../tapper';

export default function Play(ctx) {

  const { config,
          canvas, 
          layers: { scene, zeroLayer }, 
          frames } = ctx;

  const bs = (() => {
    const { width, height } = canvas;

    let margin = 10;

    let buttonHeight = 60,
        buttonWidth = buttonHeight * 2;

    let score = rect(margin, margin, 20, 20);

    let upgrade = rect(margin, 
                       height - margin - buttonHeight,
                       buttonWidth,
                       buttonHeight);

    let tap = rect(score.x,
                   40,
                   width,
                   height - score.height * 4.0 - upgrade.height);


    let menuWidth = width * 0.9,
        menuHeight = height * 0.8;
    
    let menuCloseWidth = width * 0.16;

    let menu = rect((width - menuWidth) * 0.5,
                    (height - menuHeight) * 0.5,
                    menuWidth,
                    menuHeight);

    let menuClose = rect(menu.x1 - menuCloseWidth,
                         menu.y - menuCloseWidth,
                         menuCloseWidth,
                         menuCloseWidth);

    let menuUpgrade = rect(0, 0, width, buttonHeight * 1.5);

    return {
      menuClose,
      menuUpgrade,
      menu,
      tap,
      score,
      upgrade,
      width,
      height
    };
  })();

  let components = [];

  let dTapper = new TapperView(this, ctx, bs);

  this.init = data => {
    let tapper = new Tapper();
    tapper.init({});

    dTapper.init({tapper});
    components.push(dTapper);
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
