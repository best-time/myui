// 求质数
function isPrime2(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            sum++;
        }
    }
    return sum === 2
}

// 是否是质数
const isPrime = (n) => {
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) return false
    }
    return n >= 2
}

const isPrime3 = function (n) {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
        if (n % i === 0) return false;
    }
    return true;
};



// 求范围内所有质数
// getPrimeList(1000)  1000以内所有质数
function getPrimeList(n) {
    const res = []
    for(let i = 0;i<n;i++){
        if(isPrime(i)){
            res.push(i)
        }
    }
    return res
}

// 判断数组是递增的
function isSorted(nums) {
    return nums.every((x, i) => i === 0 || x > nums[i - 1])
}


Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1


// 如果map函数里面用到了this关键字，还可以传入Array.from的第三个参数，用来绑定this。
Array.from({ length: 2 }, () => 'jack')
// ['jack', 'jack']

Array.from([1, , 2, , 3], (n) => n || 0)
// [1, 0, 2, 0, 3]



// 回溯
function backtracking() {

}


// 数组翻转
function reverseWords(strArr, start, end) {
    while (start < end) {
        [strArr[end], strArr[start]] = [strArr[start], strArr[end]]
        start++;
        end--;
    }
    return strArr
}

// 顺时针输出
var generateMatrix = function(n) {
    let startX = startY = 0;   // 起始位置
    let loop = Math.floor(n/2);   // 旋转圈数
    let mid = Math.floor(n/2);    // 中间位置
    let offset = 1;    // 控制每一层填充元素个数
    let count = 1;     // 更新填充数字
    let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

    while (loop--) {
        let row = startX, col = startY;
        // 上行从左到右（左闭右开）
        for (; col < n - offset; col++) {
            res[row][col] = count++;
        }
        // 右列从上到下（左闭右开）
        for (; row < n - offset; row++) {
            res[row][col] = count++;
        }
        // 下行从右到左（左闭右开）
        for (; col > startY; col--) {
            res[row][col] = count++;
        }
        // 左列做下到上（左闭右开）
        for (; row > startX; row--) {
            res[row][col] = count++;
        }

        // 更新起始位置
        startX++;
        startY++;

        // 更新offset
        offset += 1;
    }
    // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
    if (n % 2 === 1) {
        res[mid][mid] = count;
    }
    return res;
};


// 从后序
var buildTreepre = function(inorder, postorder) {
    if (!inorder.length) return null;
    const rootVal = postorder.pop(); // 从后序遍历的数组中获取中间节点的值， 即数组最后一个值
    let rootIndex = inorder.indexOf(rootVal); // 获取中间节点在中序遍历中的下标
    const root = new TreeNode(rootVal); // 创建中间节点
    root.left = buildTree(inorder.slice(0, rootIndex), postorder.slice(0, rootIndex)); // 创建左节点
    root.right = buildTree(inorder.slice(rootIndex + 1), postorder.slice(rootIndex)); // 创建右节点
    return root;
};

// 从前序与中序遍历序列构造二叉树
var buildTree = function(preorder, inorder) {
    if (!preorder.length) return null;
    const rootVal = preorder.shift(); // 从前序遍历的数组中获取中间节点的值， 即数组第一个值
    const index = inorder.indexOf(rootVal); // 获取中间节点在中序遍历中的下标
    const root = new TreeNode(rootVal); // 创建中间节点
    root.left = buildTree(preorder.slice(0, index), inorder.slice(0, index)); // 创建左节点
    root.right = buildTree(preorder.slice(index), inorder.slice(index + 1)); // 创建右节点
    return root;
};


// 回溯

var combine = function(n, k) {
    const res = [], path = [];
    backtracking(n, k, 1);
    return res;
    function backtracking (n, k, i){
        const len = path.length;
        if(len === k) {
            res.push(Array.from(path));
            return;
        }
        for(let a = i; a <= n + len - k + 1; a++) {
            path.push(a);
            backtracking(n, k, a + 1);
            path.pop();
        }
    }
};

