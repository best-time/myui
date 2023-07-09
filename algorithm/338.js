// 3 3 5 11
// -2
var kItemsWithMaximumSum = function(numOnes, numZeros, numNegOnes, k) {
    function getArr(len, num) {
        if(len < 1) return []
        return Array.from({length: len}).fill(num)
    }
    const list = [...getArr(numOnes, 1), ...getArr(numZeros, 0), ...getArr(numZeros, -1)]
    let total = 0
    for(let i =0; i < k; i++) {
        total += list[i]
    }
    return total
};

// console.log(kItemsWithMaximumSum(3,3,5,11))

const nums1 = [4,9,6,10]
const nums2 = [6,8,11,12]
const nums3 = [5,8,3]
/*
贪心 + 预处理质数集合 + 二分查找

一、预处理 <= 1000 的所有质数
二、贪心地考虑：每个数字应该尽可能减小到最小，这样更有可能使数组严格递增
三、对于每个数字，查找小于等于它与前一个数字之差 - 1 的最大的质数，减去这个质数

 */
var primeSubOperation = function(nums) {
    const primes = calcPrimes(1000);
    primes[-1] = 0; // -1 当做 0
    nums[-1] = 0;
    for (let i = 0; i < nums.length; i++) {
        let d = nums[i] - nums[i - 1] - 1;
        let l = 0
        let r = primes.length;
        while (l < r) {
            const mid = Math.floor((r + l) / 2)
            if (primes[mid] <= d) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        if ( nums[i] - primes[l - 1] <= nums[i - 1]) {
            return false;
        }
        nums[i] -= primes[l - 1];
    }
    return true;
};

function calcPrimes(n) {
    const primes = [];
    for (let i = 2; i <= n; i++) {
        let ok = true;
        for (let j = 2; j <= Math.floor(Math.sqrt(i)); j++) {
            if (i % j === 0) {
                ok = false;
                break;
            }
        }
        if (ok) {
            primes.push(i);
        }
    }
    return primes;
}


console.log(primeSubOperation([15,20,17,7,16]))
console.log(primeSubOperation(nums1))
console.log(primeSubOperation(nums2))
console.log(primeSubOperation(nums3))
console.log(primeSubOperation([2,2]))
// 求质数
function isPrime(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        if (n % i === 0) {
            sum++;
        }
    }
    return sum === 2
}
// 递增
function isSorted(nums) {
    return nums.every((x, i) => i === 0 || x > nums[i - 1])
}

function getPrimeList(n) {
    const res = []
    for(let i = 0;i<n;i++){
        if(isPrime(i)){
            res.push(i)
        }
    }
    return res
}

function getLimit(n, list) {
    const res = []
    for(let i = 0; i < list.length; i++) {
        if(list[i] < n) {
            res.push(list[i])
        }
    }
    return res
}

getPrimeList(1000)


;(function() {
    /**
     输入：nums = [3,1,6,8], queries = [1,5]
     输出：[14,10]
     解释：第一个查询，我们可以执行以下操作：
     - 将 nums[0] 减小 2 次，nums = [1,1,6,8] 。
     - 将 nums[2] 减小 5 次，nums = [1,1,1,8] 。
     - 将 nums[3] 减小 7 次，nums = [1,1,1,1] 。
     第一个查询的总操作次数为 2 + 5 + 7 = 14 。
     第二个查询，我们可以执行以下操作：
     - 将 nums[0] 增大 2 次，nums = [5,1,6,8] 。
     - 将 nums[1] 增大 4 次，nums = [5,5,6,8] 。
     - 将 nums[2] 减小 1 次，nums = [5,5,5,8] 。
     - 将 nums[3] 减小 3 次，nums = [5,5,5,5] 。
     第二个查询的总操作次数为 2 + 4 + 1 + 3 = 10 。
     */
    let minOperations = function(nums, queries) {
        nums.sort((a, b) => a - b);
        const len = nums.length;
        const preSum = new Array(len + 1).fill(0);
        for (let i = 1; i <= len; i++) {
            preSum[i] = preSum[i - 1] + nums[i - 1];
        }
        // console.log(pre)
        const res = []
        for (let i = 0; i < queries.length; i++) {
            const q = queries[i]
            let l = 0
            let r = len - 1
            let mid
            while(l <= r) {
                mid = Math.ceil(l + (r-l)/2)
                if(nums[mid]<=q){
                    l=mid+1;
                }else{
                    r=mid-1;
                }
            }
            let leftSum = q * l - (preSum[l]- preSum[0])
            let rightSum = preSum[len]-preSum[l] - q * (len - l)
            res.push(leftSum + rightSum)
        }
        // console.log(res)
        return res
    };
    const a1 = [39,21,5,58,11,73,93,87,4,63,66,64,77,60,24,2,6,82,97,94,100,92,67,52,82,97,9,99,29,31,100,67,56,28,8,81,41,18,63,43,22,60,96,91,33,22,92,16,89]
    const a2= [82,99,21,5,91,97,85,67,33,87,92,67,33,22,64,81,44,63,43,31,56,74,62,4,57,20,9,32,30,63,39,92,6,16,92,89,60,73,38,81,56,2,39,22,63,67,1,97,66,9,37,2,32,88,2,21,2,78,87,33,9,92,96,88,92,16,41,60,32,82,67,28,99,67,19,4,45,59,100,91]
    minOperations([3,1,6,8], [1,5])
    // minOperations([2,9,6,3], [10])
    minOperations(a1, a2)
})()
// 我的返回 错误
// [1630,2162,1962,2550,1858,2074,1702,1420,1686,1750,1888,1420,1686,1932,1400,1612,1528,1396,
// 1538,1722,1416,1506,1396,2596,1410,1994,2382,1704,1742,1396,1590,1888,2506,2126,1888,
// 1802,1396,1492,1606,1612,1416,2692,1590,1932,1396,1420,2742,2074,1412,2382,1622,2692,1704,1776,
// 2692,1962,2692,1564,1750,1686,2382,1888,2034,1776,1888,2126,1562,1396,1704,1630,1420,1784,2162,
// 1420,2026,2596,1518,1400,2208,1858]

// 答案
// [1630,2145,1901,2473,1849,2059,1699,1405,1637,1745,1878,1405,1637,1872,1382,1611,1490,1377,1499,
// 1671,1390,1498,1376,2518,1385,1932,2309,1654,1690,1377,1547,1878,2430,2060,1878,1795,1374,1483,1562,
// 1611,1390,2612,1547,1872,1377,1405,2661,2059,1396,2309,1577,2612,1654,1770,2612,1901,2612,1560,1745,1637,
// 2309,1878,2020,1770,1878,2060,1521,1374,1654,1630,1405,1730,2145,1405,1963,2518,1481,1377,2190,1849]
