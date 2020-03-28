export function onceOnCondition(onOn, onOff, condition) {

  let wasTrue;

  return delta => {
    if (condition()) {
      if (!wasTrue) {
        onOn();
      }
      wasTrue = true;
    } else if (wasTrue) {
      wasTrue = false;
      onOff();
    }
  };
};

export function alwaysOnCondition(onOn, condition) {
  return delta => {
    if (condition()) {
      onOn(delta);
    }
  };
};
