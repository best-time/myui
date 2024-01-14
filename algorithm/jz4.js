function Find( target ,  array ) {
    // write code here
    let arr = []
    for(let i = 0; i < array.length; i++) {
        arr = arr.concat(array[i])
    }
    for(let i = 0; i < arr.length; i++) {
        if( i === target) {
            return true
        }
    }
    return false
}

console.log(Find(5,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]]))


