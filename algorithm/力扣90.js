
/*
    返回所有子集
    不能重复
 */
function  get(list) {
    const res = []
    const path = []
    list.sort((a, b) => a - b)
    track(0)
    function track(j) {
        res.push([...path])
        if(j > list.length - 1) {
            return
        }
        for(let i = j ; i < list.length; i++) {
            const cur = list[i]
            if(i > j && list[i] === list[i - 1]) {
                continue
            }
            path.push(cur)
            track(i + 1)
            path.pop()
        }
    }
    return res
}

console.log(get([1,2,2])) // [ [2], [1], [1,2,2], [2,2], [1,2], [] ]

