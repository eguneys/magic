import { rect } from './dquad/geometry';
import MagicCollisionGroup from './magiccollisiongroup';

export default function MagicMaker() {

  let tColl = new MagicCollisionGroup(0, 0, 1000, 500, 10);
  let hColl = new MagicCollisionGroup(0, 0, 1000, 1000, 10);

  let Handle = 'handle',
      Toolbar = 'toolbar';

  this.debug = hColl.debug;

  this.addHandle = hColl.addItemByType(Handle);
  this.eachHandle = hColl.eachItemByType(Handle);
  this.moveHandle = hColl.moveItemByType(Handle);
  this.oneHandleCollidesAnyHandle = hColl.oneTypeCollidesAnyType(Handle);
  this.handleCollidesPoint = hColl.oneTypeCollidesPoint(Handle);

  this.addToolbar = tColl.addItemByType(Toolbar);
  this.eachToolbar = tColl.eachItemByType(Toolbar);
  this.toolbarCollidesPoint = tColl.oneTypeCollidesPoint(Toolbar);

}
