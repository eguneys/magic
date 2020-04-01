export default function Start() {

  let play;
  
  this.init = data => {
    play = data;
  };


  this.api = () => ({
    
    load: (data) => {
      play.load(data);
    }

  });
  
}
