Array.prototype._filter = function (callback) {
	if(typeof callback === 'function') {
		return this.reduce((prev,item,index,arr) => {
			if(callback(item, index, arr)) {
				prev.push(item)
			}
			return prev
		}, [])
	} else {
		console.log(new Error('callback is not function'))
	}
}
