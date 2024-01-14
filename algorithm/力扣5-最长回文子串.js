/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
    const res = []
    for(let i = 0; i < s.length; i++) {
        let j = i + 1
        while(j < s.length) {
            if(s[i] === s[j]) {
                res.push(s.slice(i, j+1))
            }
            j++
        }
    }
    function isA(s) {
        let left = 0
        let right = s.length - 1
        while(left <= right) {
            if(s[left] !== s[right]) {
                return false
            }
            left++
            right--
        }
        return true
    }
    let r = res.filter(s => isA(s))
    let index = 0
    let max = 0
    for(let i = 0; i < r.length; i++) {
        if(r[i].length > max) {
            index = i
            max = r[i].length
        }
    }
    console.log(r, s, s[1])
    return r.length ? r[index] : s[0]
};

console.log(longestPalindrome('babad'))
console.log(longestPalindrome('cbbd'))
console.log(longestPalindrome('a'))

