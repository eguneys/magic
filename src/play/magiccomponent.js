export default function MagicComponent(play, ctx, bs) {

  let components = [];

  this.init = data => {
  };

  this.add = view => components.push(view);

  this.each = fn => components.forEach(fn);

  this.update = delta => {
    this.each(_ => _.update(delta));
  };


  this.render = () => {
    this.each(_ => _.render());
  };
  
}
