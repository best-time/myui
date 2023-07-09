
// 有序数组 原地删除, 每个元素只出现一次, 返回删除后数组的长度
const arr = [0,1,2,2,3,3,4]

// 双指针   i慢指针  j快指针
function get(arr) {
    let len = arr.length
    if(!len) return 0
    let i = 0
    for (let j = 1; j < len; j++) {
        if(arr[i] !== arr[j]) {
            i++
            arr[i] = arr[j]
        }
    }
    return i + 1
}

get(arr)
