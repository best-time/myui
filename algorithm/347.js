
;(function() {

    function get(s) {
        return s.replace(/0+$/ig, '')
    }

    // console.log(get('51230100'))
    // console.log(get('123'))
})()

;(function() {
    // grid
    // answer
    /*
        1 2 3           1 1 0
        3 1 5           1 0 1
        3 2 1           0 1 1
   右下角 i + 1, j + 1
   左上角 i - 1, j -1
     */
    function get(grid) {
        const row= grid.length
        const col = grid[0].length
        const ar = []
        for(let i = 0; i < row; i++) {
            ar[i] = []
            for(let j = 0; j < col; j++) {
                ar[i][j] = []
                const topLeft = new Set()
                const rightBottom = new Set()
                let step = 1
                while(i - step >= 0 && j - step >= 0) {
                    topLeft.add(grid[i - step][j - step])
                    step++
                }
                step =  1
                while( i + step < row && j + step < col) {
                    rightBottom.add(grid[i+ step][j+ step])
                    step++
                }
                // console.log(topLeft.size, rightBottom.size)
                ar[i][j] = Math.abs(topLeft.size - rightBottom.size)
            }
        }
        return ar
    }

    const grid = [[1,2,3],[3,1,5],[3,2,1]]

    // console.log(get(grid))
    // console.log(get([[1]]))
    // console.log(get([[1,2,3],[3,1,5],[3,2,1]]))
    // console.log(get([
    //     [6,28,37,34,12,30,43,35,6],
    //     [21,47,38,14,31,49,11,14,49],
    //     [6,12,35,17,17,2,45,27,43],
    //     [34,41,30,28,45,24,50,20,4]]))
    /*
    1 2 3
    3 1 5
    3 2 1
    输出[[1,2,1],[1,0,0],[0,1,1]]
预期：
   [[1,1,0],[1,0,1],[0,1,1]]
     */
/*
1 2 4
5 6 7
8 9 10
 */
    // let arr =  [[1,2,4],[5,6,7],[8,9,10]];
    // let i =3,j=3;
    // let result1=0,result2=0;
    // for(let m=0;m<i;m++){
    //     for(let n=0;n<j;n++){
    //         if(m==n){
    //             result1+=arr[m][n];
    //         }
    //         if(m+n==i-1){
    //             result2+=arr[m][n];
    //         }
    //     }
    // }
    // console.log([result1,result2])
})()

;(function() {
    /*
    给你一个下标从 0 开始、长度为 n 的二进制字符串 s ，你可以对其执行两种操作：

    选中一个下标 i 并且反转从下标 0 到下标 i（包括下标 0 和下标 i ）的所有字符，成本为 i + 1 。
    选中一个下标 i 并且反转从下标 i 到下标 n - 1（包括下标 i 和下标 n - 1 ）的所有字符，成本为 n - i 。
    返回使字符串内所有字符 相等 需要的 最小成本 。

    反转 字符意味着：如果原来的值是 '0' ，则反转后值变为 '1' ，反之亦然。
     */
    var minimumCost = function(s) {
        const len = s.length
        const mid = len >>1
        const ms = s[mid]
        let leftFlag = true
        let count = 0
        let left = mid - 1
        while(left >= 0) {
            let a = leftFlag ? s[left] : `${1 - s[left]}`
            if(a !== ms) {
                count += left + 1
                leftFlag = !leftFlag
            }
            left--
        }
        let right = mid + 1
        let rightFlag = true
        while(right < len) {
            let a = rightFlag ? s[right] : `${1 - s[right]}`
            if(a !== ms) {
                count += len - right
                rightFlag = !rightFlag
            }
            right++
        }
        // console.log(count)
        return count
    };

    // minimumCost('010101')
    minimumCost('0011')
})()
