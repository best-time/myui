
// ** 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？  给定n是一个正整数
// 2: 1+1 2
// 3: 1+1+1 1+2 2+1
let climbStairs = function(n) {
    let dp = [1, 1]
    // 如果用 dp[n] 表示第 n 级台阶的方案数，并且由题目知：最后一步可能迈 2 个台阶，也可迈 1 个台阶，
    // 即第 n 级台阶的方案数等于第 n-1 级台阶的方案数加上第 n-2 级台阶的方案数
    for(let i = 2; i <= n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n]
}

let climbStairs2 = function(n) {
    let res = 1, n1 = 1, n2 = 1
    for(let i = 2; i <= n; i++) {
        res = n1 + n2;
        [n1, n2] = [n2, res]
        // n1 = n2
        // n2 = res
    }
    return res
}
console.log(climbStairs(10))
console.log(climbStairs2(9), climbStairs2(8))
