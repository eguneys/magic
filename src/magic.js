import MagicCollisionGroup from './magiccollisiongroup';

export default function Magic() {

  let gColl = new MagicCollisionGroup();

  let Hero = 'hero',
      Platform = 'platform';

  gColl.addItemByType(Platform);
  gColl.addItemByType(Hero);

  this.eachPlatform = gColl.eachItemByType(Platform);

  this.addPlatform = gColl.addItemByType(Platform);

  this.movePlatform = gColl.moveItemByType(Platform);

  this.onePlatformCollidesAnyPlatform = gColl.oneTypeCollidesAnyType(Platform);

}
