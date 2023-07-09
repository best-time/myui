/**
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */
var longestAlternatingSubarray = function(nums, threshold) {
    let count = 0;
    for(let i = 0; i < nums.length;i++) {
        if(nums[i] % 2 !== 0 || nums[i] > threshold) {
            continue
        }
        let num = 1
        while(i < nums.length - 1 && nums[i + 1] <=threshold && nums[i] % 2 !== nums[i+1]%2) {
            num++
            i++
        }
        count = Math.max(count, num)
    }
    return count
};

console.log(longestAlternatingSubarray([3,2,5,4], 5))
// console.log(longestAlternatingSubarray([1,2], 2))
// console.log(longestAlternatingSubarray([2,3,5,2,3,2,3,2,4,5], 4))
// console.log(longestAlternatingSubarray([2,3,4,5], 4))
// console.log(longestAlternatingSubarray([2,2], 18))




/**
 * @param {number} n
 * @return {number[][]}
 */
var findPrimePairs = function(n) {
    const isPrime = (n) => {
        for (let i = 2; i * i <= n; i++) {
            if (n % i === 0) return false
        }
        return n >= 2
    }
    const res = [];
    for (let i = 2; i <= n >> 1; i++) {
        if (isPrime(i) && isPrime(n - i)) {
            res.push([i, n - i]);
        }
    }
    return res;
};

// console.log(findPrimePairs(100000))


/**
 * @param {number[]} nums
 * @return {number}
 */
// [5,4,2,4]  8  [5], [4], [2], [4]  [5,4], [4,2], [2,4]   [4,2,4]
// [1,2,3] 6 [1], [2], [3]  [1,2], [2,3]  [1,2,3]
var continuousSubarrays = function(nums) {
    let max = nums[0];
    let min = nums[0];
    let ans = 0;
    let r = -1;
    for(let l = 0; l < nums.length; l++) {
        if(nums[l] >= min && nums[l] <= max) {
            ans += l - r;
            continue
        }
        max = nums[l];
        min = nums[l];
        r = l - 1;
        while(r >= 0) {
            if(max - nums[r] > 2 || nums[r] - min > 2) {
                break;
            }
            max = Math.max(max, nums[r]);
            min = Math.min(min, nums[r]);
            r--
        }
        ans += l - r;
    }
    return ans;
};

console.log(continuousSubarrays([5,4,2,4]))



