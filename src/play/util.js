export function tapHandler(events, bounds, fn) {
  const hitTest = (posX, posY) => {
    let left = bounds.x,
        right = bounds.x + bounds.width,
        top = bounds.y,
        bottom = top + bounds.height;

    return left <= posX && right > posX &&
      top <= posY && bottom > posY;
  };

  return () => {
    const { current } = events.data;

    if (current) {
      let { tapping, epos } = current;

      if (tapping) {
        if (hitTest(...epos)) {
          fn(...epos);
        }
      }
    }
  };
};
