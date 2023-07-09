;(function() {
    // 在字符串中选出一个下标 i ，并使 c 为字符串下标 i 处的字符。
    // 并在 i 左侧（如果有）和 右侧（如果有）各 删除 一个距离 i 最近 的字符 c 。
    function get(s) {
        if(s.length -1 === 0) return 1
        if(s.length - 2 === 0) return s[0] === s[1] ? 1 : 2
        let arr = []
        for(let i = 1; i < s.length;) {
            const [left, cur, right] = [s[i-1], s[i], s[i + 1]]
            if(left === cur && cur === right) {
                arr.push(cur)
                i = i + 2
            } else if (left === cur && cur !== right) {
                arr = arr.concat([ cur, right])
                i = i + 2

            } else if (cur === right && cur !== left) {
                arr = arr.concat([ left, cur])
                i = i + 2

            } else {
                arr = arr.concat([left, cur, right])
                i = i + 2
            }
        }

        return arr.length
    }

    // console.log(get2('aaabc')) // 3 abc
    // console.log(get2('abcd')) // 3 abc
    // console.log(get2('cbbd')) // 3  cbd
    // console.log(get2('dddaaa')) // 2 da
    // console.log(get2('ipi')) // 2 da
        function get2(s) {
            const list = s.split('')
            let count = 1
            for(let i = 1; i < list.length; i++) {
                if(list[i] !== list[i - 1]) {
                    count ++
                }
            }
            return count
        }

        function get3(arr) {
            const n = arr.length
            let oneIndex = arr.findIndex(i => i - 1 === 0)
            let count = 0
            while(oneIndex > 0) {
                [arr[oneIndex - 1], arr[oneIndex]] = [arr[oneIndex], arr[oneIndex -1]]
                oneIndex--
                count ++
            }
            let nIndex = arr.findIndex(i => i - n === 0)
            while(nIndex < n-1) {
                [arr[nIndex], arr[nIndex + 1]] = [arr[nIndex + 1], arr[nIndex]]
                nIndex++
                count ++
            }
            // console.log(arr)
            return count
            // return oneIndex + n - nIndex - 1
        }

    // console.log(get3([2, 1, 4, 3])) // 2
    // console.log(get3([2, 4, 1, 3])) // 3
    // console.log(get3([1,3,4,2,5]))  // 0

})()

;(function() {
    const a = [
        [0,0,1],
        [1,2,2],
        [0,2,3],
        [1,0,4]
    ]
    const b = [
        [0 , 0, 0],
        [0 , 0, 0],
        [0 , 0, 0]
    ]

    function get(n, queries) {
        function getList(len) {
            return Array.from({length: len})
        }
        const arr = Array.from({length: n}, () => {
            return getList(n).fill(0)
        })
        const arrLen = arr[0].length
        let count = 0
        for(let i = 0; i < queries.length; i++) {
            const [type, index, val] = queries[i]
            if(type - 1 === 0) {
                for(let j = 0; j < arrLen; j++) {
                    count += val - arr[j][index]
                    arr[j][index] = val
                }
            } else if(type - 0=== 0) {
                const len = arr[index].length
                let cc = 0
                for(let t = 0; t < len; t++) {
                    cc += arr[index][t]
                }
                arr[index] = getList(len).fill(val)
                count += len * val - cc
            }
        }
        console.log(arr)
        return count
    }

    // const n = 3, queries = [[0,0,1],[1,2,2],[0,2,3],[1,0,4]]
    const n = 3, queries = [[0,0,4],[0,1,2],[1,0,1],[0,2,3],[1,2,1]]

    console.log(get(n, queries))
})()
