import { sprite } from '../asprite';

import * as v from '../vec2';

export default function Board(play, ctx, bs) {

  const { hole, card: { width: cardWidth } } = bs;

  let card1 = new Card(this, ctx, bs);
  let card2 = new Card(this, ctx, bs);

  this.init = data => {

    let x = hole.x,
        y = hole.y;

    card1.init({ x, y });
    card2.init({ x: x + cardWidth, y });
  };

  this.update = delta => {
    card1.update(delta);
  };


  this.render = () => {
    card1.render();
  };
  
}

function Card(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;

  const { card: { width, height } } = bs;

  let dBg = sprite(frames['front']);
  dBg.width = width;
  dBg.height = height;

  let shapeW = width * 0.4;

  let dShape = sprite(frames['diamond']);
  dShape.width = shapeW;
  dShape.height = shapeW;

  let smallShapeW = width * 0.4,
      smallShapeX = width * 0.08;

  let smallShapeY = smallShapeX * 0.6;

  let dTopLetter = sprite(frames['letters']['a']);
  dTopLetter.width = smallShapeW;
  dTopLetter.height = smallShapeW;


  let dTopLeft = sprite(frames['diamond']);
  dTopLeft.width = smallShapeW * 0.8;
  dTopLeft.height = smallShapeW * 0.8;

  let dBottomLetter = sprite(frames['letters']['a']);
  dBottomLetter.width = smallShapeW;
  dBottomLetter.height = -smallShapeW;

  let globalPosition;

  this.init = data => {

    globalPosition = [data.x, data.y];

    oneLayer.add(dBg);
    oneLayer.add(dShape);
    //oneLayer.add(topLeft);
    oneLayer.add(dTopLetter);
    oneLayer.add(dBottomLetter);

    setPosition();
  };

  const setPosition = () => {
    let bg = [0, 0];

    let shape = [(width - shapeW) * 0.5,
                    (height - shapeW) * 0.5];

    let topLetter = [smallShapeX,
                        smallShapeY];

    let topLeft = [smallShapeX,
                   smallShapeY + smallShapeW];


    let bottomLetter = [width - smallShapeW - smallShapeX,
                        height - smallShapeY];

    v.add(bg, globalPosition);
    v.add(shape, globalPosition);
    v.add(topLetter, globalPosition);
    v.add(topLeft, globalPosition);
    v.add(bottomLetter, globalPosition);

    dBg.position.set(...bg);
    dShape.position.set(...shape);
    dTopLetter.position.set(...topLetter);
    dTopLeft.position.set(...topLeft);
    dBottomLetter.position.set(...bottomLetter);
  };
  
  this.update = delta => {
  };


  this.render = () => {
    
  };
  
}
