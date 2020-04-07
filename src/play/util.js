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

export function withinRect(bounds, test) {
  let x = bounds.x,
      x1 = bounds.x + bounds.width,
      r1x1 = test.x + test.width,
      r1x = test.x,
      y = bounds.y,
      y1 = bounds.y + bounds.height,
      r1y1 = test.y + test.height,
      r1y = test.y;

  return x < r1x && y < r1y && 
    x1 > r1x1 && y1 > r1y1;
}

export function intersectsRect(bounds, test) {
  let x = bounds.x,
      x1 = bounds.x + bounds.width,
      r1x1 = test.x + test.width,
      r1x = test.x,
      y = bounds.y,
      y1 = bounds.y + bounds.height,
      r1y1 = test.y + test.height,
      r1y = test.y;

  if (x > r1x1 || r1x > x1) {
    return false;
  }
  if (y > r1y1 || r1y > y1) {
    return false;
  }
  return true;

};

export function combineRect(r1, r2) {
  let x = r1.x,
      y = r1.y,
      x1 = r1.x + r1.width,
      y1 = r1.y + r1.height,
      r2x = r2.x,
      r2y = r2.y,
      r2x1 = r2.x + r2.width,
      r2y1 = r2.y + r2.height;

  let nx = Math.min(x, r2.x),
      ny = Math.min(y, r2.y),
      nx1 = Math.max(x1, r2x1),
      ny1 = Math.max(y1, r2y1);


  return {
    x: nx,
    y: ny,
    width: nx1 - nx,
    height: ny1 - ny
  };
}
