/**
 * @param {string} s
 * @return {string}
 */
// var finalString = function(s) {
//     const sArr = s.split('')
//     const tlen = sArr.length
//     const arr = []
//     for(let i = 0; i < tlen; i++) {
//         if(sArr[i] === 'i') {
//             arr.reverse()
//         } else {
//             arr.push(sArr[i])
//         }
//     }
//     return arr.join('')
// };

// console.log(finalString('poiinter'))
// console.log(finalString('string'))



/**
 * @param {string} s
 * @return {string}
 */
var finalString = function(s) {
    const arr = []
    let reverse = false
    for(let i = 0; i < s.length;i++) {
        if(s[i] === 'i') {
            reverse = !reverse
            continue
        }
        if(!reverse) {
            arr.push(s[i])
        } else {
            arr.unshift(s[i])
        }

    }
    return reverse ? arr.reverse().join('') : arr.join('')
};

console.log(finalString('string'))


/**
 * @param {number[][]} grid
 * @return {number}
 */
var maximumSafenessFactor = function(grid) {
    const rowLen = grid.length
    const colLen = grid[0].length
    for(let i = 0; i < rowLen; i++) {
        for(let i = 0; j < colLen; j++) {
            if(grid[i][j] === 1) {

            }
        }
    }
};

// console.log(maximumSafenessFactor([[0,0,0,1],[0,0,0,0],[0,0,0,0],[1,0,0,0]]))


/**
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function(nums, m) {
    const arr = []
    const len = nums.length
    while(nums.length >= 1) {
        if(nums.length > 1) {
            const [start, end] = [nums[0], nums[nums.length - 1]]
            let index = 0
            if(start > end) {
                index = nums.length - 1
            }
            const count = nums.reduce((prev, now) => prev + now, 0)
            if(count < m) {
                break
            }
        }
    }
    console.log(arr.length === len)
    return arr.length === len
};
// canSplitArray([2, 2, 1], 4)
// canSplitArray([2, 1, 3], 5)
canSplitArray([2, 3, 3, 2, 3], 6)
