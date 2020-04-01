import TilingSprite from './tilingsprite';
import MagicSprite from './magicsprite';

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

  let dBuildings = new TilingSprite(this, ctx, {
    local: { x: 0, y: 0, 
             tileWidth: bs.height * 2.0, 
             tileHeight: bs.height,
             width: bs.width }, ...bs 
  }, frames['bgBuildings']);

  let components = [];

  this.init = data => {
    bg.init({});
    components.push(bg);
    clouds.init({});
    components.push(clouds);
    dBuildings.init({});
    components.push(dBuildings);
  };

  let tick = 0;

  this.update = delta => {
    bg.tileX(-1 * delta * 0.01);
    clouds.tileX(-2 * delta * 0.01);
    dBuildings.tileX(-3 * delta * 0.01);
    components.forEach(_ => _.update(delta));
  };


  this.render = () => {
    components.forEach(_ => _.render());
  };
  
}
