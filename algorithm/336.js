var evenOddBit = function(n) {
    const nArray = n.toString(2).split('')
    const len = nArray.length
    const oddArr = [] // 基数
    const evenArr = [] // 偶数
    for(let i = 0; i < len; i++) { // 10001
        const cur = nArray[len - i - 1]
        if(i % 2 === 0) {
            cur > 0 && evenArr.push(cur)
        } else {
            cur > 0 && oddArr.push(cur)
        }
    }
    return [evenArr.length, oddArr.length]
};

evenOddBit(17)

// nums = [2,4,6], k = 2
// [2], [4], [6], [2, 6]
// [4,2,5,9,10,3]
// 1
// 17 x
// 23
let beautifulSubsets = function(nums, k) {
    if(nums.length < 2) return nums.length
    const len = nums.length
    // const res = [nums[len-1]]
    const res = []
    for(let i = 0 ; i < len-1; i ++) {
        // res.push(nums[i])
        for(let j = i + 1; j <= len - 1; j ++) {
            // console.log(nums.slice(i, j))
        }
    }
    return res.length
};

beautifulSubsets([4,2,5,9,10,3], 1)


var subsets = function(nums, k) {
    const res = [];
    const recursion = (level, nums, arr = [], t) => {
        if (level === nums.length) {
            arr.length && res.push(arr)
            return
        }
        if(!inArr(arr, nums[level]- k)  && !inArr(arr, nums[level] + k)) {
            recursion(level + 1, nums,  arr.concat(nums[level]), t)
        }
        recursion(level + 1, nums, arr, t)
    }
    recursion(0, nums, [], k)
    return res
}

subsets([4,2,5,9,10,3], 1)
subsets([2,4,6], 2)

function inArr(arr, k) {
    return arr.includes(k)
}


var beautifulSubsets2 = function(nums, k) {
    const res = [];
    function inArr(arr, k) {
        return arr.includes(k)
    }
    const recursion = (level, nums, arr = [], t) => {
        if (level === nums.length) {
            arr.length && res.push(arr)
            return
        }
        if(!inArr(arr, nums[level]- k)  && !inArr(arr, nums[level] + k)) {
            recursion(level + 1, nums,  arr.concat(nums[level]), t)
        }
        recursion(level + 1, nums, arr, t)
    }
    recursion(0, nums, [], k)
    // console.log(res, res.length)
    return res.length
};

// beautifulSubsets2([2,4,6], 2)
// beautifulSubsets2([4,2,5,9,10,3], 1)
beautifulSubsets2([590,136,844,976,670,485,794,114,434,82,245,673,738,416,252,1000,518,520,1,622],
999)



;(function() {
    // # 美丽子串
    /*
    给你一个下标从 0 开始的整数数组nums 。每次操作中，你可以：

选择两个满足 0 <= i, j < nums.length 的不同下标 i 和 j 。
选择一个非负整数 k ，满足 nums[i] 和 nums[j] 在二进制下的第 k 位（下标编号从 0 开始）是 1 。
将 nums[i] 和 nums[j] 都减去 2k 。
如果一个子数组内执行上述操作若干次后，该子数组可以变成一个全为 0 的数组，那么我们称它是一个 美丽 的子数组。

请你返回数组 nums 中 美丽子数组 的数目。

子数组是一个数组中一段连续 非空 的元素序列。

 

示例 1：

输入：nums = [4,3,1,2,4]
输出：2
解释：nums 中有 2 个美丽子数组：[4,3,1,2,4] 和 [4,3,1,2,4] 。
- 按照下述步骤，我们可以将子数组 [3,1,2] 中所有元素变成 0 ：
  - 选择 [3, 1, 2] 和 k = 1 。将 2 个数字都减去 21 ，子数组变成 [1, 1, 0] 。
  - 选择 [1, 1, 0] 和 k = 0 。将 2 个数字都减去 20 ，子数组变成 [0, 0, 0] 。
- 按照下述步骤，我们可以将子数组 [4,3,1,2,4] 中所有元素变成 0 ：
  - 选择 [4, 3, 1, 2, 4] 和 k = 2 。将 2 个数字都减去 22 ，子数组变成 [0, 3, 1, 2, 0] 。
  - 选择 [0, 3, 1, 2, 0] 和 k = 0 。将 2 个数字都减去 20 ，子数组变成 [0, 2, 0, 2, 0] 。
  - 选择 [0, 2, 0, 2, 0] 和 k = 1 。将 2 个数字都减去 21 ，子数组变成 [0, 0, 0, 0, 0] 。
示例 2：

输入：nums = [1,10,4]
输出：0
解释：nums 中没有任何美丽子数组。

链接：https://leetcode.cn/problems/count-the-number-of-beautiful-subarrays
     */
 // 异或  不同 才为 1
 const arr1 = [4,3,1,2,4]
    // 0100 0011 0001 0010 0100
    var beautifulSubarrays = function(nums) {
      let ans = 0
        const n = nums.length
        const s = new Array(n + 1).fill(0)
        for(let i = 1; i <= n; i++) {
            s[i] = s[i - 1] ^ nums[i - 1]
        }
        // s: [ 0, 4, 7, 6, 4, 0 ]
        let map = new Map()
        for(const r of s) {
            if(!map.has(r)) {
                map.set(r, 0)
            }
            ans += map.get(r)
            map.set(r, map.get(r) + 1)
        }
        console.log(s)
        return ans
    }
    beautifulSubarrays(arr1)
})()
