/*
获取数组最大金额, 不能连续
* */

const nums1 = [1,2,3,1]
const nums2 = [2,7,9,3,1]

// 递归解法
function get(nums, index) {
    if(!nums.length || index < 0) return 0
    if( index=== 0) return nums[0]
    const max1 = get(nums, index - 1)
    const max2 = get(nums, index - 2) + nums[index]
    console.log(max1, max2)
    return Math.max(max1,max2)
}

get(nums1, nums1.length -1)

// 动态规划
/*
 最优子结构
 递推公式
 重叠子问题
* */
// 空间复杂度O(n)  时间复杂度 O(n)
function get2(nums) {
    let len = nums.length
    if(!len) return 0
    if(len - 1 === 0) return nums[0]
    const dp = []
    dp[0] = nums[0]
    dp[1] = Math.max(nums[0], nums[1])
    for(let i = 2; i< len; i++) {
        dp[i] = Math.max(dp[i-1], dp[i-2] + nums[i])
    }
    console.log(dp)
    return dp[dp.length - 1]
}

// get2(nums1)
get2(nums2)

console.log('----------')
// 降低空间复杂度  O(1)  时间复杂度 O(n)
function get3(nums) { // [2,7,9,3,1]
    let len = nums.length
    if(!len) return 0
    if(len - 1 === 0) return nums[0]
    let first = nums[0]
    let second = nums[1]
    for(let i = 2; i< len; i++) {
        let tmp = second
        second = Math.max(first + nums[i], second)
        first = tmp
    }
    console.log(second)
    return second
}
get3(nums1)
get3(nums2)


/*
在上面的基础上加个条件,  收尾相连
 两种情况
不要首 1, length -1
不要尾 0, length - 2
*/

function get4(nums, start, end) { // [2,7,9,3,1]
    let len = nums.length
    if(!len) return 0
    if(len - 1 === 0) return nums[0]
    let first = nums[start]
    let second = Math.max(first, nums[start + 1])
    for(let i = start + 2; i<= end; i++) {
        let tmp = second
        second = Math.max(first + nums[i], second)
        first = tmp
    }
    console.log(second)
    return second
}

get4(nums1, 0, nums1.length - 2)
get4(nums1, 1, nums1.length - 1)


var mergeArrays = function(nums1, nums2) {
    let arr = [...nums1, ...nums2]
    let len = arr.length
    let map = new Map
    for(let i = 0; i < len; i++) {
        const [index, value] = arr[i]
        if(!map.get(index)) {
            map.set(index, value)
        } else {
            map.set(index, value + map.get(index))
        }
    }
    let res = []
    for(let [key, val] of map.entries()) {
        res.push([key, val])
    }
    return res.sort((a,b) => a[0] - b[0])
};

const a1 = [[1,2],[2,3],[4,5]]
const a2 =   [[1,4],[3,2],[4,1]]
const a3 =   [[2,4],[3,6],[5,5]]
const a4 =    [[1,3],[4,3]]

console.log(mergeArrays(a1, a2))
console.log(mergeArrays(a1, a3))
console.log(mergeArrays(a1, a4))


/*
给你一个正整数 n ，你可以执行下述操作 任意 次：

n 加上或减去 2 的某个 幂
返回使 n 等于 0 需要执行的 最少 操作数。

如果 x == 2i 且其中 i >= 0 ，则数字 x 是 2 的幂。
**/
var minOperations = function(n) {

};

function getTo2(n) { //32
    if(n % 2 !== 0) {
        n = n - 1
    }
    let count = 0
    while(n !== 1) {
        n = n / 2
        count++
        if(`${n}`.includes('.')) {
            count += '-'
            break
        }
    }
    console.log(count)
    return count
}
// getTo2(3)

function nn(n) {
    let count = 0
    let i
    for(i = 0; i < 100; i++) {
        count += Math.pow(2, i)
        if(count > n) {
            break
        }
    }
    console.log(count, i)
    return count
}
nn(39)
