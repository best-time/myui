/*
给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

返回 s 所有可能的分割方案。

示例: 输入: "aab" 输出: [ ["aa","b"], ["a","a","b"] ]

#
 */
function isPalindrome(str, start, end) {
    for (let i = start, j = end; i < j; i++, j--) {
        if (str[i] !== str[j]) {
            return false;
        }
    }
    return true;
}
function get(s) {
    const res = []
    const path = []
    const len = s.length
    function tracking(startIndex) {
        if(startIndex >= len) {
            res.push(Array.from(path));
            return;
        }
        for(let i = startIndex; i < len; i++) {
            if(!isPalindrome(s, startIndex, i)) {
                continue
            }
            path.push(s.slice(startIndex, i + 1))
            tracking(i + 1)
            path.pop()
        }
    }
    tracking(0)
    return res
}

console.log(get('aab'))
