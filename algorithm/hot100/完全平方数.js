// https://leetcode.cn/problems/perfect-squares/description/?envType=study-plan-v2&envId=top-100-liked


/*
给你一个整数 n ，返回 和为 n 的完全平方数的最少数量 。

完全平方数 是一个整数，其值等于另一个整数的平方；换句话说，其值等于一个整数自乘的积。
例如，1、4、9 和 16 都是完全平方数，而 3 和 11 不是。



示例 1：

输入：n = 12
输出：3
解释：12 = 4 + 4 + 4
示例 2：

输入：n = 13
输出：2
解释：13 = 4 + 9

提示：

1 <= n <= 104
 */

/**
 * @param {number} n
 * @return {number}
 */
var numSquares = function(n) {
	 const dp = Array.from({length: n + 1}).fill(0)
	for (let i = 1; i < n; i++) {

	}
};
console.log(numSquares(12));


function numSquares2(n) {
	let counter = 1;
	const goods = []; //[1,4,9,16,25..]
	while (counter * counter <= n) {
		goods.push(counter * counter);
		counter++;
	}
	const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
	dp[0] = 0;
	for (let i = 0; i < goods.length; i++) {
		for (let j = goods[i]; j <= n; j++) {
			dp[j] = Math.min(dp[j], dp[j - goods[i]] + 1);
		}
	}
	return dp.at(-1);
}

console.log(numSquares2(12))

function numSquares3(n) {
	// dp[i]: 和为i(0<i<=n)的完全平方数的最小数量, 默认为i(最坏情况完全平方数全是1)
	const dp = new Array(n + 1).fill(0).map((_, i) => i);

	for (let i = 1; i <= n; i++) {
		if (Math.sqrt(i) % 1 === 0) {
			// 如果根号i是整数, 那么和为i的完全平方数的最小数量为1(完全平方数就是一个i)
			dp[i] = 1;
		} else {
			// 只需要遍历[1,√i)
			for (let j = 1; j * j < i; j++) {
				dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
			}
		}
	}

	return dp[n];
}


console.log(numSquares3(12))
