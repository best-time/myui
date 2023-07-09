// Native
var arrays = [[1, 2, 3], [101, 2, 1, 10], [2, 1]];
console.log(arrays.reduce(function(a, b) {
    return a.filter(function(value) {
        return b.includes(value);
    });
}));
// output: [1, 2]

// ES6
let arrays = [[1, 2, 3], [101, 2, 1, 10], [2, 1]];
console.log(arrays.reduce((a, b) => a.filter(c => b.includes(c))));
// output: [1, 2]
