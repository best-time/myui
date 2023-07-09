/**
 * @param {number[][]} nums
 * @return {number}
 */
var diagonalPrime = function(nums) {
    const len = nums.length
    let max = 0
    for(let i = 0 ; i < len; i++) {
        const cur = nums[i][i]
        const cur2 = nums[i][nums.length - i - 1]
        if(isPrime(cur) && isPrime(cur2)) {
            max = Math.max(cur, cur2, max)
        } else if (isPrime(cur)) {
            max = Math.max(cur, max)
        } else if (isPrime(cur2)) {
            max = Math.max( cur2, max)
        }
    }
    return max
    function isPrime(n) {
        let sum = 0;
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) {
                sum++;
            }
        }
        return sum === 2
    }
};
const arr1 = [
    [1,2,3],
    [5,6,7],
    [9,10,11]
]
// console.log(diagonalPrime(arr1))

const arr2 = [[1,2,3],[5,17,7],[9,11,10]]
// console.log(diagonalPrime(arr2))


/*

输入：nums = [0,5,3]
输出：[0,0,0]
解释：因为 nums 中的元素互不相同，对于所有 i ，都有 arr[i] = 0 。


输入：nums = [1,3,1,1,2]
输出：[5,0,3,4,0]
解释：
i = 0 ，nums[0] == nums[2] 且 nums[0] == nums[3] 。因此，arr[0] = |0 - 2| + |0 - 3| = 5 。
i = 1 ，arr[1] = 0 因为不存在值等于 3 的其他下标。
i = 2 ，nums[2] == nums[0] 且 nums[2] == nums[3] 。因此，arr[2] = |2 - 0| + |2 - 3| = 3 。
i = 3 ，nums[3] == nums[0] 且 nums[3] == nums[2] 。因此，arr[3] = |3 - 0| + |3 - 2| = 4 。
i = 4 ，arr[4] = 0 因为不存在值等于 2 的其他下标。




解释：

i = 0 ，nums[0] == nums[2] 且 nums[0] == nums[3] 。因此，arr[0] = |0 - 2| + |0 - 3| = 5 。
i = 2 ，nums[2] == nums[0] 且 nums[2] == nums[3] 。因此，arr[2] = |2 - 0| + |2 - 3| = 3 。
i = 3 ，nums[3] == nums[0] 且 nums[3] == nums[2] 。因此，arr[3] = |3 - 0| + |3 - 2| = 4 。
翻译下就是

左边abs(0-0x0)+右边abs(5-0x2)=5     0  2 3
左边abs(0-2x1)+右边((5-0-2)-1x2)=3  2  0 3
左边abs((0+2)-3x2)+右边abs((5-2-3)-0x3)=4   3  0 2

目标左边的和-目标左边项数 的绝对值   +   目标右边的和—目标右边项数 的绝对值
 */
var distance = function(nums) {
    const map = {};
    const n = nums.length;
    const ans = new Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        map[x] = map[x] || [0];
        map[x].push(map[x][map[x].length - 1] + i);
    }
    console.log(map)
    const cnt = {};
    for (let i = 0; i < n; i++) {
        const x = nums[i];
        cnt[x] = cnt[x] || 0;
        cnt[x] += 1;
        const c = cnt[x];
        let left = Math.abs(map[x][c - 1] - i * (c - 1));
        let right = Math.abs(map[x][map[x].length - 1] - map[x][c] - (map[x].length - c - 1) * i);
        ans[i] = left + right
    }
    return ans;
};

console.log(distance([1,3,1,1,2])) // [5,0,3,4,0]

console.log('----------------------------------------------------------------------------------------------')


/*
给你一个下标从 0 开始的整数数组 nums 和一个整数 p 。请你从 nums 中找到 p 个下标对，
每个下标对对应数值取差值，你需要使得这 p 个差值的 最大值 最小。同时，你需要确保每个下标在这 p 个下标对中最多出现一次。

对于一个下标对 i 和 j ，这一对的差值为 |nums[i] - nums[j]| ，其中 |x| 表示 x 的 绝对值 。

请你返回 p 个下标对对应数值 最大差值 的 最小值 。
 */
/**
 * @param {number[]} nums
 * @param {number} p
 * @return {number}
 */
// 从 nums 中找到 p 个下标对，
// 每个下标对对应数值取差值
var minimizeMax = function(nums, p) {
    nums.sort((a, b) => a- b)
    const n = p
    const res = []
    console.log(nums)
    let min = Infinity // 所有组中差值最小
    let diffMax = -Infinity // 两数差值最大值
    for(let i = 0; i < 2 * n; i++) {
        let cur = nums[i]
        let next = nums[i + 1]
        const dif = Math.abs(cur-next)
        diffMax = Math.max(dif, diffMax)
        res.push([cur, next])

    }
    return min
};

// console.log(minimizeMax([10,1,2,7,1,3], 2))
// console.log(minimizeMax([4,2,1,2], 1))
