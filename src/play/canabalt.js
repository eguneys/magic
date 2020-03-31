import TilingSprite from './tilingsprite';

export default function Canabalt(play, ctx, bs) {

  const { frames, layers: { oneLayer } } = ctx;
  
  let halfHeight = bs.height * 0.5;

  let bg = new TilingSprite(this, ctx, {
    local:  { x: 0, y: 0, 
              tileWidth: bs.height * 2.0, 
              tileHeight: bs.height,
              width: bs.width }, ...bs 
  }, frames['bg']);

  let clouds = new TilingSprite(this, ctx, {
    local: { x: 0, y: 0, 
             tileWidth: bs.height, 
             tileHeight: bs.height * 0.5,
             width: bs.width }, ...bs 
  }, frames['clouds']);


  this.init = data => {
    bg.init({});
    clouds.init({});
  };

  this.update = delta => {
    bg.tileX(-1);
    clouds.tileX(-2);
    bg.update(delta);
    clouds.update(delta);
  };


  this.render = () => {
    bg.render();
    clouds.render();
  };
  
}
