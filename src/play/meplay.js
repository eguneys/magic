import MeView from './meview';

export default function MePlay(play, ctx, bs) {

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

  this.update = delta => {
    dView.update(delta);
  };


  this.render = () => {
    dView.render();
  };
  
}
