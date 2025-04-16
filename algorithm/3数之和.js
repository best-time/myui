/**
 给你一个长度为 n 的整数数组nums和 一个目标值target。请你从 nums 中选出三个整数，使它们的和与target最接近。
 返回这三个数的和。
 假定每组输入只存在恰好一个解。

 输入：nums = [-1,2,1,-4], target = 1
 输出：2
 解释：与 target 最接近的和是 2 (-1 + 2 + 1 = 2) 。
 */

// 双指针

let threeSumClosest = function (nums, target) {
  nums.sort((a, b) => a - b)
  let result = nums[0] + nums[1] + nums[2] // 最小3数和
  let len = nums.length
  for (let i = 0; i < len; i++) {
    let start = i + 1
    let end = len - 1
    while (start < end) {
      let sum = nums[start] + nums[end] + nums[i]
      if (Math.abs(target - sum) < Math.abs(target - result)) {
        result = sum
      }
      if (sum > target) {
        end--
      } else if (sum < target) {
        start++
      } else {
        return result
      }
    }
  }
  return result
}

const arr = [-1, 2, 1, -4]

threeSumClosest(arr, 1)
