
const str1 = 'abcabcaabcabcd'
const str2 = 'abcabcd'

// 暴力算法
function get(str2, str1) {
    const len1 = str1.length
    const len2 = str2.length
    for (let i = 0 ; i <= len1-len2; i++) {
        let j
        for(j = 0; j < len2; j++) {
            if(str2[j] !== str1[i+j]) {
                break
            }
        }
        if(j === len2) return i
    }
    return -1
}

console.log(get(str2, str1))

