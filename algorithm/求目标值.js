
// arr 无序数组
 function get(arr, target ) {
    const map = new Map()
     for(let i = 0 ; i < arr.length; i++) {
         let dif = target - arr[i]
         if(map.get(dif)) {
             return [map.get(dif), i]
         } else {
             map.set(arr[i], i)
         }
     }
     return []
 }
 const arr = [1,2,7,4,5,6]

 console.log(get(arr, 10))



//-----------------------------arr 有序---------------------------
// arr 升序数组
// 二分查找
const arr1 = [1,2,3,4,5,6]
function get2(arr, target) { // O(n logn)
    for(let i = 0 ; i < arr.length; i++) {
        let low = i;
        let high = arr.length - 1
        while(low <= high) {
            let mid = Math.floor((high - low) / 2 + low)
            let dif = target - arr[i]
            if(arr[mid] === dif) {
                return [i, mid]
            } else if (arr[mid] > dif) {
                high = mid - 1
            } else {
                low = mid + 1
            }
        }
    }
     return[]
}

console.log(get2(arr1, 10))


// 双指针
function get3(arr, target) {
    let x = 0
    let y = arr.length - 1
    while(x < y) {
        let sum = arr[x] + arr[y]
        if(sum === target) {
            return [x, y]
        } else if (sum > target) {
            y--
        } else {
            x++
        }
    }
    return []
}

console.log(get3(arr1, 100))
