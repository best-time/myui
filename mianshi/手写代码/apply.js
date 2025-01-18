Function.prototype.apply2 = function (context = window) {
  context.fn = this;
  // 判断是否有第二个参数
  const result = arguments[1] ? context.fn(...arguments[1]) : context.fn();
  delete context.fn;
  return result;
};
