// ---------------------------------------- typeof  详解

// 1. 基本数据类型使用
// 字符串类型
const str = 'TypeScript'
type StrType = typeof str // 推导为 string 类型
// 数字类型
const num = 100
type NumType = typeof num // 推导为 number 类型
// 布尔类型
const isTrue = true
type BoolType = typeof isTrue // 推导为 boolean 类型
// null 类型
const n = null
type NullType = typeof n // 推导为 null 类型
// undefined 类型
let u
type UndefinedType = typeof u // 推导为 undefined 类型
// Symbol 类型
const sym = Symbol('unique')
type SymType = typeof sym // 推导为 symbol 类型

// 2. 对象类型使用

// 普通对象
const person = { name: 'Alice', age: 25, isDeveloper: true }
type PersonType = typeof person // 推导为 { name: string; age: number; isDeveloper: boolean; }
// 数组对象
const numbers2 = [1, 2, 3, 4]
type NumbersType = typeof numbers2 // 推导为 number[]
// 函数对象
function add(a: number, b: number): number {
  return a + b
}
type AddFuncType = typeof add // 推导为 (a: number, b: number) => number
// Date 对象
const date = new Date()
type DateType = typeof date // 推导为 Date

// 3. 使用 typeof 定义类型别名

// 定义一个变量
const config = { serverUrl: 'https://api.example.com', timeout: 5000, debug: false }
// 使用 typeof 获取 config 的类型并用于其他变量的类型注解
let anotherConfig: typeof config = { serverUrl: 'https://api.another.com', timeout: 3000, debug: true }

// 4. 使用 typeof 定义联合类型
// 定义颜色变量可以是上述三种颜色之一
const primaryColor = 'red'
const secondaryColor = 'blue'
const neutralColor = 'gray'
let favoriteColor: typeof primaryColor | typeof secondaryColor | typeof neutralColor

favoriteColor = 'red'
favoriteColor = 'blue'
favoriteColor = 'gray'
// favoriteColor = 'maroon'

// 5. 在泛型中使用 typeof推导类型
// 数组
// 泛型函数，返回参数对象的拷贝
function createCopy<T>(obj: T): T {
  return { ...obj }
}

// 使用 typeof 推导函数参数的类型
function getFirstItem<T extends any[]>(arr: T): (typeof arr)[0] {
  return arr[0]
}

const numbers = [1, 2, 3]
const firstNum = getFirstItem(numbers) // firstNum 的类型为 number
const strings = ['a', 'b', 'c']
const firstStr = getFirstItem(strings) // firstStr 的类型为 string

// 对象

// 更复杂的例子：根据对象属性类型推导
function getProperty<T, K extends keyof T>(obj: T, key: K): (typeof obj)[K] {
  return obj[key]
}
const person2 = { name: 'Bob', age: 30, address: { city: 'New York' } }
const name2 = getProperty(person2, 'name') // name 的类型为 string
const age = getProperty(person2, 'age') // age 的类型为 number
const city = getProperty(person2.address, 'city') // city 的类型为 string

// 6 typeof 在条件类型中的应用

// 判断类型是否为数组
type IsArray<T> = T extends any[] ? true : false
// 根据类型是否为数组返回不同的类型
type ArrayOrOther<T> = IsArray<T> extends true ? 'array' : 'other'

// 使用 typeof 进行条件类型判断
function getTypeDescription<T>(value: T): ArrayOrOther<typeof value> {
  if (Array.isArray(value)) {
    return 'array' as ArrayOrOther<typeof value>
  } else {
    return 'other' as ArrayOrOther<typeof value>
  }
}
const arr = [1, 2, 3]
const desc1 = getTypeDescription(arr) // desc1 的类型为 'array'
const num2 = 100
const desc2 = getTypeDescription(num2) // desc2 的类型为 'other'

// 6 高级技巧
// 一) 索引签名

const baseConfig = { env: 'production', port: 8080, debug: false }
// 使用 typeof 获取 baseConfig 的类型，并通过索引签名定义新类型
type ConfigKeys = keyof typeof baseConfig // 'env' | 'port' | 'debug'

type ReadonlyConfig = { readonly [K in ConfigKeys]: (typeof baseConfig)[K] }
// 创建只读配置对象
const readonlyConfig: ReadonlyConfig = { env: 'production', port: 8080, debug: false }
// 尝试修改只读属性会报错
// readonlyConfig.env = 'development'

// 二) 映射类型

const user = { id: 1, name: 'Charlie', email: 'charlie@example.com', isActive: true }
// 将对象的所有属性转换为可选属性
type PartialUser = { [K in keyof typeof user]?: (typeof user)[K] }

// 将对象的所有属性转换为只读属性
type ReadonlyUser = { readonly [K in keyof typeof user]: (typeof user)[K] }

// 将对象的所有属性值转换为字符串类型
type StringifyUser = { [K in keyof typeof user]: string }

// 创建不同类型的对象
const partialUser: PartialUser = { name: 'Charlie' }
const readonlyUser: ReadonlyUser = { id: 1, name: 'Charlie', email: 'charlie@example.com', isActive: true }
const stringifyUser: StringifyUser = { id: '1', name: 'Charlie', email: 'charlie@example.com', isActive: 'true' }

// 三）typeof 在函数重载中的应用

// 定义数据项
const item1 = { id: 1, name: 'Item 1' }
const item2 = { id: 2, name: 'Item 2' }
const items = [item1, item2]
// 使用 typeof 定义函数重载
function findItemById(id: typeof item1.id): typeof item1 | undefined
function findItemById(id: typeof item2.id): typeof item2 | undefined
function findItemById(id: number): { id: number; name: string } | undefined {
  return items.find((item) => item.id === id)
}
// 调用重载函数
const foundItem1 = findItemById(item1.id) // foundItem1 的类型为 typeof item1 | undefined
const foundItem2 = findItemById(item2.id) // foundItem2 的类型为 typeof item2 | undefined
const foundItem3 = findItemById(3) // foundItem3 的类型为 { id: number; name: string } | undefined

// 四）typeof 与 this 类型
class DataManager {
  private data: any[] = []
  add(item: any): typeof this {
    this.data.push(item)
    return this
  }
  remove(item: any): typeof this {
    const index = this.data.indexOf(item)
    if (index !== -1) {
      this.data.splice(index, 1)
    }
    return this
  }
  clear(): typeof this {
    this.data = []
    return this
  }
  getData(): any[] {
    return this.data
  }
}
// 使用链式调用
const manager = new DataManager()
manager.add(1).add(2).remove(1).clear()
const data = manager.getData() // data 的类型为 any[]
