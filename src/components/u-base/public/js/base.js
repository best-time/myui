// 数组拆分成特定长度
function chunk(list = [], len) {
  return list.reduce((prev, now, idx) => {
    if (idx % len === 0) {
      return [...prev, [now]];
    } else {
      let p = prev.slice(0, -1);
      let c = prev.slice(-1)[0];
      return [...p, [...c, now]];
    }
  }, []);
}

let chunk1 = chunk(["a", "b", "c", "d", 'mon'], 2);
// => [['a', 'b'], ['c', 'd']]

let chunk2 = chunk(["a", "b", "c", "d"], 3);
// => [['a', 'b', 'c'], ['d']]

console.log(chunk1)
console.log(chunk2)

// 数组剔除 'false' 值
function compact (list = []) {
  return list.filter(Boolean)
}



// 数组差值
function diff(...rest) {
  return rest.reduce((a, b) => {
    return a.filter(c => !b.includes(c))
  })
}

console.log(diff([1, 2, 3, 4, 5], [5, 2, 10]))
// [1, 3, 4]

// [startIndex, endIndex)
('a', 'b', 'c').fill(7, 1, 2)
// ['a', 7, 'c']



