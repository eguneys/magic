import MagicCollisionGroup from './magiccollisiongroup';

export default function Magic() {

  let gColl = new MagicCollisionGroup(0, 0, 1000, 1000, 7);

  let Mage = 'mage',
      Platform = 'platform';

  this.debug = gColl.debug;

  this.addMage = gColl.addItemByType(Mage);
  this.eachMage = gColl.eachItemByType(Mage);
  this.moveMage = gColl.moveItemByType(Mage);

  this.mageCollidesPlatform = gColl.oneTypeCollidesAnyType(Platform);

  this.addPlatform = gColl.addItemByType(Platform);
  this.eachPlatform = gColl.eachItemByType(Platform);

  this.movePlatform = gColl.moveItemByType(Platform);

  this.onePlatformCollidesAnyPlatform = gColl.oneTypeCollidesAnyType(Platform);

}
