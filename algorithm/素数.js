// 100 内的素数

// 是否是素数       // 根号n
function isPrime(n) {
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}

// 暴力解法
function get(n) {
  let count = 0;
  for (let i = 2; i < n; i++) {
    // [2, n-1]
    count += isPrime(i) ? 1 : 0
  }
  console.log(count);
  return count;
}
get(100);

// 埃筛法
// 非素数 (合数)

function eratosthenes(n) {
  const primeList = [];
  let count = 0;
  for (let i = 2; i < n; i++) {
    if (!primeList[i]) {
      count++;
      for (let j = 2 * i; j < n; j += i) { // 优化点  i * i
        primeList[j] = true;
      }
    }
  }
  console.log(count);
  return count;
}
eratosthenes(100);
