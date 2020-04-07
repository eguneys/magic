import { sprite } from '../asprite';

function digitize(number) {
  const res = [];

  while (number > 0) {
    res.unshift(number % 10);
    number = (number - (number % 10)) / 10;
  }
  return res;
}

export default function MagicNumber(play, ctx, bs) {

  let { size, x: baseX, y: baseY } = bs;

  let xOffset = size,
      commaOffset = xOffset - size * 0.15;

  const { frames } = ctx;

  const makeSprite = (_) => sprite(frames['number' + _]);

  let sprites = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(makeSprite);

  let commas = [',', ','].map(makeSprite);

  const placeSprite = (_, x) => {
    _.position.x = baseX + x;
    _.position.y = baseY;
    _.width = size;
    _.height = size * 2.0;
  };

  const placeSprites = (n) => {
    let nextOffset = 0;

    if (n > 1) {
      if (n > 2) {
        if (n > 3) {
          if (n > 4) {
            if (n > 5) {
              if (n > 6) {
                placeSprite(sprites[6], nextOffset);
                nextOffset += commaOffset;
                placeSprite(commas[0], nextOffset);
                nextOffset += commaOffset;
              }
              placeSprite(sprites[5], nextOffset);
              nextOffset += xOffset;
            }
            placeSprite(sprites[4], nextOffset);
            nextOffset += xOffset;
          }
          placeSprite(sprites[3], nextOffset);
          nextOffset += commaOffset;
          placeSprite(commas[1], nextOffset);
          nextOffset += commaOffset;
        }
        placeSprite(sprites[2], nextOffset);
        nextOffset += xOffset;
      }
      placeSprite(sprites[1], nextOffset);
      nextOffset += xOffset;
    }
    placeSprite(sprites[0], nextOffset);
  };

  placeSprites();

  let number,
      nextNumber;

  let alpha;

  this.init = data => {
    number = 0;
    alpha = 1;
  };

  this.alpha = _alpha => {
    alpha = _alpha;
  };

  this.remove = () => {
    sprites.forEach(_ => _.remove());
    commas.forEach(_ => _.remove());
  };

  this.add = layer => {
    sprites.forEach(_ => layer.add(_));
    commas.forEach(_ => layer.add(_));
  };

  this.setNumber = (data) => {
    if (number != data) {
      nextNumber = data;
    }
  };

  this.move = (x, y) => {
    baseX = x;
    baseY = y;
    updateChildren();
  };

  const updateChildren = () => {
    const digits = digitize(number);

    sprites.forEach(_ => _.alpha = 0);

    commas.forEach(_ => _.alpha = 0);

    if (digits.length > 3) {
      commas[1].alpha = alpha;
    }
    if (digits.length > 6) {
      commas[0].alpha = alpha;
    }

    placeSprites(digits.length);

    digits.forEach((digit, i) => {
      const sprite = sprites[digits.length - i - 1];
      sprite.alpha = alpha;
      sprite.frame = frames['number' + digit];
    });
    
  };

  this.update = delta => {

    if (number !== nextNumber) {
      number = nextNumber;
      updateChildren();
    }
  };


  this.render = () => {
    
  };
  
}
