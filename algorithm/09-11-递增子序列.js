/* ---------------------------------- 最长 连续 递增子序列 ------------------------------------------ */
const findLengthOfLCIS = (nums) => {
    let dp = new Array(nums.length).fill(1);

    for(let i = 0; i < nums.length - 1; i++) {
        if(nums[i+1] > nums[i]) {
            dp[i+1] = dp[i]+ 1;
        }
    }
    console.log(dp)
    return Math.max(...dp);
};

// console.log(findLengthOfLCIS([1,3,5,4,7]))
// console.log(findLengthOfLCIS([2,2,2,2,2]))

function getSequence(arr) {
    const dp = new Array(arr.length).fill(1);

    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < i; j++) {
            if (arr[j] < arr[i] && dp[j]+1 > dp[i]) {
                dp[i] = dp[j]+1;
            }
        }
    }

    console.log({ arr, dp });
    let max = Math.max(...dp);
    const result = [];
    for (let i = arr.length-1; max > 0; i--) {
        if (dp[i] === max) {
            result.unshift(arr[i]);
            max--;
            // console.log({result});
        }
    }

    return result;
}

// console.log(getSequence([1,3,5,4,7]));
// console.log(getSequence([1, 3, 0, 6])); // [1, 3, 6]
// console.log(getSequence([1, 3, 5, 7, 11, 6, 12])); // [1, 3, 5, 7, 11, 12]
console.log(getSequence([3, 7, 11, 15, 9, 11, 12])); // [ 3, 7, 9, 11, 12 ]
// console.log(getSequence([3, 7, 22, 4, 8, 13, 9, 11, 12])); // [3, 7, 8, 9, 11, 12]



/*   ------------------------------------------------   最长 递增子序列 ------------------------------------------ */
// [10,9,2,5,3,7,101,18]   4
// [0,1,0,3,2,3]        4
 // [7,7,7,7,7,7,7]         1

// dp[i]表示i之前包括i的以nums[i]结尾的最长递增子序列的长度
function lengthOfLIS(nums) {
    const dp = Array.from({length: nums.length}, () => 1)
    let res = 0
    for(let i = 1; i < nums.length - 1; i++) {
        for(let j = 0; j < i; j++) {
            if(nums[i] > nums[j]) {
                dp[i] = Math.max(dp[i], dp[j]+ 1)
                if(dp[i] > res) {
                    res = dp[i]
                }
            }
        }
    }
    return res // Math.max.apply(this, dp)
}

// console.log(lengthOfLIS([10,9,2,5,3,7,101,18]))
// console.log(lengthOfLIS([0,1,0,3,2,3]))
// console.log(lengthOfLIS([7,7,7,7,7,7,7]))
