/**
 * 四舍五入算法
 *
 *        .12.30 11:40
 */
export function roundFixed(val, fixed) {
  if (val == null) {
    return val
  }
  const num = Number(val)
  if (isNaN(num)) {
    return num
  }
  let pos = num.toString().indexOf('.'),
    decimal_places = num.toString().length - pos - 1,
    _int = num * Math.pow(10, decimal_places),
    divisor_1 = Math.pow(10, decimal_places - fixed),
    divisor_2 = Math.pow(10, fixed)
  return Math.round(_int / divisor_1) / divisor_2
}
//# sourceMappingURL=roundFixed.js.map
