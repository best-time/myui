const fs = require('fs');

function promisify(asyncFunc) {
	return function(...args) {
		return new Promise((resolve, reject) => {
			args.push(function callback(err, ...values) {
				if(err) {
					return reject(err);
				}
				return resolve(...values)
			})
      asyncFunc.call(this, ...args)
    })
	}
}

const fsp = new Proxy(fs, {
	get(target ,key) {
		return promisify(target[key])
	}
})
