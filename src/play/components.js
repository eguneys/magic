export default function Components(play, ctx, bs) {
  
  let components;

  this.init = (data) => {
    components = data.components;
  };

  this.update = delta => {
    components.forEach(_ => _.update(delta));
  };

  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
