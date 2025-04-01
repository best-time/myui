/*
call核心：

将函数设为对象的属性
执行&删除这个函数
指定this到函数并传入给定参数执行函数
如果不传入参数，默认指向为 window
 */
Function.prototype.myCall = function (context = window) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
