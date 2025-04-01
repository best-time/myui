/*
会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，
之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
 */
Function.prototype.myBind = function (content) {
  if (typeof this != 'function') {
    throw Error('not a function')
  }
  // 若没问参数类型则从这开始写
  let fn = this
  let args = [...arguments].slice(1)

  let resFn = function () {
    return fn.apply(this instanceof resFn ? this : content, args.concat(...arguments))
  }
  function Tmp() {}
  Tmp.prototype = this.prototype

  resFn.prototype = new Tmp()

  return resFn
}
