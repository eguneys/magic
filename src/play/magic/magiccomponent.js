export default function MagicComponent(play, ctx, bs) {

  let components = [];

  this.init = data => {
  };

  this.add = (view, onAttach) => components.push({
    view,
  });

  this.each = fn => components.forEach(({ view }) => fn(view));

  this.attach = () => {
    this.each(_ => _.attach());
  };

  this.detach = () => {
    this.each(_ => _.detach());
  };

  this.update = delta => {
    this.each(_ => _.update(delta));
  };


  this.render = () => {
    this.each(_ => _.render());
  };
  
}
