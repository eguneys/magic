export default function Tapper() {

  let score = 1234567;
  let tap = 1;

  let menu;

  this.score = () => score;
  this.tap = () => tap;
  this.menu = () => menu;
  this.tappy = () => !menu;

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
