import Vue from 'vue'



let isType = type => {
	return function (value) {
		return Object.prototype.toString.call(value) === `[object ${type}]`;
	};
};

let isObject = isType("Object");
let isArray = isType("Array");


// 指令
Vue.directive('preventReClick', {
	inserted(el, binding) {
		el.addEventListener('click', () => {
			if (!el.disabled) {
				el.disabled = true
				setTimeout(() => {
					el.disabled = false
				}, binding.value || 3000)
			}
		})
	}
})
/*
          v-lazy-click="{fn:cancelSubmit,params:{params:'cancelForm'}}"

 */
const lazyClick = {
	inserted: (el, binding, vNode) => {
		el.addEventListener('click', function (e) {
			if (binding.modifiers.stop) e.stopPropagation();
			if (binding.modifiers.prevent) e.preventDefault();
			if (!el.t3_lazy_click) {
				if (typeof binding.value === 'function') binding.value();
				if (typeof binding.value === 'object') {
					if (typeof binding.value.fn === 'function') {
						binding.value.fn.call(this, binding.value.params)
					} else if (typeof binding.value.fn === 'undefined') throw Error(`you should makesure fn is a function`);
					else throw Error(`${binding.value.fn} is not a function`);
				}
				if (typeof binding.value !== 'object' && typeof binding.value !== 'function') {
					throw Error(`${binding.value} is not a function or object`);
				}
				let delayTime = binding.arg || 1000;
				el.t3_lazy_click = setTimeout(() => {
					if (binding.value.callBackFn && typeof binding.value.callBackFn === 'function') binding.value.callBackFn(el);
					clearTimeout(el.t3_lazy_click)
					el.t3_lazy_click = null;
				}, delayTime)
			}
		}, false);
	},
}




// 数字转换为中文数字
const changeNumToHan = num => {
	let arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	let arr2 = [
		'',
		'十',
		'百',
		'千',
		'万',
		'十',
		'百',
		'千',
		'亿',
		'十',
		'百',
		'千',
		'万',
		'十',
		'百',
		'千',
		'亿'
	]
	if (!num || isNaN(num)) return '零'
	let english = num.toString().split('')
	let result = ''
	for (let i = 0; i < english.length; i++) {
		let des_i = english.length - 1 - i // 倒序排列设值
		result = arr2[i] + result
		let arr1_index = english[des_i]
		result = arr1[arr1_index] + result
	}
	result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十') // 将【零千、零百】换成【零】 【十零】换成【十】
	result = result.replace(/零+/g, '零') // 合并中间多个零为一个零
	result = result.replace(/零亿/g, '亿').replace(/零万/g, '万') // 将【零亿】换成【亿】【零万】换成【万】
	result = result.replace(/亿万/g, '亿') // 将【亿万】换成【亿】
	result = result.replace(/零+$/, '') // 移除末尾的零
	// 将【一十】换成【十】
	result = result.replace(/^一十/g, '十')
	return result
}



/**
 * 根据url地址下载
 * @param {*} url
 */
const download = url => {
	const isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1
	const isSafari = navigator.userAgent.toLowerCase().indexOf('safari') > -1
	if (isChrome || isSafari) {
		var link = document.createElement('a')
		link.href = url
		if (link.download !== undefined) {
			var fileName = url.substring(url.lastIndexOf('/') + 1, url.length)
			link.download = fileName
		}
		if (document.createEvent) {
			var e = document.createEvent('MouseEvents')
			e.initEvent('click', true, true)
			link.dispatchEvent(e)
			return true
		}
	}
	if (url.indexOf('?') === -1) {
		url += '?download'
	}
	window.open(url, '_self')
	return true
}


/**
 * 下载二进制文件
 * @param {*} url
 */
 const getBlob = url => {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest()
		xhr.open('GET', url, true)
		xhr.responseType = 'blob'
		xhr.setRequestHeader = {
			Accept: '*',
			' Content-Type': 'application/zip'
		}
		xhr.onload = () => {
			if (xhr.status >= 200 && xhr.status < 400) {
				resolve(xhr.response)
			} else {
				reject(xhr.response)
			}
		}
		xhr.send()
	})
}



