
// 给定数组, 左右两侧和相等
const arr = [1,7,3,6,5,6]

function get(arr) {
    let total = 0;
    let sum = arr.reduce((prev, next) => {return prev + next}, 0)
    for(let i = 0 ; i < arr.length; i++) {
        total += arr[i]
        if(total - sum === 0) {
            return i
        }
        sum -= arr[i]
    }
    return -1
}

console.log(get(arr))

function get2(arr) { // [1,7,3,6,5,6]
    let lTotal = 0;
    let rTotal = 0
    let sum = arr.reduce((prev, next) => {return prev + next}, 0)
    let i = 0;
    let j = arr.length - 1
    while(i <= j) {
        if(lTotal < rTotal) {
            lTotal += arr[i]
            i++
        } else {
            rTotal += arr[j]
            j--
        }
        if(lTotal !== rTotal) continue
        if(lTotal + rTotal + arr[i] - sum === 0) {
            return i
        }
    }
    return -1
}
console.log(get2(arr))
