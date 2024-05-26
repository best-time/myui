/*
[1,2,3,4] 长度2的所有子集
 */
const arr1 = [1,2,3,4]
function get(arr, k) {
    const res= []
    const result = []
    function dfs(startIndex) {
        if(res.length === k) {
            result.push([...res])
            return
        }
        for(let i = startIndex; i < arr.length; i++) {
            res.push(arr[i])
            dfs(i + 1)
            res.pop()
        }
    }
    dfs(0)
    return result
}

console.log(get(arr1, 2))
