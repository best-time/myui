/**
 * @param {number} mainTank
 * @param {number} additionalTank
 * @return {number}
 */
var distanceTraveled = function(mainTank, additionalTank) {
    if(mainTank < 1) return 0
    let count = 0
    let index = mainTank
    let subIndex = additionalTank
    while(index--) {
        count++
        if(count % 5 === 0) {
            if(subIndex >= 1) {
                index += 1
                subIndex--
            }
        }
    }
    return count * 10
};

// console.log(distanceTraveled(5, 10))
// console.log(distanceTraveled(1, 2))
// console.log(distanceTraveled(10, 1))


/**
 * @param {number[]} nums
 * @return {number}
 */
var findValueOfPartition = function(nums) {
    nums.sort((a, b) => a - b)
    let i = 0
    let len = nums.length
    let min = Infinity
    for(; i < len-1; i++) {
        min = Math.min(Math.abs(nums[i] - nums[i + 1]), min)
    }
    return min
};

// console.log(findValueOfPartition([1,3,2,4]))
// console.log(findValueOfPartition([10, 1, 100]))
// 1 , 2 , 3 5   [1,2] [3,4]

// 1, 10 100    [10] [1,100]



/**
 * @param {number[]} nums
 * @return {number}
 */
var specialPerm = function(nums) {
    nums.sort((a, b) => {
        return a - b
    })
    let result = []
    let path = []
    let n = nums
    let k = nums.length
    function isAb(arr) {
        for(let i = 0, len = arr.length; i < len-1; i++) {
            if((arr[i] % arr[i+1] !== 0) && (arr[i+1] % arr[i] !== 0)) {
                return false
            }
        }
        return true
    }
    function backtracking(used) {
        if(path.length === k && isAb(path)) {
            result.push(Array.from(path));
            return;
        }
        for (let i = 0; i < k; i++ ) {
            if(used[i]) continue;
            path.push(n[i]);
            used[i] = true; // 同支
            backtracking(used);
            path.pop();
            used[i] = false;
        }
    }
    backtracking([])
    // console.log(result)
    // return result

    return result.length % (Math.pow(10, 9) + 7)
};

// console.log(specialPerm([2,3,6]))
// console.log(specialPerm2([7,21,63,9,54,6,18,90,30,10]))
// console.log(specialPerm([1,4,3]))
// console.log(4 % 1)


var specialPerm2 = function(nums) {
    const MOD = 1e9 + 7
    // 状态压缩
    const cache = new Map()
    const getKey = (i, used, prev) => `${i},${used},${prev}`

    function dfs(i, used, prev) {
        if (i == nums.length) { // 匹配完毕
            return 1
        }
        const key = getKey(i, used, prev)
        if (cache.has(key)) {
            return cache.get(key)
        }
        let sum = 0
        for (let j = 0; j < nums.length; j++) {
            // 如果被使用过,不能在使用
            if (used & (1 << j)) continue;
            // 满足
            if ((nums[j] % prev == 0 ) || (prev % nums[j] == 0)) {
                const t = dfs(i + 1, (used | (1 << j)), nums[j]) % MOD
                sum = (sum + t) % MOD
            }
        }
        cache.set(key, sum)
        return sum
    }

    return dfs(0, 0, 1) % MOD
};

console.log(specialPerm2([7,21,63,9,54,6,18,90,30,10]))
