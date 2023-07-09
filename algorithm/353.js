/**
 * @param {number} num
 * @param {number} t
 * @return {number}
 */
var theMaximumAchievableX = function(num, t) {
    return num + t * 2
};

// console.log(theMaximumAchievableX(4,1)) // 6
// console.log(theMaximumAchievableX(3,2)) // 7



/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var maximumJumps = function(nums, target) {
    const len = nums.length
    let i = 0;
    let count = 0
    const arr = []
    let j = 1
    while(i <= len - 1) {
        if(len - j === 1) {
            return count > 0 ? count : -1
        }
        const dif = nums[j] - nums[i]
        if(dif >= -target && dif <= target ) {
            arr.push(i)
            count++
            j++
        } else {
            i = arr[arr.length - 1]
            count = 0
        }
        i++

    }
    return count > 0 ? count : -1
};

console.log(maximumJumps([1,3,6,4,1,2], 2)) // 3
// console.log(maximumJumps([1,3,6,4,1,2], 3)) // 5
// console.log(maximumJumps([1,3,6,4,1,2], 0)) // -1   我的输出1
// console.log(maximumJumps([0,2,1,3], 1)) // -1   我的输出1
// console.log(maximumJumps([1, 0, 2], 1)) // 1   我的输出-1




/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxNonDecreasingLength = function(nums1, nums2) {
    if(nums1.length === 1) return 1
    const len = nums1.length
    const arr = [Math.min(nums1[0], nums2[0])]
    for(let i = 1; i < len; i++) {
        let min = Math.min(nums1[i], nums2[i])
        const pre = arr[i - 1]
        if(min >= pre) {
            arr.push(min)
        } else {
            let max = Math.max(nums1[i], nums2[i])
            arr.push(max)
        }
    }
    if(arr.length === 1) return 1
    // console.log(arr)
    let count = 0
    for(let i = 0; i < arr.length-1;i++) {
        if(arr[i+1] >= arr[i]) {
            count++
        }
        if(i + 1 === arr.length - 1) {
            count++
            break
        }
    }
    return count
};

// console.log(maxNonDecreasingLength([2,3,1], [1,2,1])) // 2 [2,2,1]
// console.log(maxNonDecreasingLength([1,3,2,1], [2,2,3,4])) // 2 [2,2,1]
// console.log(maxNonDecreasingLength([1,1], [2,2])) // 2 [2,2,1]
// console.log(maxNonDecreasingLength([12,10], [16,2])) // 1 我的输出0
// console.log(maxNonDecreasingLength([8,7,4], [13,4,4])) // 2 我的输出1
