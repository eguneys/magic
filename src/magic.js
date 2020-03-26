import MagicCollisionGroup from './magiccollisiongroup';

export default function Magic() {

  let gColl = new MagicCollisionGroup();

  let Hero = 'hero',
      Platform = 'platform';

  this.debug = gColl.debug;

  this.addPlatform = gColl.addItemByType(Platform);
  this.addHero = gColl.addItemByType(Hero);

  this.eachPlatform = gColl.eachItemByType(Platform);

  this.movePlatform = gColl.moveItemByType(Platform);

  this.onePlatformCollidesAnyPlatform = gColl.oneTypeCollidesAnyType(Platform);

}
