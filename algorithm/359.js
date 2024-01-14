
/*

0 0 0 0 0
1   1
  1   0 0


1 1 9
 */



/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var minimumSum = function(n, k) {
    let arr = [];
    let map = {};
    for (let i = 1; i <= 100; i++) {
        if (map[i] == void 0 ) {
            arr.push(i);
            map[k - i] = true;
        }
        if (arr.length == n) {
            break;
        }
    }
    // console.log(arr);
    return arr.reduce((total, item) => total + item, 0);
};

// minimumSum(5, 4)




/*

[0 .... start - 1]  [start .... n-2 n-1]
思路:  f[n-1]
        不卖:   f[n-1] === f[n-2]
        卖:     f[n-1] === f[start-1] + gold
 */
/**
 * @param {number} n
 * @param {number[][]} offers
 * @return {number}
 */
var maximizeTheProfit = function(n, offers) {
    const map = {}
    for (let i = 0; i < offers.length; i++) {
        const c = offers[i][1]
        const list = map[c]
        if (list) {
            map[c] = [...list, offers[i]]
        } else {
            map[c] = [offers[i]]
        }
    }
    const dp = new Array(n).fill(0)
    for (let i = 0; i < n; i++) {
        const currentoffers = map[i] || []
        dp[i] = dp[i - 1] || 0
        const preCost = currentoffers.map(e => e[2] + (dp[e[0] - 1] || 0))
        dp[i] = Math.max(dp[i], ...preCost)
    }
    // console.log(dp)
    return Math.max(...dp)
};

/*
n = 5, offers = [[0,0,1],[0,2,2],[1,3,2]]      3

n = 5, offers = [[0,0,1],[0,2,10],[1,3,2]]    10
 */

// console.log(maximizeTheProfit(5,  [[0,0,1],[0,2,2],[1,3,2]]))
console.log(maximizeTheProfit(5,  [[0,0,1],[0,2,10],[1,3,2]]))












var longestEqualSubarray = function(nums, k) {
    const arr = []
    for(let i = 0; i < nums.length; i++) {
        if(!arr[nums[i]]) {
            arr[nums[i]] = []
        }
        arr[nums[i]].push(i)
    }
    console.log(arr)
    let ans = 0
    for(let i = 0; i < arr.length; i++) {
        let left = 0
        if(arr[i]) {
            for(let right = 0; right < arr[i].length; right++) {
                while(arr[i][right] - arr[i][left] > k) {
                    left++
                }
                ans = Math.max(ans, right - left + 1)
            }
        }
    }
    return ans
};

// console.log(longestEqualSubarray([1,3,2,3,1,3], 3))
// console.log(longestEqualSubarray([1,1,2,2,1,1], 2))
// console.log(longestEqualSubarray([2,2,3], 0))// [2,2,3] 0   正确2  输出1
// console.log(longestEqualSubarray([1,2,1], 0))// [2,2,3] 0   正确1  输出2
