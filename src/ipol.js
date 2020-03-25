/*
 * Easing Functions - inspired from http://gizma.com/easing/
 * only considering the t value for the range [0, 1] => [0, 1]
 */
export const Easings = {
  // no easing, no acceleration
  linear: t => t,
  // accelerating from zero velocity
  easeInQuad: t => t*t,
  // decelerating to zero velocity
  easeOutQuad: t => t*(2-t),
  // acceleration until halfway, then deceleration
  easeInOutQuad: t => t<.5 ? 2*t*t : -1+(4-2*t)*t,
  // accelerating from zero velocity 
  easeInCubic: t => t*t*t,
  // decelerating to zero velocity 
  easeOutCubic: t => (--t)*t*t+1,
  // acceleration until halfway, then deceleration 
  easeInOutCubic: t => t<.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1,
  // accelerating from zero velocity 
  easeInQuart: t => t*t*t*t,
  // decelerating to zero velocity 
  easeOutQuart: t => 1-(--t)*t*t*t,
  // acceleration until halfway, then deceleration
  easeInOutQuart: t => t<.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t,
  // accelerating from zero velocity
  easeInQuint: t => t*t*t*t*t,
  // decelerating to zero velocity
  easeOutQuint: t => 1+(--t)*t*t*t*t,
  // acceleration until halfway, then deceleration 
  easeInOutQuint: t => t<.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t
};

export const Easings2 = {
  easeOutQuad: t => t*(2-t),
};


export default function interpolator(a, b = a, { 
  yoyo
}) {
  let v = 0;
  let direction = 1;

  const easing = fn => a + (b - a) * fn(v);

  const value = () => a + (b - a) * v;

  const settle = () => v = 1;
  const reset = () => v = 0;
  const resetIfDifferent = () => {
    if (a !== b) {
      reset();
      direction = 1;
    } else {
      settle();
    }
  };

  return {
    update(dt) {
      v += dt * direction;
      if (v > 1) {
        v = 1;
        if (yoyo) {
          direction *= -1;
        }
      }
      if (v < 0) {
        v = 0;
        if (yoyo) {
          direction *= -1;
        }
      }
    },
    settled(threshold = 1) {
      return v >= threshold;
    },
    progress(max = 1) {
      return v;
    },
    both(x, y = x) {
      a = x;
      b = y;
      resetIfDifferent();
    },
    target(x) {
      if (x) {
        b = x;
        resetIfDifferent();
      }
      return b;
    },
    value(x) {
      if (x) {
        a = x;
        resetIfDifferent();
      }
      return value();
    },
    easing(fn) {
      return easing(fn);
    }
  };
}

export function interpolate(a, b, dt = 0.2) {
  return a + (b - a) * dt;
}

