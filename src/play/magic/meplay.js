import MeView from './meview';

import { MagicRoles, MagicMonsters } from '../magic';

export default function MePlay(play, ctx, bs) {

  const { events, keyboard } = ctx;

  let dView = new MeView(play, ctx, bs);

  let magic;

  this.init = data => {
    magic = data.magic;
    dView.init({magic});
  };

  this.attach = () => {
    dView.attach();
  };

  this.detach = () => {
    dView.detach();
  };

  const tap = epos => {
    const hitPos = dView.hitPos(epos);
    const hitMonster = dView.hitMonsterKey(epos);

    if (hitMonster) {
      magic.selectMonster(hitMonster);
    } else if (hitPos) {
      const tile = magic.tile(hitPos);

      if (tile.role === MagicRoles.village) {
        let monster = magic.addMonster(MagicMonsters.mage, hitPos);
        magic.selectMonster(monster.key);
      }
    }
    
  };

  const handleMouse = () => {
    const { current } = events.data;
    
    if (current) {
      let { tapping, epos } = current;

      if (tapping) {
        tap(epos);
      }
    }

  };

  const handleKeyboard = () => {
    
    const { up, left, down, right } = keyboard.data;

    let dir;

    if (up) {
      dir = [0, -1];
    } else if (down) {
      dir = [0, 1];
    } else if (left) {
      dir = [-1, 0];
    } else if (right) {
      dir = [1, 0];
    }

    if (dir) {
      magic.userMove(dir);
    }

  };

  this.update = delta => {
    handleKeyboard();
    handleMouse();
    dView.update(delta);
  };


  this.render = () => {
    dView.render();
  };
  
}
