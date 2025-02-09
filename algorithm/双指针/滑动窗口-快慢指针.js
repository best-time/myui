// 快慢指针的一种


// 模板
function windowRandom(str) {
	let left = 0
	let right = 0
	while(right < str.length) {
		const c = str[right]
		// 增大窗口
		right++
		// 更新窗口数据

		// 判断左侧窗口是否收缩
		while(left < c.length) {
			const d = str[left]
			// 缩小窗口
			left++
			// 更新窗口数据
		}
	}
}
