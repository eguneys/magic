import { rect } from './dquad/geometry';
import MagicCollisionGroup from './magiccollisiongroup';

export default function MagicMaker() {

  let hColl = new MagicCollisionGroup();

  let Handle = 'handle';

  this.debug = hColl.debug;

  this.addHandle = hColl.addItemByType(Handle);

  this.eachHandle = hColl.eachItemByType(Handle);

  this.moveHandle = hColl.moveItemByType(Handle);

  this.oneHandleCollidesAnyHandle = hColl.oneTypeCollidesAnyType(Handle);

  this.handleCollidesPoint = hColl.oneTypeCollidesPoint(Handle);


}
