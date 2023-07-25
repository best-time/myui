var splitWordsBySeparator = function(words, separator) {
    const len = words.length
    let res = []
    for(let i = 0; i < len; i++) {
        res = res.concat(words[i].split(separator).filter(Boolean))
    }
    return res
};


console.log(splitWordsBySeparator(["|||"], '|'))
console.log(splitWordsBySeparator(["one.two.three","four.five","six"], '.'))

/*
输入：nums = [2,3,7,9,3]
输出：21
解释：我们可以在数组上执行下述操作：
- 选中 i = 0 ，得到数组 nums = [5,7,9,3] 。
- 选中 i = 1 ，得到数组 nums = [5,16,3] 。
- 选中 i = 0 ，得到数组 nums = [21,3] 。
最终数组中的最大元素是 21 。可以证明我们无法获得更大的元素。

2 3 3 7 9
 */
