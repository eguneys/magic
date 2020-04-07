import { point } from './asprite';

const wholeFrame = (scene, image, w, h = w) =>
      scene.texture(image)
      .frame(point(), point(w, h));

const makeFrame = atlas => (x, y, w, h = w, anchor) => 
      atlas.frame(point(x, y),
                  point(w, h), point(anchor, anchor));

const animation = (fM, x, y, w, n) => {
  let res = [];
  for (let i = 0; i < n; i++) {
    res.push(fM(x + i * w, y, w, w));
  }
  return res;
};

const numbers = (tss, numbersFrame) => {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, ','].forEach((no, i) =>
    // tss['number' + no] = scene.texture(labelTexture(no + ''))
    tss['number' + no] = numbersFrame(0, i * 16, 18, 16)
  );
};

const quotes = (tss, numbersFrame) => {
  tss['qPlus'] = numbersFrame(32, 0, 17, 17);
  tss['qDiv'] = numbersFrame(64, 0, 18, 17);
  tss['qMinus'] = numbersFrame(32, 32, 16, 16);
  tss['qDot'] = numbersFrame(32, 32 + 16, 16, 16);
  tss['qQuestion'] = numbersFrame(64, 32, 17, 17);
};

const slice9 = (mFrame, x, y, w, h) => {
  return [
    mFrame(x, y, w, h),
    mFrame(x + w, y, w, h),
    mFrame(x + w * 2, y, w, h),
    mFrame(x, y + h, w, h),
    mFrame(x + w, y + h, w, h),
    mFrame(x + w * 2, y + h, w, h),
    mFrame(x, y + h * 2, w, h),
    mFrame(x + w, y + h * 2, w, h),
    mFrame(x + w * 2, y + h * 2, w, h)
  ];
};

const huds = (tss, hudFrame) => {
  tss['button'] = hudFrame(0, 0, 32, 16);
  tss['upgrade'] = hudFrame(16 * 3, 0, 16);

  tss['menuclose'] = hudFrame(32, 0, 16);
  tss['menubg9'] = slice9(hudFrame, 0, 16, 16, 16);

  tss['upgradebg9'] = slice9(hudFrame, 48, 16, 16, 32 / 3);
};

export default function makeSprites(scene, assets) {

  const magicAtlas = scene.texture(assets['magic']);
  const magicFrame = makeFrame(magicAtlas);

  const numbersAtlas = scene.texture(assets['numbers']);
  const numbersFrame = makeFrame(numbersAtlas);

  const hudFrame = makeFrame(scene.texture(assets['hud']));

  const tss = {};

  numbers(tss, numbersFrame);
  quotes(tss, numbersFrame);

  huds(tss, hudFrame);

  const white = scene.texture(bgTexture('white')),
        black = scene.texture(bgTexture('black')),
        gray = scene.texture(bgTexture('#222222')),
        gray2 = scene.texture(bgTexture('#dddddd')),
        gray3 = scene.texture(bgTexture('#cccccc')),
        brown = scene.texture(bgTexture('brown')),
        yellow = scene.texture(bgTexture('yellow')),
        red = scene.texture(bgTexture('red')),
        green = scene.texture(bgTexture('green'));

  return {
    mtree: magicFrame(0, 0, 8),
    mdirt: magicFrame(8, 0, 8),
    mdirtred: magicFrame(0, 8, 8),
    mdirtblue: magicFrame(8, 8, 8),
    mvill: magicFrame(16, 0, 8),
    mvillred: magicFrame(16, 8, 8),
    mvillblue: magicFrame(24, 0, 8),
    mmageright: magicFrame(0, 16, 8),
    mmageleft: magicFrame(8, 16, 8),
    mmagefront: magicFrame(0, 24, 8),
    mmageback: magicFrame(8, 24, 8),
    white: white,
    black: black,
    gray: gray,
    gray2: gray2,
    gray3: gray3,
    brown: brown,
    red: red,
    green: green,
    yellow: yellow,
    mage: yellow,
    platform: brown,
    phandle: white,
    tPlay: red,
    toolbar: gray,
    ...tss
  };
}

const labelTexture = (label) => {
  return withCanvasTexture(label.length * 256 * 0.5, 256, (w, h, canvas, ctx) => {
    // ctx.fillStyle = 'red';
    // ctx.fillRect(0, 0, w, h);
    ctx.font = '50pt Baloo';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, w / 2, 50);
    
    return canvas;
  });
};

const bgTexture = (color) => {
  return withCanvasTexture(256, 256, (w, h, canvas, ctx) => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, w, h);
    return canvas;
  });
};

function withCanvasTexture(width, height, f) {
  var canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  f(width, height, canvas, canvas.getContext('2d'));

  // document.body.appendChild(canvas);

  let texture = canvas;
  return texture;
}
