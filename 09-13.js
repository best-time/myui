// 前缀和   https://fcqian.blog.csdn.net/article/details/132268197

/*
给定一个小写字母组成的字符串 s，请找出字符串中两个不同位置的字符作为分割点，使得字符串分成三个连续子串且子串权重相等，注意子串不包含分割点。

若能找到满足条件的两个分割点，请输出这两个分割点在字符串中的位置下标，若不能找到满足条件的分割点请返回0,0。

子串权重计算方式为:子串所有字符的ASCII码数值之和。

输入描述
输入为一个字符串，字符串由a~z，26个小写字母组成，5 ≤ 字符串长度 ≤ 200。

原文链接：https://blog.csdn.net/qfc_128220/article/details/132268197
 */
// 截取位置 不包含分割点    ASCII码数值之和

function get(s) {
const chars = [...s].map((c) => c.charCodeAt());
const n = chars.length;
const preSum = new Array(n + 1).fill(0);
for (let i = 1; i <= n; i++) {
    preSum[i] = preSum[i - 1] + chars[i - 1];
}

// i,j是分割点
for (let i = 1; i < n; i++) {
    // sum1 是 0 ~ i-1 范围的ASCII码之和
    const sum1 = preSum[i] - preSum[0];
    for (let j = i + 2; j < n; j++) {
        // sum2 是 i + 1 ~ j - 1 范围的ASCII码之和
        const sum2 = preSum[j] - preSum[i + 1];
        // 剪枝
        if (sum1 < sum2) break;
        if (sum1 === sum2) {
            // sum3 是 j + 1 ~ n - 1 范围的ASCII码之和
            const sum3 = preSum[n] - preSum[j + 1];
            if (sum2 === sum3) {
                return `${i},${j}`
            }
        }
    }
}
return '0,0'
}

console.log(get('acdbbbca')) // 2,5   ac，bb，ca
console.log(get('abcabc')) // 0,0
