// 删除字符串   AB CD

/*
输入：s = "ABFCACDB"
输出：2
解释：你可以执行下述操作：
- 从 "ABFCACDB" 中删除子串 "AB"，得到 s = "FCACDB" 。
- 从 "FCACDB" 中删除子串 "CD"，得到 s = "FCAB" 。
- 从 "FCAB" 中删除子串 "AB"，得到 s = "FC" 。
最终字符串的长度为 2 。
可以证明 2 是可获得的最小长度。
 */
function get(s) {
    let arr = s.split('')
    for(let i = 0; i < arr.length - 1; i++) {
        const c = arr[i]
        const c1 = arr[i+1]
        if(c === 'A' && c1 === 'B' || c === 'C' && c1 === 'D') {
            arr.splice(i, 2)
            i = i - 2 >=0 ? i - 2 : -1
        }
    }
    return arr.filter(Boolean).length
}

// console.log(get('ABFCACDB'))
// console.log(get('ACBBD'))

function get2(s) {
    let arr = s.split('')
    let i = 0
    let j = arr.length - 1
    while(i < j ) {
        if(arr[i] !== arr[j]) {
            if(arr[i].charCodeAt(0) < arr[j].charCodeAt(0)) {
                arr[j] = arr[i]
            } else {
                arr[i] = arr[j]
            }
        }
        i++
        j--
    }
    return arr.join('')
}

// console.log(get2('egcfe')) // 1 efcfe
// console.log(get2('abcd')) // 2 abba
// console.log(get2('seven')) // 1 neven

function isF(n) {
    const pow = n * n
    let arr = []
    if(`${pow}`.length < 2) {
        if(`${n}` === `${pow}`) {
            arr.push(n)
        }
    } else {
        let sArr = `${pow}`.split('')
        let arr = [sArr]
        for(let i = 0; i< sArr.length; i++) {

        }
    }

    return arr
}
function get3(n) {
    let i = 0;
    let arr = []
    while(++i <= n) {
        arr = arr.concat(isF(i))
    }
    return arr.reduce((prev, n) => prev * prev + n * n)
}

get3(36)

let combine = function(n, k) {
    const res = []
    const path = [];
    backtracking(n, k, 1);
    return res;
    function backtracking (n, k, i){
        const len = path.length;
        if(len === k) {
            res.push(Array.from(path));
            return;
        }
        for(let a = i; a <= n + len - k + 1; a++) {
            path.push(a);
            backtracking(n, k, a + 1);
            path.pop();
        }
    }
};
