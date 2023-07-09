/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var rowAndMaximumOnes = function(mat) {
    const len = mat.length
    let count = 0
    let index = 0
    for(let i = 0; i < len; i++) {
        const c =  mat[i].filter(Boolean).length
        if( c > count) {
            count = c
            index = i
        }
    }
    return [index, count]
};

// console.log(rowAndMaximumOnes([[0,1],[1,0]]))
// console.log(rowAndMaximumOnes([[0,0,0],[0,1,1]]))
// console.log(rowAndMaximumOnes([[0,0],[1,1],[0,0]]))

// 如果有多个整数具有最大得分，则返回数值最小的一个
var maxDivScore = function(nums, divisors) {
    const len = nums.length
    const dLen = divisors.length
    let max = 0
    let count = 0
    let min = Infinity
    let countMin = Infinity
    for(let i = 0; i < dLen; i++) {
        let j = 0
        if(divisors[i] < min) {
            min =  divisors[i]
        }
        while(j < len) {
            if(nums[j] % divisors[i] === 0) {
                count++
            }
            j++
        }
        // 整除个数最多 且 当前索引位置的值最小
        if(count > 0) {
            if(count > max) {
                countMin = divisors[i]
                max = count
            } else if (count - max === 0) {
                countMin = Math.min(countMin, divisors[i])
            }
        }
        count = 0
    }
    // console.log(max, min, countMin)
    return max === 0 ? min : countMin
};

// console.log(maxDivScore([4,7,9,3,9], [5, 2, 3])) // 2
// console.log(maxDivScore([20,14,21,10], [5,7,5])) // 5
// console.log(maxDivScore([12], [10,16])) // 10
// console.log(maxDivScore([73,13,20,6], [56,75,83,26,24,53,56,61])) // 24
// console.log(maxDivScore([31,91,47,6,37,62,72,42,85], [95,10,8,43,21,63,26,45,23,69,16,99,92,5,97,69,33,44,8])) // 5
// console.log(maxDivScore([4,7,9,3,9], [5,2,3])) // 3

    // 2
// 预期 3


    // [73,13,20,6]
    // [56,75,83,26,24,53,56,61]
// 56
// 预期 24

// b / a 是整数    b 整除a  或 a能被b整除


    // [31,91,47,6,37,62,72,42,85]
    // [95,10,8,43,21,63,26,45,23,69,16,99,92,5,97,69,33,44,8]
// 8
// 预期 5

function get(a, b, c, d) {
    if( a - b === 0) {
        if(c - d === 0) {
            return c * c >= a * a ? 'YES': "NO"
        } else {
            return Math.min(c, d) >= a ? 'YES' : "NO"
        }
    } else {
        if(c - d === 0) {
            const max1 = Math.max(a, b)
            return c >= max1 && c * c >= a * b ? 'YES' : 'NO'
        } else {
            const mina = Math.min(a, b)
            const minc = Math.min(c, d)
            const maxa = Math.max(a, b)
            const maxc = Math.max(c, d)
            return minc >= mina && maxc >= maxa ? 'YES': 'NO'
        }
    }

    //
    // const max2 =  Math.max(c, d)
    //
    // if(c >= max1 && d >= max1) {
    //     return 'YES'
    // }
}

// console.log(get(10, 10, 9, 9))
console.log(get(3, 6, 7, 5))
// 1 9 2 4

// love
function get2(a) {
    for(let i = 0; i < a.length - 2; i++) {
        const t = `${a[i+1]}${a[i+2]}`
        if(a[i] === 'l') {
             if(['ov', 'oe', 've'].includes(t)) {
                return 'YES'
             }
        } else if (a[i] === 'o') {
            if(t === 've') {
                return 'YES'
            }
        }
    }
    return 'NO'
}

// console.log(get2('like'))
// console.log(get2('abcloe'))

function gcd(a, b) {
    if( b === 0) return a

    return gcd(b, a % b)
}

function get3(a, b) {
    let res = []
    for(let i = 1; i <= Math.max(a, b); i++) {
        res.push(gcd(a + i, b + i))
    }
    return res
}

console.log(get3(2, 3))
