export default function makeLayers(scene) {
  return {
    fourLayer: scene.layer(4),
    threeLayer: scene.layer(3),
    twoLayer: scene.layer(2),
    oneLayer: scene.layer(1),
    zeroLayer: scene.layer(0),
    scene,
  };
};
