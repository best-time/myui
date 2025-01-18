const compose = (...fns) => {
	return (...args) => {
		return fns.reduce((result, fn) => {
			return Array.isArray(result) ? fn.apply(null, result) : fn(result);
		}, [...args]);
	};
};


const add = (a, b) => a + b;
const double = (x) => x * 2;
const square = (x) => x * x;
const composedFn = compose(add, double, square);
console.log(composedFn(1, 2)); // 输出 36
