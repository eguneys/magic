import { rect } from './dquad/geometry';

import MagicCollision from './magiccolision';

export default function Magic() {

  let coll = new MagicCollision();

  let Hero = 'hero',
      Platform = 'platform';

  const heroItem = {
    hero: true
  };

  const platformItem = {
    platform: true
  };

  let heroRect,
      heroColl;

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

  this.addPlatform = (x, y, w, h) => {
    let pRect = rect(x, y, w, h);
    return coll.addCollision(Platform, pRect, platformItem);
  };

  this.removePlatform = (handle) => {
    coll.deleteCollision(handle);
  };

  this.heroCollidesPlatform = (onCollide) => {
    this.detectCollision(Hero, Platform, onCollide);
  };
}