/**
 * 支持时间戳、字符串时间、Date时间的格式化
 * @param {*} time
 * @param {*} format
 * @returns {string | null}
 */
 const formatTime = (time, format = 'yyyy-MM-dd HH:mm:ss') => {
	if (!time) return null
	var date = time
	if (isString(time)) {
		if (/^[0-9]+$/.test(time)) {
			time = parseInt(time)
		} else {
			time = time.replace(new RegExp(/-/gm), '/') // safari
			date = new Date(time)
		}
	}
	if (isNumber(time) && time.toString().length === 10) {
		time = time * 1000
		date = new Date(time)
	}
	if (!isValidDate(date)) return ''
	const tf = function(i) {
		return (i < 10 ? '0' : '') + i
	}
	return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a) {
		switch (a) {
			case 'yyyy':
				return tf(date.getFullYear())
			case 'MM':
				return tf(date.getMonth() + 1)
			case 'mm':
				return tf(date.getMinutes())
			case 'dd':
				return tf(date.getDate())
			case 'HH':
				return tf(date.getHours())
			case 'ss':
				return tf(date.getSeconds())
		}
	})
}



/**
 * @description 格式化价格显示，整数部分每隔三位用英文逗号分隔，保留两位小数
 * @param {*} num 金额
 */
export const formatAmount = (x) => {
	// function format (num) {
	//   return num.toFixed(2).replace(/\B(?=(\d{3})+\b)/g, ",");
	// };
	// 价格处理强制保留两位小数
	let f = parseFloat(x);
	if (Number.isNaN(f)) return;
	let s = f.toString();
	let rs = s.indexOf(".");
	if (rs < 0) {
		rs = s.length;
		s += ".";
	}
	while (s.length < (rs + 1) + 2) {
		s += "0";
	}
	// 每三位用一个逗号隔开
	let leftNum = s.split(".")[0];
	let rightNum = "." + s.split(".")[1];
	let result;
	// 定义数组记录截取后的价格
	let resultArray = [];
	if (leftNum.length > 3) {
		let i = true;
		while (i) {
			resultArray.unshift(leftNum.slice(-3));
			leftNum = leftNum.slice(0, leftNum.length - 3);
			if (leftNum.length < 4) {
				i = false;
				resultArray.unshift(leftNum)
				result = resultArray.toString() + rightNum;
			}
		}
	} else {
		result = s;
	}
	return result;
}


/**
 * 判断一个对象是否存在key，如果传入第二个参数key，则是判断这个obj对象是否存在key这个属性
 * 如果没有传入key这个参数，则判断obj对象是否有键值对
 */
 const hasKey = (obj, key) => {
	if (key) { return key in obj }
	else {
		let keysArr = Object.keys(obj)
		return keysArr.length
	}
}


/**
 * map转list
 * {1：启用，2：停用}
 * 转换为
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 */
 const mapToList = (map, type = "number", isSort = false) => {
	let list = []
	let keyArr = Object.keys(map).sort((a, b) => a - b)
	keyArr.forEach(key => {
		list.push({
			value: type === "number" ? Number(key) : key,
			label: map[key]
		})
	})
	return list
}
/**
 * list转map
 * [
 *  {value:1,label:'启用’}
 *  {value:2,label:'停用’}
 * ]
 * 转换为
 * {1：启用，2：停用}
 */
 const listToMap = (list) => {
	let map = {}
	list.forEach(item => {
		map[item.value] = item.label
	})
	return map
}





/**
 * @param {Object} obj
 * @description 过滤对象空属性
 */
export const filterBlankProperty = (obj) => {
	const copyObj = { ...obj }
	for (const key of Object.keys(copyObj)) {
		!copyObj[key] && copyObj[key] !== 0 && delete copyObj[key]
	}
	return copyObj
}
