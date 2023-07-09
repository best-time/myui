/*
数组的每个索引作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i] (索引从0开始)。
每当你爬上一个阶梯你都要花费对应的体力花费值，然后你可以选择继续爬一个阶梯或者爬两个阶梯。
您需要找到达到楼层顶部的最低花费。在开始时，你可以选择从索引为 0 或 1 的元素作为初始阶梯。

              0   1   2  3
输入: cost = [10, 15, 20]
输出: 15
解释: 最低花费是从cost[1]开始，然后走两步即可到阶梯顶，一共花费15。

             0   1   2  3  4   5   6  7   8   9
输入: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
输出: 6
解释: 最低花费方式是从cost[0]开始，逐个经过那些1，跳过cost[3]，一共花费6。


本题注意理解题意：

第 i 级台阶是第 i-1 级台阶的阶梯顶部。
踏上第 i 级台阶花费 cost[i] ，直接迈一大步跨过而不踏上去则不用花费。
楼梯顶部在数组之外，如果数组长度为 len，那么楼顶就在下标为 len


第一步：定义子问题

    踏上第 i 级台阶的体力消耗为到达前两个阶梯的最小体力消耗加上本层体力消耗：

    最后迈 1 步踏上第 i 级台阶：dp[i-1] + cost[i]
    最后迈 1 步踏上第 i 级台阶：dp[i-2] + cost[i]

第二步：实现需要反复执行解决的子子问题部分

    所以踏上第 i 级台阶的最小花费为： dp[i] = min(dp[i-2], dp[i-1]) + cost[i]

第三步：识别并求解出边界条件

    // 第 0 级 cost[0] 种方案 dp[0] = cost[0]

    // 第 1 级，有两种情况
    // 1：分别踏上第0级与第1级台阶，花费cost[0] + cost[1]
    // 2：直接从地面开始迈两步直接踏上第1级台阶，花费cost[1]
    dp[1] = min(cost[0] + cost[1], cost[1]) = cost[1]
*/

function minClimbingStairs(cost) {
    cost = cost.concat(0)
    let dp = []
    let n = cost.length
    // 你可以选择从索引为 0 或 1 的元素作为初始阶梯。
    dp[0] = cost[0]
    dp[1] = cost[1]
    for(let i = 2; i < n; i++) {
        let cur = cost[i] // 当前层的体力值
        let minPrev = Math.min(dp[i-2], dp[i-1]) // 当前层的前一层和前二层取小值
        dp[i] = minPrev + cur
    }
    return dp[n-1]
}
const cost1 = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
console.log(minClimbingStairs(cost1))


function minClimbingStairs2(cost) {
    let n = cost.length
    let n1 = cost[0]
    let n2 = cost[1]
    for(let i = 2; i < n; i++) {
        let cur = cost[i]
        let tmp = n2
        n2 = Math.min(n1, n2) + cur
        n1 = tmp
    }
    return Math.min(n1, n2)
}

console.log(minClimbingStairs2(cost1))





// 3: 011  k 1
// 1: 001
// 2: 010
// 4: 100




