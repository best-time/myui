/*
给定一个只包含数字的字符串，复原它并返回所有可能的 IP 地址格式。

有效的 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效的 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效的 IP 地址。

示例 1：

输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
示例 2：

输入：s = "0000"
输出：["0.0.0.0"]
示例 3：

输入：s = "1111"
输出：["1.1.1.1"]
示例 4：

输入：s = "010010"
输出：["0.10.0.10","0.100.1.0"]
示例 5：

输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]
提示：

0 <= s.length <= 3000
s 仅由数字组成
#
 */

// 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），
// 整数之间用 '.'

function get(s) {
    const res = []
    const path  = []
    const len = s.length
    function tracking(startIndex) {
        if(path.length > 4) return
        if(path.length === 4 && startIndex === len) {
            res.push(path.join('.'))
            return
        }
        for(let i = startIndex; i < len; i++) {
            const str = s.slice(startIndex, i + 1)
            if(str.length > 3 || +str > 255) break
            if(str.length > 1 || str[0] === '0') break
            path.push(str)
            tracking(i + 1)
            path.pop()
        }
    }
    tracking(0)
    return res
}

console.log(get('101023'))
