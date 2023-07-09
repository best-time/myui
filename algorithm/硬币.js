/**
 总共n个硬币
 每行放 k 个硬币
 计算能放几行
 */

// 迭代
function get(n) {
    for(let i = 1; i <= n; i++) {
        n = n - i
        if(n <= i) {
            return i
        }
    }
    return 0
}

console.log(get(10))


// 二分查找
// 1 + 2 + 3 + 4 + 5 + 6 + 7 +8 + ... +x == ((x + 1) * x) / 2

function get2(n) {
    let low = 0
    let high = n
    while(low <= high) {
        let mid = (high - low) / 2 + low
        let sum = ((mid + 1) * mid) / 2
        if(sum === n) {
            return mid
        } else if (sum < n) {
            low = low + 1
        } else {
            high = high - 1
        }
    }
    return -1
}

console.log(get2(10))
