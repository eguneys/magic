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

export default function makeSprites(scene, assets) {

  const magicAtlas = scene.texture(assets['magic']);
  const magicFrame = makeFrame(magicAtlas);

  const white = scene.texture(bgTexture('white')),
        black = scene.texture(bgTexture('black')),
        gray = scene.texture(bgTexture('gray')),
        brown = scene.texture(bgTexture('brown')),
        yellow = scene.texture(bgTexture('yellow')),
        red = scene.texture(bgTexture('red')),
        green = scene.texture(bgTexture('green'));        

  return {
    bg: magicFrame(0, 112, 256, 128),
    clouds: magicFrame(0, 0, 256, 112),
    white: white,
    black: black,
    gray: gray,
    brown: brown,
    mage: yellow,
    platform: brown,
    phandle: white,
    tPlay: red,
    toolbar: gray
  };
}


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

  let texture = canvas;
  return texture;
}
