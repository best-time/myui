## Array.from

```javascript
// 用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）

let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
Array.from(arrayLike); // ['a', 'b', 'c']


// 字符串和Set结构都具有Iterator接口，因此可以被Array.from转为真正的数组
Array.from('hello') // ['h', 'e', 'l', 'l', 'o']

// 将set 转为数组
let namesSet = new Set(['a', 'b'])
Array.from(namesSet) // ['a', 'b']


// 数组, Array.from会返回一个一模一样的新数组
Array.from([1, 2, 3])


// 任何有length属性的对象，都可以通过Array.from方法转为数组，而此时扩展运算符就无法转换
Array.from({ length: 3 }); // [ undefined, undefined, undefined ]




Array.from(arrayLike, x => x * x);
// 等同于
Array.from(arrayLike).map(x => x * x);

Array.from([1, 2, 3], (x) => x * x) // [1, 4, 9]




// 将false 转为0 
Array.from([1, , 2, , 3], (n) => n || 0) // [1, 0, 2, 0, 3]



// 返回各种数据类型
function typesOf () {
    return Array.from(arguments, value => typeof value)
}
typesOf(null, [], NaN) // ['object', 'object', 'number']


```

- 第三个参数，用来绑定this

- 第一个参数指定了第二个参数运行的次数
```javascript

Array.from({ length: 2 }, () => 'jack') // ['jack', 'jack']
```

- 将字符串转为数组
```javascript
// Array.from()的另一个应用是，将字符串转为数组，然后返回字符串的长度。因为它能正确处理各种Unicode字符，
// 可以避免JavaScript将大于\uFFFF的Unicode字符，算作两个字符的bug。

function countSymbols(string) {
  return Array.from(string).length;
}
```


## Array.of
Array.of方法用于将一组值，转换为数组
```javascript
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
```

## copyWithin
```javascript
// 将3号位复制到0号位
[1, 2, 3, 4, 5].copyWithin(0, 3, 4)
// [4, 2, 3, 4, 5]

// -2相当于3号位，-1相当于4号位
[1, 2, 3, 4, 5].copyWithin(0, -2, -1)
// [4, 2, 3, 4, 5]

// 将3号位复制到0号位
[].copyWithin.call({length: 5, 3: 1}, 0, 3)
// {0: 1, 3: 1, length: 5}
```

## Object.assign()
Object.assign拷贝的属性是有限制的，只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）
null undefined 在首位会报错, 不在首位会先转成对象, 不能转成对象, 直接忽视, 所以不会报错
Object.assign()，会忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性
```javascript
var v1 = 'abc';
var v2 = true;
var v3 = 10;

var obj = Object.assign({}, v1, v2, v3);
console.log(obj); // { "0": "a", "1": "b", "2": "c" }


// symbol也会被拷贝
Object.assign({ a: 'b' }, { [Symbol('c')]: 'd' }) // { a: 'b', Symbol(c): 'd' }
```
- 常见用途
```javascript
// 未对象添加属性
class Point {
  constructor(x, y) {
    Object.assign(this, {x, y});
  }
}

// 对象添加方法
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
    },
    anotherMethod() {
    }
});

// 合并多个对象
const merge = (...sources) => Object.assign({}, ...sources);
```

- 属性的可枚举性
```javascript
let obj = { foo: 123 };
Object.getOwnPropertyDescriptor(obj, 'foo')
//  {
//    value: 123,
//    writable: true,
//    enumerable: true,
//    configurable: true
//  }

```

ES5有三个操作会忽略enumerable为false的属性。
- for...in循环：只遍历对象自身的和继承的可枚举的属性
- Object.keys()：返回对象自身的所有可枚举的属性的键名
- JSON.stringify()：只串行化对象自身的可枚举的属性


