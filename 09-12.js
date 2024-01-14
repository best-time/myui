/*
给定一个字符串，你的任务是计算这个字符串中有多少个回文子串。

具有不同开始位置或结束位置的子串，即使是由相同的字符组成，也会被视作不同的子串。

示例 1：

输入："abc"
输出：3
解释：三个回文子串: "a", "b", "c"
示例 2：

输入："aaa"
输出：6
解释：6个回文子串: "a", "a", "a", "aa", "aa", "aaa"
提示：输入的字符串长度不会超过 1000 。

 */

/*
[
    [false, false, false],
    [false, false, false],
    [false, false, false],
]

[
    [true, true, true],
    [false, true, true],
    [false, false, true],
]
 */
const countSubstrings = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;
    let dp = Array.from(Array(strLen), () => Array(strLen).fill(false));

    // for(let j = 0; j < strLen; j++) {
    //     for(let i = 0; i <= j; i++) {
    //         if(s[i] === s[j]) {
    //             if((j - i) < 2) {
    //                 dp[i][j] = true;
    //             } else {
    //                 dp[i][j] = dp[i+1][j-1];
    //             }
    //             numOfPalindromicStr += dp[i][j] ? 1 : 0;
    //         }
    //     }
    // }

    for(let i = strLen - 1; i >= 0; i--) {
        for(let j = i; j < strLen; j++) {
            if(s[i] === s[j]) {
                if(j - i < 2) {
                    numOfPalindromicStr++
                    dp[i][j] = true
                } else if (dp[i+1][j-1]) {
                    numOfPalindromicStr++
                    dp[i][j] = true
                }
            }
        }
    }

    return numOfPalindromicStr;
}


// console.log(countSubstrings('aaa'))

const countSubstrings2 = (s) => {
    const strLen = s.length;
    let numOfPalindromicStr = 0;

    for(let i = 0; i < 2 * strLen - 1; i++) {
        let left = Math.floor(i/2);
        let right = left + i % 2;
        console.log(left, right)

        while(left >= 0 && right < strLen && s[left] === s[right]){
            numOfPalindromicStr++;
            left--;
            right++;
        }
    }

    return numOfPalindromicStr;
}

console.log(countSubstrings2('aaa'))
