/**
 * 节点位置信息
 *
 *        .10.3 20:53
 */
export interface iElementRect {
  height: number
  width: number
  left: number
  right: number
  top: number
  bottom: number
}

export function getRectAutoFormat(el: HTMLElement): iElementRect {
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
