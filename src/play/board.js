import Magic from '../magic';
import Maker from '../maker';

import Toolbar from './toolbar';
import ButtonClick from './buttonclick';

export default function Board(play, ctx, bs) {

  let components = [];
  let toolbar = new Toolbar(play, ctx, bs);
  let buttonClick = new ButtonClick(play, ctx, bs);

  this.init = data => {

    let magic = new Magic();
    let maker = new Maker();

    buttonClick.init({ maker });

    toolbar.init({magic, maker});
    components.push(toolbar);
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
    buttonClick.update(delta);
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
