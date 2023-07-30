/**
 * @param {number[]} nums
 * @return {number}
 * 1 <= nums.length <= 105
    1 <= nums[i] <= 106
 *
 * https://leetcode.cn/problems/largest-element-in-an-array-after-merge-operations/description/
 */
var maxArrayValue = function(nums) {
    let sum = 0
    let ans = 0
    while(nums.length) {
        const last = nums.pop()
        if(last <= sum) {
            sum += last
        } else {
            sum = last
        }
        ans = Math.max(sum, ans)
    }
    return ans
};



// https://leetcode.cn/problems/maximum-beauty-of-an-array-after-applying-operation/
var maximumBeauty = function(nums, k) {
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



/**
 * 354周赛
 * @param {number[]} nums
 * @return {number}
 *
 * https://leetcode.cn/problems/minimum-index-of-a-valid-split/
 */
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



/**
 * 动态规划   353周赛
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 *
 * https://leetcode.cn/problems/maximum-number-of-jumps-to-reach-the-last-index/
 */
var maximumJumps = function(nums, target) {
    let n = nums.length;
    let dp = new Array(n).fill(-1);
    dp[0] = 0;
    for (let i = 1; i < n; i++) {
        for (let j = i - 1; j >= 0; j--) {
            let diff = nums[i] - nums[j];
            if (diff <= target && diff >= -target && dp[j] !== -1) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }
    return dp[n - 1]
};


/**
 * 动态规划
 * 353周赛
 *
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 *
 * https://leetcode.cn/problems/longest-non-decreasing-subarray-from-two-arrays/
 */
var maxNonDecreasingLength = function(nums1, nums2) {
    let n = nums1.length;
    let dp = Array.from({length: n}).map(_ => new Array(2).fill(1))
    // dp[0][0] = 1
    let res = 1;
    for (let i = 1; i < n; i++) {
        let a = nums1[i];
        let b = nums2[i];
        dp[i][0] = Math.max(1, a >= nums1[i - 1] ? dp[i - 1][0] + 1 : 1, a >= nums2[i - 1] ? dp[i - 1][1] + 1: 1);
        dp[i][1] = Math.max(1, b >= nums2[i - 1] ? dp[i - 1][1] + 1: 1, b >= nums1[i - 1] ? dp[i - 1][0] + 1: 1);
        res = Math.max(res, dp[i][0], dp[i][1])
    }
    return res;
};



/**
 * 动态规划
 * 353周赛
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 *
 * https://leetcode.cn/problems/apply-operations-to-make-all-array-elements-equal-to-zero/
 */
var checkArray = function(nums, k) {
    // let i = 0;
    let n = nums.length;
    let dp = new Array(n + 2).fill(0);
    for (let i = 0; i < n; i++) {
        let cur = nums[i];
        let diff = dp[i];
        if (cur + diff < 0) return false;
        if (cur + diff === 0) {
            dp[i + 1] += dp[i];
            continue;
        }
        if (i > n - k) return false;
        let val = cur + diff;
        dp[i + 1] -= val;
        dp[i + k] += val;
        dp[i + 1] += dp[i]
    }
    // console.log(dp)
    return true;
};
//[0,16,0,29,0,0,0,9,0,0,0,0,0,0,0,0,0,95,49,0,0,0,0,68]
//24
//false





/**
 * 352
 * @param {number[]} nums
 * @param {number} threshold
 * @return {number}
 */

var check = (arr, t) => {
    let n = arr.length;
    if (arr[0] % 2 === 1) return false;
    for (let i = 0; i < n - 1; i++) {
        if ((arr[i] % 2) === (arr[i + 1] % 2)) return false;
    }
    for (let temp of arr) {
        if (temp > t) return false;
    }
    return true;
}
var longestAlternatingSubarray = function(nums, threshold) {
    let n = nums.length;
    let res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            let sub = nums.slice(i, j + 1);
            if (check(sub, threshold)) {
                res = Math.max(res, sub.length)
                // console.log(i, j, sub)
            }
        }
    }
    return res;
};




/**
 * 352
 * @param {number} n
 * @return {number[][]}
 */
