/*
给你一个整数数组 nums ，请你找出一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

子数组
是数组中的一个连续部分。



示例 1：

输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
输出：6
解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
示例 2：

输入：nums = [1]
输出：1
示例 3：

输入：nums = [5,4,-1,7,8]
输出：23


提示：

1 <= nums.length <= 105
-104 <= nums[i] <= 104

 */
// 1. 动态规划
const nums1 = [-2, 1, -3, 4, -1, 2, 1, -5, 4]
const nums2 = [1]
const nums3 = [5, 4, -1, 7, 8]
const maxSubArray = function (nums) {
	const dp = [nums[0]]
	for (let i = 1; i < nums.length; i++) {
		dp[i] = Math.max(dp[i - 1] + nums[i], nums[i])
	}
	return Math.max(...dp)
};
console.log(maxSubArray(nums1))
// console.log(maxSubArray(nums2))
// console.log(maxSubArray(nums3))

/*
前缀和 s[i] = nums[0]...+ nums[i]  数字累加
最小前缀和 s[0] = 0  s[1] = s[0] + nums[0]
 */
// 2. 前缀和
const maxSubArray2 = function (nums) {
	let ans = -Infinity
	let sum = 0
	let preSum = 0
	for (let i = 0; i < nums.length; i++) {
		sum += nums[i]
		ans = Math.max(ans, sum - preSum)
		preSum = Math.min(preSum, sum)
	}
	return ans
}
console.log(maxSubArray2(nums1))
