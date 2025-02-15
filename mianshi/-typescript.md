### 如何全局声明
global.d.ts
```typescript
// 声明全局变量
declare var jQuery: (selector: string) => any;

// 声明全局类型
declare interface Person {
  name: string;
  age: number;
}

// 使用声明的全局变量和类型
const elem = jQuery("#myElement");
const person: Person = { name: "John", age: 25 };

```

### 内置数据类型

- boolean（布尔类型）
- number（数字类型）
- string（字符串类型）
- void 类型
- null 和 undefined 类型
- 
- array（数组类型）
- object 对象类型
- tuple（元组类型）：允许表示一个已知元素数量和类型的数组，各元素的类型不必相同
- enum（枚举类型）：enum类型是对JavaScript标准数据类型的一个补充，使用枚举类型可以为一组数值赋予友好的名字
- any（任意类型）
- never 类型


### TypeScript 中 const 和 readonly 的区别
const可以防止变量的值被修改，在运行时检查，使用const变量保存的数组，可以使用push，pop等方法
readonly可以防止变量的属性被修改，在编译时检查，使用Readonly Array声明的数组不能使用push，pop等方法


### any、never、unknown、null & undefined 和 void 区别

- any: 动态的变量类型（失去了类型检查的作用）。
- never: 永不存在的值的类型。例如：never 类型是那些总是会抛出异常或根本就不会有返回值的函数表达式或箭头函数表达式的返回值类型。
- unknown: 任何类型的值都可以赋给 unknown 类型，但是 unknown 类型的值只能赋给 unknown 本身和 any 类型。
- null & undefined: 默认情况下 null 和 undefined 是所有类型的子类型。 就是说你可以把 null 和 undefined 赋值给 number 类型的变量。当你指定了 --strictNullChecks 标记，null 和 undefined 只能赋值给 void 和它们各自。
- void: 没有任何类型。例如：一个函数如果没有返回值，那么返回值可以定义为void。


### any unknown区别
unknown 类型会更加严格：在对 unknown 类型的值执行大多数操作之前，我们必须进行某种形式的检查。
any 类型的值执行操作之前，不会进行任何检查。

any 和 unknown 都是顶级类型，但是 unknown 更加严格，不像 any 那样不做类型检查，
反而 unknown 因为未知性质，不允许访问属性，不允许赋值给其他有明确类型的变量。


### keyof
索引类型查询操作符， 获取一个类型的所有属性名组成的联合类型
```typescript
type Person = {
    name: string,
    age: number
}

type PersonKeys = keyof Person // 'name' | 'age'
```


### 泛型
在编写代码时使用一些以后才指定的类型，在定义函数，接口或者类的时候，
不预先定义好具体的类型，而在使用的时候在指定类型的一种特性。


### any和泛型区别
泛型有类型推论，编译器会根据传入的参数自动地帮助我们确定T的类型

any则是不检验


### 同名的 interface 或者同名的 interface 和 class 可以合并吗
同名的interface会自动合并，同名的interface和class会自动聚合。


### type interface区别
相同点：

- 都可以描述 '对象' 或者 '函数'
- 都允许拓展(extends)：interface 和 type 都可以拓展，并且两者并不是相互独立的，也就是说 interface 可以 extends type, type 也可以 extends interface 。 虽然效果差不多，但是两者语法不同。

不同点：
- type 可以声明基本类型，联合类型，元组
- type 可以使用 typeof 获取实例的类型进行赋值


多个相同的 interface 声明可以自动合并

使用 interface 描述‘数据结构’，使用 type 描述‘类型关系
一般来说，如果不清楚什么时候用interface/type，能用 interface 实现，就用 interface , 如果不能就用 type 。

联合类型和交叉类型

### 方法重载
方法重载是指在一个类中定义多个同名的方法，但要求每个方法具有不同的参数的类型或参数的个数。
基本上，它在派生类或子类中重新定义了基类方法。

方法覆盖规则：

该方法必须与父类中的名称相同。
它必须具有与父类相同的参数。
必须存在IS-A关系或继承。


### 类成员访问修饰符
- public：默认的访问修饰符，公共成员可以在任何地方访问。
- protected：受保护的成员可以在当前类和继承类中访问，实例不能访问。
- private：私有成员只能在当前类中访问，继承类和实例都不能访问。


### declare作用
declare 关键字用来声明全局变量、全局函数、全局类或全局枚举类型等

为什么要申明：不声明的话，TypeScript编译器将无法识别上述的这些模块，就会提示相应的错误信息。


### TypeScript中命名空间与模块的理解和区别

命名空间是编写内部模块时使用的一种方式，它提供了一种将所有相关对象封装在单个命名空间中的方法。
命名空间是一个对象，可以包含函数、变量、类型等内容。可以将一组相关函数和数据放在一个命名空间内，
从而避免命名冲突。
```typescript

// 命名空间的定义和使用
namespace MyNamespace {
  export const a = 1;
  export function fn() { console.log("hello world") };
}

MyNamespace.fn(); // "hello world"
console.log(MyNamespace.a); // 1

```


模块是用来组织代码的另一种方式，它提供了将公共接口和具体实现分开的方法。
模块是有作用域的，也就是说，它们内部定义的变量、函数等都不会污染全局作用域。
可以使用 export 关键字将模块内的接口暴露出去，供其他模块使用。
```typescript

// 模块的定义和使用
export const a = 1;
export function fn() { console.log("hello world") };

import { a, fn } from './myModule';
fn(); // "hello world"
console.log(a); // 1


```

在使用命名空间和模块时需要注意以下几点：
- 命名空间不存在变量名冲突问题，但命名空间的嵌套不应该过深，否则可能导致代码的可读性变差。
- 模块之间可以进行依赖管理，即一个模块可以依赖于其他模块，在使用模块时需要对依赖项进行管理。
- 在 TypeScript 中，模块是推荐使用的组织代码的方式，命名空间仅用于向后兼容性。如果要编写新的代码，应该使用模块而不是命名空间。


总之，命名空间和模块都是用来组织代码的方式，它们的相似点在于都可以用来避免命名冲突，但模块由于其更好的扩展性和可维护性被推荐使用。


### 加载机制
假设有一个导入语句 import { a } from "moduleA";

首先，编译器会尝试定位需要导入的模块文件，通过绝对或者相对的路径查找方式；
如果上面的解析失败了，没有查找到对应的模块，编译器会尝试定位一个外部模块声明（.d.ts）；
最后，如果编译器还是不能解析这个模块，则会抛出一个错误 error TS2307: Cannot find module 'moduleA'.