let arr = new Array(10 ** 6 + 1).fill(-1);
for (let i = 2; i < arr.length; i++) {
    if (arr[i] !== -1) continue;
    for (let j = i; j < arr.length; j += i) {
        if (arr[j] !== -1) continue;
        arr[j] = i;
    }
}
// console.log(arr)
var findPrimePairs = function(n) {
//5 * 10 ** 5
    let set = new Set();
    let res = []
    for (let i = 2; i <= Math.floor(n / 2); i++) {
        if (arr[i] === i) {
            let t = n - i;
            if (t >= 2 && arr[t] === t) {
                res.push([i, t])
            }
        }
    }
    return res;
};



/**
 * 352
 * @param {number[]} nums
 * @return {number}
 */


var continuousSubarrays = function(nums) {
    let n = nums.length;
    let l = [];
    let s = [];
    let res = 0n
    let i = 0;
    var getMax = (val) => {
        if (l.length === 0) return val;
        return Math.max(val, l[0][0])
    }
    var getMin = (val) => {
        if (s.length === 0) return val;
        return Math.min(val, s[0][0])
    }
    for (let j = 0; j < n; j++) {
        let cur = nums[j];
        while (i < j && getMax(cur) - getMin(cur) > 2) {
            if (l.length && l[0][1] === i) l.shift();
            if (s.length && s[0][1] === i) s.shift();
            i += 1;
        }
        while (l.length && l[l.length - 1][0] <= cur) l.pop();
        while (s.length && s[s.length - 1][0] >= cur) s.pop();
        l.push([cur, j]);
        s.push([cur, j]);
        let len = j - i + 1;
        res += BigInt(len);
        // console.log(i, j, len)
    }
    return Number(res);

};




/**
 * 352
 * @param {number[]} nums
 * @return {number}
 */
var sumImbalanceNumbers = function(nums) {
    let n = nums.length;
    let count = Array.from({length: n}).map(_ => new Array(n).fill(0));
    let count2 = Array.from({length: n}).map(_ => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        let s = new Set();
        let arr = new Array(n + 2).fill(0);
        let c = 0;
        for (let j = i; j < n; j++) {
            let t = nums[j];
            s.add(t);
            count[i][j] = s.size;
            arr[t] += 1;
            if (arr[t] === 1 && arr[t - 1]) c += 1;
            if (arr[t] === 1 && arr[t + 1]) c += 1;
            count2[i][j] = c;
        }

    }
    let res = 0;
    for (let i = 0; i < n; i++) {
        for (let j = i; j < n; j++) {
            res += count[i][j] - 1 - count2[i][j]
        }
    }
    return res;
    // dp[i][j]
};




/**
 * 351
 * @param {number[]} nums
 * @return {number}
 */
var countBeautifulPairs = function(nums) {
    const N = nums.length
    let ans = 0
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const strj = String(nums[j])
            if (gcd(+String(nums[i])[0], +strj[strj.length - 1]) === 1) ans++
        }
    }
    return ans
    function gcd(a, b) {
        // console.log('gcd', a, b, b === 0 ? a : a % b)
        return b === 0 ? a : gcd(b, a % b)
    }
};


/**
 * 351
 * @param {number} num1
 * @param {number} num2
 * @return {number}
 */
var makeTheIntegerZero = function(num1, num2) {
    if (num2 === 0) return count1(num1)
    for (let op = 1; op < 1e9; op++) {
        num1 -= num2
        if (num1 <= 0) return -1
        if (op > num1) return -1
        if (op >= count1(num1)) return op
    }
    return -2
};
function count1(num) {
    let count = 0
    while(num) {
        if (num % 2) count++
        num = Math.floor(num / 2)
    }
    return count
}


/**
 * 351
 * @param {number[]} nums
 * @return {number}
 */
var numberOfGoodSubarraySplits = function(nums) {
    const N = nums.length, MOD = 1e9 + 7
    const dp = Array(N + 1).fill(0)
    for (let i = 1, zeros = 0; i <= N; i++) {
        dp[i] = nums[i - 1] === 0 ? dp[i - 1] :
            (dp[i - 1] ? dp[i - 1] * (zeros + 1) : 1)
        dp[i] %= MOD
        if (nums[i - 1] === 1) zeros = 0
        else zeros++
    }
    // con
    return dp[N]
};


/**
 *
 * 351
 * @param {number[]} positions
 * @param {number[]} healths
 * @param {string} directions
 * @return {number[]}
 */
