
function proxy(func) {
	let instance
	const handler = {
		construct(target, args) {
			if(!instance) {
				instance = Reflect.construct(func, args)
			}
			return instance
		}
	}
	return new Proxy(func, handler)
}
