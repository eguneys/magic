import Collt from './collt';

export default function Magic() {

  let bounds = { x: 0, y: 0, width: 1000, height: 1000 };

  let collt = new Collt(bounds);

  const Mage = 'mage',
        Platform = 'platform';
  
  const collisionItem = type => (filter, onCollision, data) => ({
    type,
    filter,
    onCollision,
    data
  });

  const itemData = item => item.data;
  const isType = type => item => item.type === type;

  const mage = collisionItem(Mage),
        isMage = isType(Mage),
        platform = collisionItem(Platform),
        isPlatform = isType(Platform);

  this.magePlatformCollision = (data, bounds, onCollision) => {
    collt.addRectangle(mage(isPlatform, onCollision, data),
                       bounds);
  };

  this.platformPlatformCollision = (data, bounds, onCollision) => {
    collt.addRectangle(platform(isPlatform, onCollision, data),
                       bounds);
  };

  const detectAll = collt.lazyDetectAllCollisions(_ => true);

  this.update = (delta) => {

    detectAll(({ filter, onCollision, data }, item2) => {
      if (filter(item2)) {
        onCollision(itemData(item2));
      }
    });
    
  };
}