var survivedRobotsHealths = function(positions, healths, directions) {
    const robots = positions.map((position, i) => ({i, position, health: healths[i], direction: directions[i]}))
        .sort((l, r) => l.position - r.position)
    const stack = [], rem = []
    l1: for (let robot of robots) {
        if (robot.direction === 'R') stack.push(robot)
        else {
            while (stack.length) {
                const last = stack[stack.length - 1]
                if (last.health === robot.health) {
                    stack.pop()
                    continue l1
                } else if (last.health > robot.health) {
                    last.health--
                    continue l1
                } else {
                    stack.pop()
                    robot.health--
                }
            }
            rem.push(robot)
        }
    }
    const ans = [...rem, ...stack].sort((l, r) => l.i - r.i)
    return ans.map(x => x.health)
};
// ----------------------------------------------------------------------------------------------------------------

/*

给定一个字符串 s 和一个整数 k，从字符串开头算起, 每计数至 2k 个字符，就反转这 2k 个字符中的前 k 个字符。
如果剩余字符少于 k 个，则将剩余字符全部反转。
如果剩余字符小于 2k 但大于或等于 k 个，则反转前 k 个字符，其余字符保持原样。

示例:
输入: s = "abcdefg", k = 2
输出: "bacdfeg"

 */
// 不借用变量, 反转字符串
function reverseString(resArr = [], start, end) {
    let l = start - 1
    let r = end >= resArr.length ? resArr.length : end
    while(++l < --r) {
        [resArr[l], resArr[r]] =  [resArr[r], resArr[l]]
    }
    return resArr
}

// console.log(reverseString(('abcdef').split(''), 1, 9))
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
    const len = s.length;
    let resArr = s.split("");
    for(let i = 0; i < len; i += 2 * k) {  // 每隔 2k 个字符的前 k 个字符进行反转
        let l = i - 1
        let r = i + k > len ? len : i + k;
        while(++l < --r) {
            [resArr[l], resArr[r]] = [resArr[r], resArr[l]]
        }
    }
    return resArr.join("");
};
// reverseStr('abcdefg', 2)


// ----------------------------------------------------------------------------------------------------------------


/*

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1： 输入：s = "We are happy."
输出："We%20are%20happy."

#
 */

/**
 * @param {string} s
 * @return {string}
 * 数组扩容, 把老数组长度--   新数组长度--, 复制老数组元素到 新索引
 */
var replaceSpace = function(s) {
    // 字符串转为数组
    const strArr = Array.from(s);
    let count = 0;

    // 计算空格数量
    for(let i = 0; i < strArr.length; i++) {
        if (strArr[i] === ' ') {
            count++;
        }
    }

    let left = strArr.length - 1; // 原字符串最后一位
    let right = strArr.length + count * (3 - 1) - 1;  // 扩容后最后一位

    while(left >= 0) {
        if (strArr[left] === ' ') {
            strArr[right--] = '0';
            strArr[right--] = '2';
            strArr[right--] = '%';
            left--;
        } else {
            strArr[right--] = strArr[left--];
        }
    }

    // 数组转字符串
    return strArr.join('');
};
// replaceSpace("We are happy.")

// ----------------------------------------------------------------------------------------------------------------

/*
字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。
比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

示例 1：
输入: s = "abcdefg", k = 2
输出: "cdefgab"

示例 2：
输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"

限制：
1 <= k < s.length <= 10000

https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof/
 */

var reverseLeftWords = function(s, n) {
    const length = s.length;
    let i = 0;
    while (i < length - n) { // 把末尾字符往前面添加, 然后截取一个 length 长度
        s = s[length - 1] + s;
        i++;
    }
    return s.slice(0, length);
};

// reverseLeftWords('abcdefg', 2)

var reverseLeftWords2 = function (s, n) {
    /** Utils */
    function reverseWords(strArr, start, end) {
        let temp;
        while (start < end) {
            // temp = strArr[start];
            // strArr[start] = strArr[end];
            // strArr[end] = temp;
            [strArr[end], strArr[start]] = [strArr[start], strArr[end]]
            start++;
            end--;
        }
    }
    /** Main code */
    let strArr = s.split('');
    let length = strArr.length;
    reverseWords(strArr, 0, length - 1); // 整体反转
    reverseWords(strArr, 0, length - n - 1); // 前 length - n 反转
    reverseWords(strArr, length - n, length - 1); // length-n length - 1 反转
    return strArr.join('');
};
const res= reverseLeftWords2('abcdefg', 2)
console.log(res, 573)


// KMP 算法
