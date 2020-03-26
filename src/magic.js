import { makeId, safeRemoveFromArray } from './util';
import { rect } from './dquad/geometry';

import MagicCollision from './magiccolision';

export default function Magic() {

  let coll = new MagicCollision();

  let Hero = 'hero',
      Platform = 'platform';

  const heroItem = {
    hero: true
  };

  const platformItem = () => ({
    id: makeId(),
    platform: true
  });

  let heroRect,
      heroColl;

  let platforms = [];

  this.addHero = (x, y, w, h) => {
    heroRect = rect(x,y,w,h);
    heroColl = coll.addCollision(Hero, heroRect, heroItem);
  };
  this.moveHero = (x, y) => {
    heroRect.move(x, y);
    coll.updateCollision(heroColl, heroRect, heroItem);
  };

  this.hero = () => !!heroRect;

  this.heroRect = () => {
    return heroRect;
  };

  this.heroItem = () => {
    return heroItem;
  };

  this.platforms = () => platforms;
  this.eachPlatform = (fn) => platforms.forEach(fn);

  this.addPlatform = (x, y, w, h) => {
    let pRect = rect(x, y, w, h);
    let handle = coll.addCollision(Platform, pRect, platformItem());

    platforms.push(handle);
    return handle;
  };

  this.removePlatform = (handle) => {
    safeRemoveFromArray(platforms, handle);
    coll.deleteCollision(handle);
  };

  this.heroCollidesPlatform = (onCollide) => {
    this.detectCollision(Hero, Platform, onCollide);
  };
}
