export default function Point(x, y) {
  this.x = x;
  this.y = y;
}

export function point(x, y) {
  return new Point(x, y);
}
