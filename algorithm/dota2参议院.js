/*


* */


const s1 = 'RDRDDDRD'

function get(s) {
    let len = s.length
    const rList = []
    const dList = []
    for(let i = 0 ; i < len; i++) {
        if(s[i] === 'R') {
            rList.push(i)
        } else if (s[i] === 'D') {
            dList.push(i)
        }
    }
    while(!rList.length && !dList.length) {
        const rShiftIndex = rList.unshift()
        const dShiftIndex = dList.unshift()
        if(rShiftIndex < dShiftIndex) {
            rList.push(rShiftIndex + len) // 进入第二轮, 不能干扰本轮
        } else {
            dList.push(dShiftIndex + len)
        }
    }
    return !dList.length ? 'R' : 'D'
}

console.log(get('RDD'))
