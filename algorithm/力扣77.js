
function get(n, k) {
    let result = []
    let path = []
    function backtracking(startIndex) {
        if(path.length === k) {
            result.push([...path])
            return
        }
        for(let i = startIndex; i <=n; i++) {
            path.push(i)
            backtracking(i + 1)
            path.pop()
        }
    }
    backtracking(1)
    return result
}

console.log(get(4, 2))
