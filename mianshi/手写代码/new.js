/*
new操作符做了这些事：

它创建了一个全新的对象。
它会被执行[[Prototype]]（也就是__proto__）链接。
它使this指向新创建的对象。。
通过new创建的每个对象将最终被[[Prototype]]链接到这个函数的prototype对象上。
如果函数没有返回对象类型Object(包含Functoin, Array, Date, RegExg, Error)，那么new表达式中的函数调用将返回该对象引用。

 */

function New(func) {
	const res = {}
	if(func?.prototype !== null) {
		// res.__proto__ = func.prototype
		Object.setPrototypeOf(res, func.prototype)
	}
	const ret = func.apply(res, [].slice.call(arguments, 1))
	// 函数或者是对象
	const isObjOrFunc = typeof ret === 'function' || typeof ret === 'object'
	if(isObjOrFunc && ret !== null) {
		return ret
	}
	return res
}


function New2() {
	let obj = {}; // 创建一个空的对象
  let Constructor = [].shift.call(arguments); // 获取构造函数
  obj.__proto__ = Constructor.prototype; // 新对象的原型指向构造函数的 prototype
  let result = Constructor.apply(obj, arguments); // 执行构造函数，并将this指向新创建的对象
  return typeof result === 'object' && result!== null? result : obj; // 如果构造函数返回的是对象，就返回该对象，否则返回新创建的对象
}
