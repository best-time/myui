// 下标从1开始, 数组是非递减排列, 返回数组下标
// 不可以重复使用相同元素

const nums = [2, 7, 11, 15]
function twoSum(nums, target) {
	let left = 0
	let right = nums.length - 1
	while (left < right) {
		const sum = nums[left] + nums[right]
		if(sum < target) {
			left++
		} else if (sum > target) {
			right--
		} else {
			return [left + 1, right + 1]
		}
	}
	return [-1, -1]
}

console.log(twoSum(nums, 9))
