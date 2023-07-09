
function get(n, k) { // 4 3
    let map = new Map()
    let s = new Map()
    map.set(1, 1)
    let start = 2
    while(start <= n) {
        s.set(start, 1)
        start++
    }
    let t = 1
    for(let i = 1; i <= n ; ) {
        i += t * k
        while( i > n ) {
            i -= n
        }
        map.set(i, +(map.get(i) || 0) + 1)
        s.delete(i)
        if(map.get(i) > 1) break
        t++
    }
    let arr = []
    for(let[key, value] of s) {
        arr.push(key)
    }
    console.log(map)
    console.log(arr)
    return arr
}

// get(5, 2)
// get(4, 4)
// get(4, 3)
get(6, 1)



;(function() {
    function get(derived) {
        let flag = true
        for(let i = 0; i <derived.length; i++) {
            if([0 ^ 1, 1 ^ 0].includes(derived[i])) {

            }
            if(i + 1 === derived.length) {
                derived[i] = derived[i] + derived[0]
            }
        }
        return flag
    }
})()
