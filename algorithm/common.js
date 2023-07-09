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
