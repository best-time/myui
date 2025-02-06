// 已排序的数组
const arr1 = [1,1,2,3]
const arr2 = [0,0,1,1,2,2,2,3]

// 返回不重复元素长度
function removeDuplicate(nums) {
	const len = nums.length
	if(len === 0) {
		return len
	}
	let left = 0;
	let right = 0;
	while(right < len) {
		if(nums[right] !== nums[left]) {
			nums[++left] = nums[right]
		}
		right++
	}
	return left + 1
}

// console.log(removeDuplicate(arr1))
console.log(removeDuplicate(arr2))
