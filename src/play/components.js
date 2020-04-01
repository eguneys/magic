export default function Components(play, ctx, bs) {

  let activeKey;
  let active;

  let components;

  this.init = (data) => {
    components = data;
  };

  const deactive = () => {
    if (active) {
      active.detach();
    }
  };

  this.activeKey = () => activeKey;

  const doactive = (key, data) => {
    activeKey = key;
    active = components[key];
    active.init(data);
    active.attach();
  };

  this.active = (key, data) => {
    deactive();
    doactive(key, data);
  };

  this.update = delta => {
    if (active) {
      active.update(delta);
    }
  };

  this.render = () => {
    if (active) {
      active.render();
    }
  };
  
}
