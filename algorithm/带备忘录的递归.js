// 基础解法
function fib(n) {
  if (n - 1 === 0 || n - 2 === 0) return 1;
  return fib(n - 2) + fib(n - 1);
}

fib(4);

// 带备忘录   '自顶而下'
function get(n) {
  const memo = new Array(n + 1).fill(0);
  return dp(memo, n);
}
function dp(memo, n) {
  if (n === 0 || n === 1) return n;
  if (memo[n]) return memo[n];
  const prev = dp(memo, n - 1);
  const next = dp(memo, n - 2);
  memo[n] = prev + next;
  return memo[n];
}

console.log(get(8));

// 自下而上

function fib3(n) {
  if (n === 0) return 0;
  let dp = new Array(n + 1).fill(0);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}

console.log(fib3(8));
