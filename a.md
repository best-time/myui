## proxy

target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理
handler 一个通常以函数作为属性的对象，用来定制拦截行为

```javascript
const proxy = new Proxy(target, handle)
```

Handler 对象常用的方法

| 方法 |描述 |
|---|---|
|handler.has()	| in 操作符的捕捉器。|
|handler.get()	|属性读取操作的捕捉器。|
|handler.set()	|属性设置操作的捕捉器。|
|handler.deleteProperty()	|delete 操作符的捕捉器。|
|handler.ownKeys()	|Object.getOwnPropertyNames 方法和 Object.getOwnPropertySymbols 方法的捕捉器。|
|handler.apply()	|函数调用操作的捕捉器。|
|handler.construct()	|new 操作符的捕捉器|

## typescript  

变量后使用！：表示类型推断排除 null、undefined

### !非空断言符号：忽略 null 和 undefined 类型
```typescript

let y:number

y = null		// 无法通过编译
y = undefined	// 无法通过编译

y = null!
y = undefined!
```

```typescript
// 由于 x 是可选的，因此 parma.x 的类型为 number | undefined，无法传递给 number 类型的 y，因此需要用x!
interface IDemo {
    x?: number
}

let y:number

const demo = (parma: IDemo) => {
    y = parma.x!
    return y
}
```

### 强制链式调用 （非空断言操作符）

```typescript
// 这里 Error对象定义的stack是可选参数，如果这样写的话编译器会提示
// 出错 TS2532: Object is possibly 'undefined'.
new Error().stack.split('\n');

// 我们确信这个字段100%出现，那么就可以添加！，强调这个字段一定存在
new Error().stack!.split('\n');
```

### 泛型
泛型的意义在于函数的重用性，设计原则希望组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型

```typescript
泛型可以保证入参跟返回值是相同类型的，它是一种特殊的变量，只用于表示类型而不是值

语法 <T>(arg:T):T 其中T为自定义变量

const hello : string = "Hello vue!"
function say<T>(arg: T): T {
    return arg;
}
console.log(say(hello)) // Hello vue! 
```

#### 泛型约束
我们使用同样的例子，加了一个console，但是很不幸运，报错了，因为泛型无法保证每种类型都有.length 属性

```typescript
const hello : string = "Hello vue!"
function say<T>(arg: T): T {
	console.log(arg.length) // Property 'length' does not exist on type 'T'.
    return arg;
}
console.log(say(hello)) // Hello vue! 
```

从这里我们也又看出来一个跟any不同的地方，如果我们想要在约束层面上就结束战斗，我们需要定义一个接口来描述约束条件

```typescript
interface Lengthwise {
    length: number;
}

function say<T extends Lengthwise>(arg: T): T {
	console.log(arg.length)
    return arg;
}
console.log(say(1))  // Argument of type '1' is not assignable to parameter of type 'Lengthwise'.
console.log(say({value: 'hello vue!', length: 10})) // { value: 'hello vue!', length: 10 } 
```

### 交叉类型
交叉类型(Intersection Types)，将多个类型合并为一个类型

```typescript
interface foo {
    x: number
}
interface bar {
    b: number
}
type intersection = foo & bar
const result: intersection = {
    x: 10,
    b: 20
}
const result1: intersection = {
    x: 10
}  // error
```

### 联合类型
联合类型(Union Types)，表示一个值可以是几种类型之一。 我们用竖线 | 分隔每个类型，所以 number | string | boolean表示一个值可以是 number， string，或 boolean

```typescript
type arg = string | number | boolean
const foo = (arg: arg):any =>{ 
    console.log(arg)
}
foo(1)
foo('2')
foo(true)
```

### 函数重载
函数重载（Function Overloading）, 允许创建数项名称相同但输入输出类型或个数不同的子程序，可以简单理解为一个函数可以执行多项任务的能力

例我们有一个add函数，它可以接收string类型的参数进行拼接，也可以接收number类型的参数进行相加

```typescript
function add (arg1: string, arg2: string): string
function add (arg1: number, arg2: number): number

// 实现
function add <T,U>(arg1: T, arg2: U) {
  // 在实现上我们要注意严格判断两个参数的类型是否相等，而不能简单的写一个 arg1 + arg2
  if (typeof arg1 === 'string' && typeof arg2 === 'string') {
    return arg1 + arg2
  } else if (typeof arg1 === 'number' && typeof arg2 === 'number') {
    return arg1 + arg2
  }
}

add(1, 2) // 3
add('1','2') //'12'
```
