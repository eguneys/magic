import Collt from './collt';

export default function MagicCollision() {
  let bounds = { x: 0, y: 0, width: 1000, height: 1000 };

  let collt = new Collt(bounds);

  const Mage = 'mage',
        Platform = 'platform';
  
  const collisionItem = type => (onCollision, data) => ({
    type,
    onCollision,
    data
  });

  const itemData = item => item.data;
  const isType = type => item => item.type === type;

  const mage = collisionItem(Mage),
        isMage = isType(Mage),
        platform = collisionItem(Platform),
        isPlatform = isType(Platform);

  this.mageCollision = (data, bounds, onCollidePlatform) => {
    const onCollision = (item2) => {
      if (isPlatform(item2)) {
        onCollidePlatform(itemData(item2));
      }
    };

    collt.addRectangle(mage(onCollision, data),
                       bounds);
  };

  this.platformCollision = (data, bounds) => {
    const onCollision = () => {
      
    };

    collt.addRectangle(platform(onCollision, data),
                       bounds);
  };

  const detectAll = collt.lazyDetectAllCollisions(_ => true);

  this.update = (delta) => {

  };
}
