/*
请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1： 输入：s = "We are happy."
输出："We%20are%20happy."

 */

function replaceSpace(s) {
    const arr = s.split('')
    let count = 0
    for(let i = 0;i < arr.length;i++) {
        if(arr[i] === ' ') {
            count++
        }
    }
    const allLen = arr.length + count * 2
    let left = arr.length - 1
    let right = allLen - 1
    // 倒序  扩展数组长度  从右往左添加

    while(left >= 0) {
        if(arr[left] === ' ') {
            arr[right--] = '0'
            arr[right--] = '2'
            arr[right--] = '%'
            left--
        } else {
            arr[right--] = arr[left--]
        }
    }
    return arr.join('')
}

console.log(replaceSpace('We are happy.'))
