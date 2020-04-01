export default function ButtonClick(play, ctx, bs) {

  const { events } = ctx;

  let maker;

  this.init = data => {
    maker = data.maker;
  };



  const clickHandle = (x, y) => {
    maker.buttonClick(x, y);
  };

  const handleMouse = () => {
    let { epos, current } = events.data;

    if (current) {
      let { epos, ending } = current;

      if (ending) {
        clickHandle(...epos);
      }
    }

    if (epos) {
      // highlightHandle(...epos);
    }
  };

  this.update = delta => {
    handleMouse();
  };


  this.render = () => {
    
  };
  
}
