export default {
  /**
   * 返回数字长度
   * @param {*number} num Input number
   */
  digitLength(num: number) {
    const len = (num.toString().split('.')[1] || '').length
    return len > 0 ? len : 0
  },
  /**
   * 把小数转成整数,如果是小数则放大成整数
   * @param {*number} num 输入数
   */
  float2Fixed(num: number) {
    return Number(num.toString().replace('.', ''))
  },
  /**
   * 精确加法
   * plus(0.1, 0.2) // = 0.3, not 0.30000000000000004
   */
  plus(num1: number, num2: number) {
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (num1 * baseNum + num2 * baseNum) / baseNum
  },
  /**
   * 精确减法
   * minus(1.0, 0.9) // = 0.1, not 0.09999999999999998
   */
  minus(num1: number, num2: number) {
    const baseNum = Math.pow(10, Math.max(this.digitLength(num1), this.digitLength(num2)))
    return (num1 * baseNum - num2 * baseNum) / baseNum
  },

  /**
   * 精确乘法
   * times(3, 0.3) // = 0.9, not 0.8999999999999999
   */
  times(num1: number, num2: number) {
    const num1Changed = this.float2Fixed(num1)
    const num2Changed = this.float2Fixed(num2)
    const baseNum = this.digitLength(num1) + this.digitLength(num2)
    const leftValue = num1Changed * num2Changed
    return leftValue / Math.pow(10, baseNum)
  },

  /**
   * 精确除法
   * divide(1.21, 1.1) // = 1.1, not 1.0999999999999999
   */
  divide(num1: number, num2: number) {
    const num1Changed = this.float2Fixed(num1)
    const num2Changed = this.float2Fixed(num2)
    return (num1Changed / num2Changed) * Math.pow(10, this.digitLength(num2) - this.digitLength(num1))
  },
  /**
   * 四舍五入
   * round(0.105, 2); // = 0.11, not 0.1
   */
  round(num: number, ratio: number) {
    const base = Math.pow(10, ratio)
    return this.divide(Math.round(this.times(num, base)), base)
  }
}
