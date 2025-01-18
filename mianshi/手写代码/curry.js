/*
柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，
并且返回接受余下的参数且返回结果的新函数的技术。
 */
function curry(fn, args = []) {
  let length = fn.length;
  return function () {
    const newArgs = args.concat([].slice.call(arguments));
    if (newArgs.length < length) {
      return curry.call(this, fn, newArgs);
    }
    return fn.apply(this, newArgs);
  };
}

function multiFn(a, b, c) {
  return a * b * c;
}

let multi = curry(multiFn);

const res1 = multi(2)(3)(4);
const res2 = multi(2, 3, 4);
const res3 = multi(2)(3, 4);
const res4 = multi(2, 3)(4);

console.log(res1);
console.log(res2);
console.log(res3);
console.log(res4);


//----------------------------------------------------------------
// es6写法
const curry2 = (fn, arr = []) => {
	const len = fn.length
	return (...args) => {
		return (
			arg => arg.length === len
				? fn(...arg)
				: curry2.call(this, fn, arg)
		)([...arr, ...args])
	}
}

let curryTest=curry2((a,b,c,d)=>a+b+c+d)
// curryTest(1,2,3)
const r1= curryTest(1,2,3)(4) //返回10
const r2= curryTest(1,2)(4)(3) //返回10
const r3= curryTest(1,2)(3,4) //返回10

console.log(r1)
console.log(r2)
console.log(r3)
