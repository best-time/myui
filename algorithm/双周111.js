/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var countPairs = function(nums, target) {
    let ans = 0
    nums.sort((a, b) => a - b)
    let left = 0
    let right = nums.length - 1
    while(left < right) {
        if(nums[left] + nums[right] < target) {
            ans += right - left
            left++
        } else {
            right--
        }
    }
    return ans
};
// [-1,1,2,3,1], target = 2      3
// [-6,2,5,-2,-7,-1,3], target = -2  10

// console.log(countPairs([-1,1,2,3,1], 2))




/**
 * @param {string} str1
 * @param {string} str2
 * @return {boolean}
 */
var canMakeSubsequence = function(str1, str2) {
    if(str1.length < str2.length) return false
    const str = 'abcdefghijklmnopqrstuvwxyz'
    const arr = str.split('')
    const strMap = arr.reduce((cur, next, index) => {
        if(next !== 'z') {
            cur[next] = arr[index+1]
        } else {
            cur[next] = arr[0]
        }
        return cur
    }, {})
    let j = 0
    for(let i = 0; i < str1.length; i++) {
        if(str1[i] === str2[j] || str2[j] === strMap[str1[i]]) {
            j+=1
        }
        if(j === str2.length) {
            return true
        }
    }
    return false
};

// str1 = "abc", str2 = "ad"    true
// str1 = "zc", str2 = "ad"   true

// console.log(canMakeSubsequence('abc', 'ad'))
console.log(canMakeSubsequence('zc', 'ad'))
// console.log(canMakeSubsequence('ab', 'd'))
