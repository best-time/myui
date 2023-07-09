// 二叉树
// 递归
// 回溯 两种解法

/*
给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。答案可以按 任意顺序 返回。

给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。
示例 1：

输入：digits = "23"
输出：["ad","ae","af","bd","be","bf","cd","ce","cf"] // [abc] [def]
示例 2：

输入：digits = ""
输出：[]
示例 3：

输入：digits = "2"
输出：["a","b","c"]

* */


var letterCombinations = function(digits) { // [abc] [def]
    if(!digits.length) return []
    const numMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz',
    }
    const queue = ['']
    for(let i = 0 ; i< digits.length; i++) {
        const levelSize = queue.length;
        for (let j = 0; j < levelSize; j++) {   // 逐个让当前层的节点出列
            const curStr = queue.shift();         // 出列

            const letters = numMap[digits[i]];

            for (const l of letters) {
                queue.push(curStr + l); // 生成新的字母串入列
            }
        }
    }
    return queue
};

letterCombinations('23')

const letterCombinations2 = (digits) => {
    if (digits.length === 0) return [];
    const res = [];
    const map = { '2': 'abc', '3': 'def', '4': 'ghi', '5': 'jkl', '6': 'mno', '7': 'pqrs', '8': 'tuv', '9': 'wxyz' };
    // dfs: 当前构建的字符串为curStr，现在“翻译”到第i个数字，基于此继续“翻译”
    const dfs = (curStr, i) => {   // curStr是当前字符串，i是扫描的指针
        if (i > digits.length - 1) { // 指针越界，递归的出口
            res.push(curStr);          // 将解推入res
            return;                    // 结束当前递归分支
        }
        const letters = map[digits[i]]; // 当前数字对应的字母
        for (const letter of letters) { // 一个字母是一个选择，对应一个递归分支
            dfs(curStr + letter, i + 1);  // 选择翻译成letter，生成新字符串，i指针右移继续翻译（递归）
        }
    };
    dfs('', 0); // 递归的入口，初始字符串为''，从下标0开始翻译
    return res;
};

letterCombinations2('23')
