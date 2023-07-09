;(function() {

    function get(nums) {
        if(nums.length <= 2) return -1
        return nums.sort((a,b) => a - b)[1]
    }

    // console.log(get([3,2,1,4]))
    // console.log(get([1, 2]))
    // console.log(get([2,1,3]))
})();


;(function() {
    // 小写英文字母组成
    // 选则 s 的任一非空子字符串，可能是整个字符串
    // 'b' 用 'a' 替换，'a' 用 'z' 替换
    // 子字符串 是字符串中的一个连续字符序列
    function get(s) {
        const wordList = 'abcdefghijklmnopqrstuvwxyz'.split('')
        const wordMap = wordList.reduce((a, b, index) => {
            a[b] = wordList[index - 1 < 0 ? wordList.length - 1 : index -1]
                return a
        }, {})
        if(s.length - 1 === 0) return wordMap[s]

        let arr = []
        let stringArr = s.split('')
        let sDemo = []
        for(let i = 0, len = s.length; i < len; i++) {
            if(s[i] === 'a') {
                arr.push(i)
            }
            sDemo.push(wordMap[s[i]])
        }
        let sArr = []
        if(arr.length) { // 有a
            const [left, right] = [arr[0], arr[arr.length - 1]]

            if(arr.length === stringArr.length) { // 都是a
                return [...stringArr.slice(0, right), ...sDemo.slice(right)].join('')
            }

            if(left - right === 0) { // 1个a
                if(left === 0) { // 1 - length
                    sArr = [stringArr[0], ...sDemo.slice(1)]
                } else { // 0 - left
                    sArr = [...sDemo.slice(0, left), ...stringArr.slice(left)]
                }
            } else { // 多个a
                if( left - 0 === 0) { // right - s.length 到最后
                    sArr = [...stringArr.slice(0, right + 1), ...sDemo.slice(right + 1)]
                } else { // 0 - left
                    sArr = [...sDemo.slice(0), ...stringArr.slice(left)]
                }
            }
        } else {
            sArr = [...sDemo]
        }
        return sArr.join('')
    }

    // console.log(get('leetcode')) // kddsbncd
    // console.log(get('cbabc'))  // baabc
    // console.log(get('acbbc')) // abaab
    // console.log(get('aleataode')) // aleatancd
    // console.log(get('a')) // z
    // console.log(get('aab')) // aaa    aza
    // console.log(get('aa')) // az    aa
    // console.log(get('ba')) // aa    za
    // console.log(get('aaa')) // aaz    aaa
})();

;(function() {
    /**
     * @param {string} s
     * @return {string}
     */
    var smallestString = function(s) {
        const strArr = s.split('')
        const strSet = new Set(strArr)
        if(strSet.size === 1 && strSet.has('a')) {
            strArr[strArr.length - 1] = 'z'
            // strArr.join('')
        }
        for (let i = 0, len = s.length; i < len; i++) {
            if (s[i] === 'a') {
                if (i === 0){
                    continue
                } else {
                    if(s[i - 1] === 'a') continue
                    else {
                        break
                    }

                }
            } else {
                let num = s.charCodeAt(i)
                num -= 1
                strArr[i] = String.fromCharCode(num)
            }
        }
        return strArr.join('')
    };
console.log(smallestString('leetcode')) // kddsbncd
    console.log(smallestString('cbabc'))  // baabc
    console.log(smallestString('acbbc')) // abaab
    console.log(smallestString('aleataode')) // aleatancd
    console.log(smallestString('a')) // z
    console.log(smallestString('aab')) // aaa    aza
    console.log(smallestString('aa')) // az    aa
    console.log(smallestString('ba')) // aa    za
    console.log(smallestString('aaa')) // aaz    aaa
})();


;(function() {
    /*
    成本:  [20, 1, 15]
     类型: [0, 1, 2]
     更改类型

     最开始，巧克力的类型分别是 [0,1,2] 。
     我们可以用成本 1 购买第 1 个类型的巧克力。
    接着，我们用成本 5 执行一次操作，巧克力的类型变更为 [2,0,1] 。
    我们可以用成本 1 购买第 0 个类型的巧克力。
    然后，我们用成本 5 执行一次操作，巧克力的类型变更为 [1,2,0] 。
    我们可以用成本 1 购买第 2 个类型的巧克力。
    因此，收集所有类型的巧克力需要的总成本是 (1 + 5 + 1 + 5 + 1) = 13 。
    可以证明这是一种最优方案。
     */
    var minCost = function (nums, x) {
        let len = nums.length;
        let cacheCost = [...nums];
        let sum = nums.reduce((a, b) => a + b);
        let cacheSum = sum;
        for (let i = 1; i < len; i++) {
            let diff = 0;
            for (let j = 0; j < len; j++) {
                let currentIndex = (j + i) % len;
                if (nums[currentIndex] < cacheCost[j]) {
                    diff += cacheCost[j] - nums[currentIndex];
                    cacheCost[j] = nums[currentIndex];
                }
            }
            cacheSum += x - diff;
            if (sum > cacheSum) {
                sum = cacheSum;
            }
        }
        return sum;
    };
    console.log(minCost([20,1,15], 5))
})()
