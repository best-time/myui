export function getRectAutoFormat(el) {
  const { top, left, height, width, right, bottom } = el.getBoundingClientRect()
  return {
    top: Number(top.toFixed(0)),
    left: Number(left.toFixed(0)),
    right: Number(right.toFixed(0)),
    bottom: Number(bottom.toFixed(0)),
    height: Number(height.toFixed(0)),
    width: Number(width.toFixed(0))
  }
}
//# sourceMappingURL=getRectAutoFormat.js.map
