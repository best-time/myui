/*
示例 1：
输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]

示例 2：
输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

 */
function reverse(arr) {
    let left = 0
    let right = arr.length - 1
    while(left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]]
        left++
        right--
    }
    return arr
}

console.log(reverse(["h","e","l","l","o"]))
