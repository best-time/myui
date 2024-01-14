/**
 * @param {number} low
 * @param {number} high
 * @return {number}
 */
var countSymmetricIntegers = function(low, high) {
    const ans = []
    function sum(list) {
        return list.reduce((a, b) => +a + +b, 0)
    }
    for(let i = low; i <= high; i++) {
        const numStr = `${i}`
        const len = numStr.length
        if(len % 2 === 0) {
            const prevArr = numStr.slice(0, len / 2).split('')
            const curArr = numStr.slice(len / 2).split('')
            if(sum(prevArr) === sum(curArr)) {
                ans.push(i)
            }
        }
    }
    console.log(ans)
    return ans.length
};

// countSymmetricIntegers(1, 100)
// countSymmetricIntegers(1200, 1230)



/**
 * @param {string} num
 * @return {number}
 */
var minimumOperations = function(num) {const N = num.length
    const rev = [...num].reverse().join('')
    const l0 = last0()
    const l5 = last5()
    const ans = Math.min(l0, l5)
    return ans === N ? N - count0(num) : ans

    function count0() {
        let ans = 0
        for (let c of num) if (c === '0') ans++
        return ans
    }
    function last5() {
        const i5 = rev.indexOf('5')
        if (i5 === -1) return N

        let in2 = rev.indexOf('2', i5 + 1)
        let in7 = rev.indexOf('7', i5 + 1)
        in2 = in2 === -1 ? N : in2
        in7 = in7 === -1 ? N : in7
        const inm = Math.min(in2, in7)
        if (inm === N) return N

        return inm - 1
    }
    function last0() {
        const i0 = rev.indexOf('0')
        if (i0 === -1) return N

        let in0 = rev.indexOf('0', i0 + 1)
        let in5 = rev.indexOf('5', i0 + 1)
        in0 = in0 === -1 ? N : in0
        in5 = in5 === -1 ? N : in5
        const inm = Math.min(in0, in5)
        if (inm === N) return N

        // console.log(i0, in0, in5)
        return inm - 1
    }
};
// 25 50 75 100 125 150 175 200
// 1025 1050 1075 1100 1125
// 10025 10050

console.log(minimumOperations("2245047"))
// console.log(minimumOperations("2908305"))
// console.log(minimumOperations("10"))
// console.log(minimumOperations("101"))
// console.log(minimumOperations("20"))
// console.log(minimumOperations("15"))

// {
//     5: [7, 2],   25 75
//     0: [0, 5]    00 50
// }


/**
 * @param {number[]} nums
 * @param {number} modulo
 * @param {number} k
 * @return {number}
 */
var countInterestingSubarrays = function(nums, modulo, k) {
    const counts = new Map()
    counts.set(0, 1)
    let count = 0
    let ans = 0
    for (let num of nums) {
        if (num % modulo === k) {
            count++
        }
        if (count - k >= 0) {
            ans += get((count - k) % modulo)
        }
        // if (num % modulo === k) {
        inc(count % modulo)
        // }
    }
    return ans

    function inc(k) {
        const v = counts.get(k) || 0
        counts.set(k, v + 1)
    }
    function get(k) {
        return counts.has(k) ? counts.get(k) : 0
    }
};

// countInterestingSubarrays([3,2,4], 2, 1)
// countInterestingSubarrays([3,1,9,6], 3, 0) // [0, 3] [1,1]
//                              [0, 2, 3]
/*
如果 子数组 nums[l..r] 满足下述条件，
则称其为 趣味子数组 ：
在范围 [l, r] 内，设 cnt 为满足 nums[i] % modulo == k 的索引 i 的数量。并且 cnt % modulo == k 。
 */
