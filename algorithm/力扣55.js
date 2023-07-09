/*
给定一个非负整数数组，你最初位于数组的第一个位置。

数组中的每个元素代表你在该位置可以跳跃的最大长度。

你的目标是使用最少的跳跃次数到达数组的最后一个位置。

示例:

输入: [2,3,1,1,4]
输出: 2
解释: 跳到最后一个位置的最小跳跃数是 2。从下标为 0 跳到下标为 1 的位置，跳 1 步，然后跳 3 步到达数组的最后一个位置。
说明: 假设你总是可以到达数组的最后一个位置。

 */

function get(list) {
    let ans = 0
    let curDistance = 0 // 当前覆盖的最远距离下标
    let nextDistance = 0 // 下一步覆盖的最远距离下标
    for(let i = 0; i < list.length -1; i++) { // 因为总是可以到达数组的最后一个位置
        if(curDistance >= list.length - 1) {
            break
        }
        nextDistance = Math.max(i + list[i], nextDistance) // 更新下一步覆盖的最远距离下标
        // 当 当前位置为要抵达的位置时，更新抵达位置
        if(i === curDistance) { // 遇到当前覆盖的最远距离下标
            curDistance = nextDistance // 更新当前覆盖的最远距离下标
            ans++
        }
    }
    return ans
}

console.log(get([2,3,1,1,4]))
