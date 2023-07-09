const convert = function(s, numRows) {
    if (numRows - 1 === 0) return s
    let strObj = Array(numRows).fill('') // 创建numRows个空数组
    let point = 0
    let direction = true // 正向
    for ( let i = 0; i < s.length ; i++) {
        strObj[point] = strObj[point] + s[i]
        // 更新指针
        if( direction && point < numRows - 1 ) { // 向右
            point++
        } else if ( !direction && point > 0 ) { // 向左
            point--
        } else {
            direction = !direction
            point === 0 ? point++ : point--
        }
    }
    return strObj.join('')
};

convert('PAYPALISHIRING', 3)
