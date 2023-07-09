

// 输入：n = 4, time = 5
// 输出：2
// 解释：队伍中枕头的传递情况为：1 -> 2 -> 3 -> 4 -> 3 -> 2 。
// 5 秒后，枕头传递到第 2 个人手中。

var passThePillow = function(n, time) {
    const list = Array.from({...{length:n}}).map((it, index) => index + 1)
    let direction = true // 向右
    let i = 0
    let t = time
    while(t > 0) {
        if(direction) {
            i++
        } else {
            i--
        }
        if ( i >= n - 1 && direction) {
            direction = false
        } else if(!direction && i<= 0 ) {
            direction = true
        }
        t--
    }
    return list[i]
};

// passThePillow(3, 2)


/*
输入：root = [5,8,9,2,1,3,7,4,6], k = 2
输出：13
解释：树中每一层的层和分别是：
- Level 1: 5
- Level 2: 8 + 9 = 17
- Level 3: 2 + 1 + 3 + 7 = 13
- Level 4: 4 + 6 = 10
第 2 大的层和等于 13 。
 */
 function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
         this.left = (left===undefined ? null : left)
         this.right = (right===undefined ? null : right)
         }

var kthLargestLevelSum = function(root, k) {
    const len = root.length
    const total = getN(len)
    if(total < k) return -1
    let res = []
    for(let i = 0; i < total; i++) {
        const curArr = root.slice(0, Math.pow(2, i))
        const sum = curArr.reduce((prev, cur) => prev + (cur === null ? 0 : cur), 0)
        res.push(sum)
    }
    console.log(res, k)
    return res[k-1]
};

kthLargestLevelSum([5,8,9,2,1,3,7,4,6], 2)

function getN(len) {
    let sum = 0
    let i = 0
    for(; i<len; i++) {
        sum += Math.pow(2, i)
        if(sum >= len) {
            break
        }
    }
    return i + 1
}

getN(4)

var kthLargestLevelSum2 = function(root, k) {

    function getN(len) {
        let sum = 0
        let i = 0
        for(; i<len; i++) {
            sum += Math.pow(2, i)
            if(sum >= len) {
                break
            }
        }
        return i + 1
    }
    const len = root.length
    const total = getN(len)
    if(total < k) return -1
    let res = []
    for(let i = 0; i < total; i++) {
        const curArr = root.slice(0, Math.pow(2, i))
        const sum = curArr.reduce((prev, cur) => prev + (cur === null ? 0 : cur), 0)
        res.push(sum)
    }
    return res[k-1]
};
console.log(kthLargestLevelSum2([5,8,9,2,1,3,7,4,6], 2))
