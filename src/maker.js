export default function Maker() {

  const PutHero = 'puthero',
        EditPlatform = 'editplatform';

  let state;

  this.init = () => {
    state = PutHero;
  };

  this.putHero = () => {
    return state === PutHero;
  };
  
}
