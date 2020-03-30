import Phy from './physics';

export default function MagicPhysics() {

  let phy = new Phy({gravity: [0, 10]});

  let bounds;

  let wasGrounded;
  let grounded;

  this.init = (data) => {
    bounds = data.bounds;
    grounded = false;
    wasGrounded = false;

    phy.pos(bounds.x, bounds.y);    
  };

  this.grounded = (value = grounded) => {
    grounded = value;
    return grounded;
  };

  this.update = delta => {

    if (grounded) {
      wasGrounded = true;
    } else {
      if (wasGrounded) {
        phy.pos(bounds.x, bounds.y);
        wasGrounded = false;
      }
      phy.update(delta * 0.016);
      let pos = phy.pos();
      bounds.x = pos[0];
      bounds.y = pos[1];
    }
  };
  
}
