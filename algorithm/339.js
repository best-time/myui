
/*
示例 1：

输入：s = "01000111"
输出：6
解释：最长的平衡子字符串是 "000111" ，长度为 6 。
示例 2：

输入：s = "00111"
输出：4
解释：最长的平衡子字符串是 "0011" ，长度为  4 。
示例 3：

输入：s = "111"
输出：0
解释：除了空子字符串之外不存在其他平衡子字符串，所以答案为 0 。
 */
 const s = "01000111" // 6   000111
const s1 = "00111" // 4   0011
// 001  2
// 010 2
// 01 2
// 10 0
var findTheLongestBalancedSubstring = function(s) {
    if(s.length <= 1) return 0
    let count0 = 0
    let count1 = 0
    let ans = 0
    for(let i = 0; i < s.length; i++) {
        const cur = s[i]
        if(cur === '0') {
            if(count1 > 0) {
                count1 = 0
                count0 = 1
            } else {
                count0++
            }
        } else if (cur === '1') {
            count1++
            ans = Math.max(ans, Math.min(count1, count0));
        }
    }

    return  ans * 2
};
//
// console.log(findTheLongestBalancedSubstring(s)) // 6
// console.log(findTheLongestBalancedSubstring(s1)) // 4
// console.log(findTheLongestBalancedSubstring('111')) // 0
// console.log(findTheLongestBalancedSubstring('001')) // 2
console.log(findTheLongestBalancedSubstring('010')) // 2


/*
输入：nums = [1,3,4,1,2,3,1]
输出：[[1,3,4,2],[1,3],[1]]
解释：根据题目要求可以创建包含以下几行元素的二维数组：
- 1,3,4,2
- 1,3
- 1
nums 中的所有元素都有用到，并且每一行都由不同的整数组成，所以这是一个符合题目要求的答案。
可以证明无法创建少于三行且符合题目要求的二维数组。
示例 2：

输入：nums = [1,2,3,4]
输出：[[4,3,2,1]]
解释：nums 中的所有元素都不同，所以我们可以将其全部保存在二维数组中的第一行。
 */

var findMatrix = function(nums) {
    let res = []
    while(nums.length) {

    }
    return res
};

// console.log(findMatrix([1,3,4,1,2,3,1])) // 111 2 33 4
