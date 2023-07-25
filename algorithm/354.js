/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfSquares = function(nums) {
    const len = nums.length
    const list = [0, ...nums]
    let count = 0
    for(let i = 1; i < list.length; i++) {
        if(len % i === 0) {
            count += list[i] * list[i]
        }
    }
    return count
};

// [2,7,1,19,18,3] // 14   答案: 63
// console.log(sumOfSquares([2,7,1,19,18,3]))



/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var maximumBeauty = function(nums, k) {
    const noSame = [...new Set(nums)]
    if(noSame.length - 1 === 0) return nums.length
    const len = nums.length
    let count = len - noSame.length + 1
    nums.sort((a, b) => a - b)
    function inArr(v, arr) {
        return v >= arr[0] && v <= arr[1]
    }
    for(let i = 0; i < len; i++) {
        const cur = nums[i]
        let [min, max] = [cur - k, cur + k]
        let j = i === 0 ? 1 : 0
        let c = 1
        while(j < len) {
            if(j === i) {
                j++
                continue
            }
            // console.log(nums, j)
            const n = nums[j++]
            const [nMin, nMax] = [n - k, n + k]
            if(inArr(nMin, [min, max] || inArr(nMax, [min, max]))) {
                c++
            } else {
                break
            }
        }
        count = Math.max(count, c)
    }
    return count
};

// console.log(maximumBeauty([4,6,1,2], 2)) // 3
// console.log(maximumBeauty([1,1,1,1], 10)) // 4/**/
// console.log(maximumBeauty([49, 26], 12)) // 预期2 输出1
//
// console.log(maximumBeauty([50,28,30,51], 2)) // 预期 2   输出3
// console.log(maximumBeauty([4, 6, 1, 2], 2))   // 预期3  输出1
// console.log(maximumBeauty([48,93,96,19], 24))   // 预期3  输出2
console.log(maximumBeauty([58,94,0,16,40,47,94,64,22,47,76,11], 2))   // 预期2  输出3


var maximumBeauty22 = function(nums, k) {
    nums.sort((a, b) => a - b);
    const len = nums.length;
    const k2 = k * 2;
    let left = 0;
    let right = 0;
    let result = 0;
    for (; right < len; ++right) {
        while (right > left) {
            if (nums[right] - nums[left] > k2) {
                left++;
            } else {
                break;
            }
        }
        result = Math.max(result, right - left + 1);
    }

    return result;
};


var minimumIndex = function(nums) {
    const map = new Map();
    let max = nums[0];
    map.set(max, 1);
    for (let i = 1; i < nums.length; ++i) {
        const num = nums[i];
        const val = (map.get(num) || 0) + 1;
        if (val > map.get(max)) {
            max = num;
        }
        map.set(num, val);
    }
    const sum = map.get(max);
    if (sum * 2 <= nums.length) {
        return -1;
    }
    let math = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] === max) {
            math++;
        }
        if ((math * 2 > i + 1) && (sum - math) * 2 > (nums.length - i - 1)) {
            return i;
        }
    }
    return -1;
};
