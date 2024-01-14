/**
 * @param {string} moves
 * @return {number}
 */
var furthestDistanceFromOrigin = function(moves) {
    if([...new Set(moves)].length - 1 === 0) return moves.length
    let LArr = [0, 0]
    let RArr = [0, 0]
    const len = moves.length
    for(let i = 0; i < len; i++) {
        if(moves[i] === '_') {
            LArr[0] += 1
            RArr[1] += 1
        } else if(moves[i] === 'L') {
            LArr[0] += 1
            RArr[0] += 1
        } else if(moves[i] === 'R') {
            LArr[1] += 1
            RArr[1] += 1
        }
    }
    return Math.max(Math.abs(LArr[0] - LArr[1]), Math.abs(RArr[0] - RArr[1]))
};

console.log(furthestDistanceFromOrigin('L_RL__R'))
console.log(furthestDistanceFromOrigin('_R__LL_'))
console.log(furthestDistanceFromOrigin('_______'))
console.log(furthestDistanceFromOrigin('LR'))











/**
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minimumPossibleSum = function(n, target) {
    const map = {}
    let sum = 0
    let count = 0
    for(let i = 1; i < Infinity; i++) {
        if(!map[i]) {
            sum += i
            count++
            if(target - i > 0) {
                map[target - i] = true
            }
        }
        if(count - n === 0) {
            break
        }
    }
    return sum
};

// console.log(minimumPossibleSum(2, 3))
// console.log(minimumPossibleSum(3, 3))
// console.log(minimumPossibleSum(1, 1))


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minOperations = function(nums, target) {
    if(nums.reduce((p, n) => p + n, 0) < target) return -1

};
