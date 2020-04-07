export default function Monster(magic) {
  
  let key, pos;

  this.init = (data) => {
    key = data.key;
    pos = data.pos;
  };

  this.pos = () => pos;
  this.role = 'mage';

  this.update = () => {


  };

}
