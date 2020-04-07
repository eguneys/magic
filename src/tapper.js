export default function Tapper() {

  let score;
  let tap;

  let menu;

  let upgrades;

  this.init = data => {
    score = 0;
    tap = 1;
    upgrades = [1,2,3,4,5,6,7];
  };

  this.score = () => score;
  this.tap = () => tap;
  this.menu = () => menu;
  this.tappy = () => !menu;
  this.upgrades = () => upgrades;

  this.doTap = () => {
    score += tap;
    return tap;
  };


  this.open = (_menu) => {
    menu = _menu;
  };

  this.close = () => {
    menu = undefined;
  };

  this.toggle = (_menu) => {
    if (menu) {
      this.close();
    } else {
      this.open(_menu);
    }
  };

};

export const Menus = {
  Upgrade: 'upgrade'
};