// 回溯2
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
var combinationSum3 = function(k, n) {
    let res = [];
    let path = [];
    let sum = 0;
    const dfs = (path,index) => {
        // 剪枝操作
        if (sum > n){
            return
        }
        if (path.length == k) {
            if(sum == n){
                res.push([...path]);
                return
            }
        }
        for (let i = index; i <= 9 - (k-path.length) + 1;i++) {
            path.push(i);
            sum = sum + i;
            index += 1;
            dfs(path,index);
            sum -= i
            path.pop()
        }
    }
    dfs(path,1);
    return res
};


function a() {
    let result = []
    let path = []
    var combine = function(n, k) {
        result = []
        combineHelper(n, k, 1)
        return result
    };
    const combineHelper = (n, k, startIndex) => {
        if (path.length === k) {
            result.push([...path])
            return
        }
        for (let i = startIndex; i <= n - (k - path.length) + 1; ++i) {
            path.push(i)
            combineHelper(n, k, i + 1)
            path.pop()
        }
    }
}

/**

 1. 确定dp数组以及下标的含义
 dp[i]： 爬到第i层楼梯，有dp[i]种方法

 2 确定递推公式
 如何可以推出dp[i]呢？

 从dp[i]的定义可以看出，dp[i] 可以有两个方向推出来。

 首先是dp[i - 1]，上i-1层楼梯，有dp[i - 1]种方法，那么再一步跳一个台阶不就是dp[i]了么。

 还有就是dp[i - 2]，上i-2层楼梯，有dp[i - 2]种方法，那么再一步跳两个台阶不就是dp[i]了么。

 那么dp[i]就是 dp[i - 1]与dp[i - 2]之和！

 所以dp[i] = dp[i - 1] + dp[i - 2] 。

 在推导dp[i]的时候，一定要时刻想着dp[i]的定义，否则容易跑偏。

 这体现出确定dp数组以及下标的含义的重要性！

 3 dp数组如何初始化
 再回顾一下dp[i]的定义：爬到第i层楼梯，有dp[i]种方法。

 那么i为0，dp[i]应该是多少呢，这个可以有很多解释，但基本都是直接奔着答案去解释的。

 例如强行安慰自己爬到第0层，也有一种方法，什么都不做也就是一种方法即：dp[0] = 1，相当于直接站在楼顶。

 4 确定遍历顺序
 从递推公式dp[i] = dp[i - 1] + dp[i - 2];中可以看出，遍历顺序一定是从前向后遍历的

 5 举例推导dp数组
 举例当n为5的时候，dp table（dp数组）应该是这样的
 */

// 爬楼梯
var climbStairs = function(n) {
    // dp[i] 为第 i 阶楼梯有多少种方法爬到楼顶
    // dp[i] = dp[i - 1] + dp[i - 2]
    let dp = [1 , 2]
    for(let i = 2; i < n; i++) {
        dp[i] = dp[i - 1] + dp[i - 2]
    }
    return dp[n - 1]
};

// 不同路径
var uniquePathsWithObstacles = function(obstacleGrid) {
    const m = obstacleGrid.length
    const n = obstacleGrid[0].length
    const dp = Array(m).fill().map(item => Array(n).fill(0))

    for (let i = 0; i < m && obstacleGrid[i][0] === 0; ++i) {
        dp[i][0] = 1
    }

    for (let i = 0; i < n && obstacleGrid[0][i] === 0; ++i) {
        dp[0][i] = 1
    }

    for (let i = 1; i < m; ++i) {
        for (let j = 1; j < n; ++j) {
            dp[i][j] = obstacleGrid[i][j] === 1 ? 0 : dp[i - 1][j] + dp[i][j - 1]
        }
    }

    return dp[m - 1][n - 1]
};

// 打家劫舍
const rob = nums => {
    // 数组长度
    const len = nums.length;
    // dp数组初始化
    const dp = [nums[0], Math.max(nums[0], nums[1])];
    // 从下标2开始遍历
    for (let i = 2; i < len; i++) {
        dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1]);
    }
    return dp[len - 1];
};
