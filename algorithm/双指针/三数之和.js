
/*
给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

注意： 答案中不可以包含重复的三元组。

示例：

给定数组 nums = [-1, 0, 1, 2, -1, -4]，
满足要求的三元组集合为： [ [-1, 0, 1], [-1, -1, 2] ]

#
 */

function threeSum(arr) {
    const res = []
    const len = arr.length
    arr.sort((a, b) => a-b)
    for(let i = 0; i < len; i++) {
        const cur = arr[i]
        // 最小值大于0
        if(cur > 0) return res
        // 当前值和前一个值相等  (答案不能包含重复项)
        if(i > 0 && cur === arr[i - 1]) continue
        let left = i + 1
        let right = len - 1

        while(left < right) {
            let sum = cur + arr[left] + arr[right]
            if(sum > 0) {
                right--
            } else if (sum < 0) {
                left++
            } else {
                res.push([cur, arr[left], arr[right]])
                while(left < right && arr[left] === arr[left + 1]){ // 去重
                    left++
                }
                while(left < right && arr[right] === arr[right - 1]) {// 去重
                    right--
                }
                left++
                right--
            }
        }
    }
    return res
}

console.log(threeSum([-1, 0, 1, 2, -1, -4]))
