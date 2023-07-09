/*
n x n 棋盘, 从左上角出发, 访问棋盘上的每个格子 恰好一次

[0, n * n - 1] 内的不同整数组成，

其中 grid[row][col] 表示单元格 (row, col) 是骑士访问的第 grid[row][col] 个单元格。

骑士的行动是从下标 0 开始的

骑士行动时可以垂直移动两个格子且水平移动一个格子，或水平移动两个格子且垂直移动一个格子

输入：grid = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]]
输出：true

输入：grid = [[0,3,6],[5,8,1],[2,7,4]]
输出：false


提示：
    n == grid.length == grid[i].length
    3 <= n <= 7
    0 <= grid[row][col] < n * n
    grid 中的所有整数 互不相同

 */

const arr1 = [[0,11,16,5,20],[17,4,19,10,15],[12,1,8,21,6],[3,18,23,14,9],[24,13,2,7,22]] // true
const arr2 = [[0,3,6],[5,8,1],[2,7,4]] // false

var checkValidGrid = function(grid) {
    const len = grid.length;
    const limit = len * len;
    const rows = new Array(limit);
    const cols = new Array(limit);
    for(let i = 0; i < len; i++) {
        for(let j = 0; j < len; j++) {
            rows[grid[i][j]] = i;
            cols[grid[i][j]] = j;
        }
    }
    let row = 0;
    let col = 0;
    for(let i = 1; i < limit; i++) {
        const dis_r = Math.abs(rows[i] - row);
        const dis_c = Math.abs(cols[i] - col);
        if((dis_r === 2 && dis_c === 1) || (dis_c === 2 && dis_r === 1)) {
            row = rows[i];
            col = cols[i];
        }
        else {
            return false;
        }
    }
    return true;

};

var checkValidGrid2 = function(grid) {
    let n = grid.length
    let d = new Array(n * n)
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            d[grid[i][j]]=[i,j]
            if(grid[i][j]===0){
                if(i!==0||j!==0)return false
            }
        }
    }
    for(let i=1;i<n*n;i++){
        let a=d[i][0]-d[i-1][0]
        let b=d[i][1]-d[i-1][1]
        if (a*a+b*b!==5)return false
    }
    return true
};

checkValidGrid2(arr2)


var checkValidGrid3 = function(grid) {
    if (grid[0][0] !== 0) return false;
    const dirs = [
        [-2, 1],
        [-1, 2],
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1]
    ];
    const n = grid.length;
    const dfs = (x, y, cur) => {
        if (grid[x][y] ===  n * n - 1) {
            return true;
        }
        for (const [sx, sy] of dirs) {
            const nx = x + sx
            const ny = y + sy;
            const t1 = nx >= 0 && nx < n
            const t2 = ny >= 0 && ny < n
            if (t1 && t2 ) {
                const t3 = grid[nx][ny] === cur + 1
                if(t3 && dfs(nx, ny, cur + 1)) {
                    return true;
                }
            }
        }
        return false;
    }
    return dfs(0, 0, 0);
};

checkValidGrid3(arr1)
// checkValidGrid3(arr2)


;(function() {
    /*
    给你一个由正整数组成的数组 nums 和一个 正 整数 k 。
    如果 nums 的子集中，任意两个整数的绝对差均不等于 k ，则认为该子数组是一个 美丽 子集。


    示例 1：

    输入：nums = [2,4,6], k = 2
    输出：4
    解释：数组 nums 中的美丽子集有：[2], [4], [6], [2, 6] 。
    可以证明数组 [2,4,6] 中只存在 4 个美丽子集。
    示例 2：

    输入：nums = [1], k = 1
    输出：1
    解释：数组 nums 中的美丽数组有：[1] 。
    可以证明数组 [1] 中只存在 1 个美丽子集。

     */
    // 美丽子集
     const arr1 = [2,4,6]
     const arr2 = [1]
    var beautifulSubsets = function(nums, k) {
        nums.sort((a,b) => a - b)
        const obj = {}
        let result = 0
        function backtracking(startIndex) {
            result++
            for(let i = startIndex; i < nums.length; i++) {
                const item = nums[i] - k
                if(obj[item]) continue
                obj[nums[i]] = true
                backtracking(i + 1)
                obj[nums[i]] = false
            }
        }
        backtracking(0)
        return result - 1
    };
    beautifulSubsets(arr1, 2)
})()


;(function() {
    /*
    给你一个下标从 0 开始的整数数组 nums 和一个整数 value 。

在一步操作中，你可以对 nums 中的任一元素加上或减去 value 。

例如，如果 nums = [1,2,3] 且 value = 2 ，你可以选择 nums[0] 减去 value ，得到 nums = [-1,2,3] 。
数组的 MEX (minimum excluded) 是指其中数组中缺失的最小非负整数。

例如，[-1,2,3] 的 MEX 是 0 ，而 [1,0,3] 的 MEX 是 2 。
返回在执行上述操作 任意次 后，nums 的最大 MEX 。


示例 1：

输入：nums = [1,-10,7,13,6,8], value = 5
输出：4
解释：执行下述操作可以得到这一结果：
- nums[1] 加上 value 两次，nums = [1,0,7,13,6,8]
- nums[2] 减去 value 一次，nums = [1,0,2,13,6,8]
- nums[3] 减去 value 两次，nums = [1,0,2,3,6,8]
nums 的 MEX 是 4 。可以证明 4 是可以取到的最大 MEX 。


示例 2：

输入：nums = [1,-10,7,13,6,8], value = 7
输出：2
解释：执行下述操作可以得到这一结果：
- nums[2] 减去 value 一次，nums = [1,-10,0,13,6,8]
nums 的 MEX 是 2 。可以证明 2 是可以取到的最大 MEX 。

链接：https://leetcode.cn/problems/smallest-missing-non-negative-integer-after-operations
     */

const nums = [1,-10,7,13,6,8] // [1 0 2 3 1 3]  [1, 2, 1, 2, 0]
    const value = 7
    /**
     * @param {number[]} nums
     * @param {number} value
     * @return {number}
     */
    function findSmallestInteger(nums, value) {
        const ms = new Array(value).fill(0);
        for (const n of nums) { // 对 nums 所有元素与 value 取模计数，得到数组 ms
            const mod = n % value + (n % value < 0 ? value : 0);
            ms[mod]++;
        }

        let ans = 0;
        // 遍历区间 [0,nums.length)，消费 ms，直到遍历结束 或 ms 中某个余数被消耗完（ms[i % value] < 1） ，此时的下标 i 即所求结果
        for (let i = 0; i < nums.length; i++, ans++) {
            const mod = i % value;
            if (ms[mod] < 1) break;
            ms[mod]--;
        }
        return ans;
    }

    findSmallestInteger(nums, value)
})()
