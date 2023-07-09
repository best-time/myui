/*
给定一个整数数组 A，我们只能用以下方法修改该数组：我们选择某个索引 i 并将 A[i] 替换为 -A[i]，然后总共重复这个过程 K 次。
（我们可以多次选择同一个索引 i。）

以这种方式修改数组后，返回数组可能的最大和。

示例 1：

输入：A = [4,2,3], K = 1
输出：5
解释：选择索引 (1,) ，然后 A 变为 [4,-2,3]。
示例 2：

输入：A = [3,-1,0,2], K = 3
输出：6
解释：选择索引 (1, 2, 2) ，然后 A 变为 [3,1,0,2]。
示例 3：

输入：A = [2,-3,-1,5,-4], K = 2
输出：13
解释：选择索引 (1, 4) ，然后 A 变为 [2,3,-1,5,4]。
 */

// 最大负值
// 如果 K大于0 , 转换最小的绝对值

function get(list, k) {
    list.sort((a, b) => Math.abs(b) - Math.abs(a)) // 绝对值 大 -> 小

    for(let i = 0; i < list.length; i++) {
        const cur = list[i]
        if(cur < 0 && k > 0) {
            list[i] = -cur
            k--
        }
    }
    // 若k还大于0,则寻找最小的数进行不断取反
    while( k > 0 ){
        list[list.length-1] = -list[list.length-1]
        k--;
    }
    return list.reduce((prev, cur) => prev + cur, 0)
}

console.log(get([2,-3,-1,5,-4], 2))
