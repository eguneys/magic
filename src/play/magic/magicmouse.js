import { callMaybe } from '../util';

export default function MagicMouse(play, ctx, {
  onClick
}) {

  const { events } = ctx;

  this.init = data => {};

  const click = callMaybe(onClick);

  this.update = delta => {
    let { current } = events.data;

    if (current) {
      let { tapping, epos } = current;

      if (tapping) {
        click(epos);
      }
    }
  };
  
}
