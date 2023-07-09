/*
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

示例:

输入: [-2,1,-3,4,-1,2,1,-5,4]
输出: 6
解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。


第一步：定义子问题
    动态规划是将整个数组归纳考虑，假设我们已经知道了以第 i-1 个数结尾的连续子数组的最大和 dp[i-1]，
    显然以第i个数结尾的连续子数组的最大和的可能取值要么为 dp[i-1]+nums[i]，要么就是 nums[i] 单独成一组，
    也就是 nums[i] ，在这两个数中我们取最大值

第二步：实现需要反复执行解决的子子问题部分
    dp[n] = Math.max(dp[n−1]+nums[n], nums[n])

第三步：识别并求解出边界条件
    dp[0]=nums[0]
*/
const arr = [-2,1,-3,4,-1,2,1,-5,4]

function getMax(nums) {
    let max = nums[0]
    let pre = 0
    for (let i = 1; i < nums.length; i++) {
        let num = nums[i]
        if(pre>0) {
            pre += num
        } else {
            pre = num
        }
        max = Math.max(max, pre)
    }
    return max
}

console.log(getMax(arr))


function getMax2(nums) {
    let dp = []
    dp[0] = nums[0]
    for(let i = 1; i<nums.length; i++) {
        dp[i] = Math.max(dp[i-1] + nums[i], nums[i])
    }
    return Math.max(...dp)
}

console.log(getMax2(arr))
