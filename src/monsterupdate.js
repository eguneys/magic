import { noop } from './util';

export default function monstersUpdate(magic) {

  let data = magic.data;

  data.monsters.each(_ => {
    let decision = _.decision;

    decision(magic, _);
  });

}
