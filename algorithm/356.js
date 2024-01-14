/**
 * @param {number[]} nums
 * @return {number}
 *
 * 第二题
 */
const countCompleteSubarrays = function(nums) {
    let res = 0
    let n = nums.length;
    const set = new Set(nums); // 去重
    const tot = set.size; // 去重后长度
    for (let i = 0; i < n; i++) {
        let map = new Map();
        for (let j = i; j < n; j++) {
            map.set(nums[j], (map.get(nums[j]) || 0) + 1);
            if (map.size === tot) ++res;
        }
    }
    console.log(res)
    return res;
};

// console.log()
// [1,3,1,2]、[1,3,1,2,2]、[3,1,2] 和 [3,1,2,2]

// countCompleteSubarrays([1,2,3])
// countCompleteSubarrays([5,5,5,5])

var countCompleteSubarrays2 = function(nums) {
    const noUniqLen = [...new Set(nums)].length
    let ans = 0
    for(let i = 0; i < nums.length; i++) {
        const s = new Set()
        for(let j = i; j < nums.length; j++) {
            s.add(nums[j])
            if(s.size === noUniqLen) {
                ans += 1
            }
        }
    }
    return ans
};
console.log(countCompleteSubarrays2([1,3,1,2,2]))
