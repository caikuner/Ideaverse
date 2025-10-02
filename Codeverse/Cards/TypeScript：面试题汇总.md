---
tags: [fe/ts]
up: 
related: 
rank: "4"
url: https://www.mianshipai.com/docs/first-exam/TS.html
created: 2025-06-13
modified: 2025-07-10
published:
---

## TS Roadmap

> roadmap: [TypeScript Roadmap: Learn to become a TypeScript developer](https://roadmap.sh/typescript)

- 介绍
- ts 及配置，tsconfig
- Types
	- [[TypeScript：基本类型]]
	- 断言
	- 类型推断
	- 类型兼容
	- 类型组合: 交叉、联合、别名、keyof
	- 类型保护：instanceof，typeof，等于，truth，判断
- Interface 接口
    - [[TypeScript：interface]] | type vs interface
- 函数
    - 声明
    - [[TypeScript：函数重载]]
- 类
    - 访问修饰符 public，private，protected
    - constructor
    - 抽象类（父类中预定义，必须由子类重写）
- 泛型
    - [[TypeScript：泛型]]
- 装饰器
    - [[TypeScript：装饰器]]
- 工具类型
    - [[TypeScript：工具类型]]
- 高级类型
- TS Module
    - namespace
    - declare
    - import/export
    - global
    - 。。。
- TS 生态
    - tsc，tsx，ts-down
    - prettier，eslint
    - vite
    - zod……

## TS 优缺点，使用场景

TS 是 Microsoft 开发的 JS 类型系统，是 JS 语法的超集。能够在开发阶段为 JS 带来静态的类型检查，有利于大型项目的可维护性。较为新的运行时，如 deno、bun 更是原生支持 TS 语法的运行。


优点

- 静态类型，减少类型错误
- 有错误会在编译时提醒，而非运行时报错 —— 解释“编译时”和“运行时”
- 智能提示，提高开发效率

缺点

- 学习成本高
- 某些场景下，类型定义会过于混乱，可读性不好
- 使用不当会变成 anyscript
- 生产环境需要编译回 JS

适用场景

- 大型项目，业务复杂，维护人员多
- 逻辑性比较强的代码，依赖类型更多
- 组内要有一个熟悉 TS 的架构人员，负责代码规范和质量

PS. 虽然 TS 有很多问题，网上也有很多“弃用 TS”的说法，但目前 TS 仍然是最优解，而且各大前端框架都默认使用 TS 。

## TS 基础类型

### 有哪些基础类型

[[TypeScript：基本类型]]

### 对比：数组 Array 和元组 Tuple

- 数组元素只能有一种类型，元祖元素可以有多种类型。
- 数组可变长、元素可修改；元组不可变长，元素默认可修改

```ts
// 数组，两种定义方式
const list1: number[] = [1, 2, 3]
const list2: Array<string> = ['a', 'b', 'c']

// 元组
let x: [string, number] = ['x', 10]

```

追问: 如何禁止修改元组?

```ts
let tuple: readonly [string, number] = ['a', 1] as const;
tuple[0] = 'b'; // ❌ 报错：无法修改
tuple.push(2); // ❌ 报错：无 push 方法
```

### 对比：unknown 和 any 区别

- any 是任意类型（不进行检查）
- `unknown` 是更安全的 `any` 

```ts
// unknown 比直接使用 any 更安全
const a: any = 'abc'
a.toString() // 不报错
console.log(a.toUpperCase()) // 不会报错，但不安全


const b: unknown = 'abc'
// b.toString() // 报错
console.log( b.toUpperCase() ) // 会报错！！！
console.log((b as string).toUpperCase()) // 使用 as 转换类型，意思是告诉 TS 编译器：“我知道 b 的类型，我对安全负责”
```

### 对比：void Never 区别

- `void` 没有任何类型
- `never` 永不存在的值的类型

```ts
// void 一般定义函数返回值
function fn(): void {} 

// 返回 never 的函数，必须存在无法达到的终点
function error(message: string): never {
  throw new Error(message)
}
function infiniteLoop(): never {
  while (true) {}
}

```

### 枚举 enum 是什么？有什么使用场景？

> [https://www.tslang.cn/docs/handbook/enums.html](https://www.tslang.cn/docs/handbook/enums.html)

enum 枚举，一般用于表示有限的一些选项，例如使用 enum 定义 4 个方向。
代码中就可以获取某一个方向，用于展示或存储。这样代码更具有可读性和维护行。

```ts
enum Direction {
  Up = 'UP',
  Down = 'DOWN',
  Left = 'LEFT',
  Right = 'RIGHT',
}

const d = Direction.Up
```

- TS 的 enum 的实现有些不好，不建议使用（官方也在准备删除 enum）
	- 实现是转成了闭包的形式，会生成额外的运行时代码，且无法被 treeshaking

```js
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 1] = "Up";
    Direction[Direction["Down"] = 2] = "Down";
    Direction[Direction["Left"] = 3] = "Left";
    Direction[Direction["Right"] = 4] = "Right";
})(Direction || (Direction = {}));
```

- enum 的替代方案: `as const`

```ts
// 用 as const 替代
const Direction = {
  Up: "UP",
  Down: "DOWN",
} as const;

type Direction = (typeof Direction)[keyof typeof Direction]; // "UP" | "DOWN"
```

## 属性和操作

### 对比：type 和 interface 共同和区别，如何选择

[[TypeScript：interface]]

### 对比：keyof 和 typeof 区别

- `typeof` 用于获取类型。
- `keyof` 用于获取所有 key

```ts
interface Person {
  name: string
  age: number
  location: string
}

type PersonType = keyof Person
// 等价于 type PersonType = 'name' | 'age' | 'location'
```

### 断言：as Const (可替代 enum)

`const` 用于定义编译期间就赋值的常量。

使用 **`as const` 断言 + 对象字面量**可以完全替代 `enum`
- 保持类型安全
- 无运行时开销
- 可 treeshaking
- 扩展灵活
- 但是：需要手动处理反向映射

```ts
// 替代 enum 的完整方案
const LogLevel = {
  Debug: 0,
  Info: 1,
  Warn: 2,
  Error: 3,
} as const;

type LogLevel = (typeof LogLevel)[keyof typeof LogLevel]; // 0 | 1 | 2 | 3


// 使用示例
function log(message: string, level: LogLevel) {
  console[[message|level >= LogLevel.Error ? "error" : "log"]];
}

log("some debug message", LogLevel.Debug); // 类型安全
```

### 访问修饰符 public protected private

- public 公开的，谁都能用 （默认）
- protected 受保护的，只有自己和子类中可以访问
- private 私有的，仅自己的类中可以访问

```ts
class Person {
  name: string = ''
  protected age: number = 0
  private girlfriend = '小丽'

  // public protected private 也可以修饰方法、getter 等

  constructor(name: string, age: number) {
    this.name = name
    this.age = age
  }
}

class Employee extends Person {
  constructor(name: string, age: number) {
    super(name, age)
  }

  getInfo() {
    console.log(this.name)
    console.log(this.age)
    // console.log(this.girlfriend) // 这里会报错，private 属性不能在子类中访问
  }
}

const zhangsan = new Employee('张三', 20)
console.log(zhangsan.name)
// console.log(zhangsan.age) // 这里会报错，protected 属性不能在子类对象中访问，只能在子类中访问
```

追问： `#` 和 `private` 有什么区别呢？

- `#` 在 TS 中可定义私有属性
- 区别：
	- `#` 属性，不能在参数中定义
	- `private` 属性，可通过 `as any` 强制获取
	- `#` 属性，更私密

## 特殊类型

### 什么是泛型，如何使用它？

[[TypeScript：泛型]]

### 交叉类型 T1 & T2

交叉类型是将多个类型合并为一个类型，包含了所需的所有类型的特性。例如 `T1 & T2 & T3`

```ts
interface U1 {
  name: string
  city: string
}
interface U2 {
  name: string
  age: number
}
type UserType1 = U1 & U2
const userA: UserType1 = { name: 'x', age: 20, city: 'beijing' }

// 可在 userA 获取所有属性，相当于“并集”
userA.name
userA.age
userA.city
```

注意：
1. 两个类型的相同属性，如果类型不同（冲突了），则该属性是 `never` 类型

```ts
// 如上代码
// U1 name:string ，U2 name: number
// 则 UserType1 name 是 never
```

1. 基础类型没办法交叉，会返回 `never`

```ts
type T = string & number // never
```

- [https://www.tslang.cn/docs/handbook/advanced-types.html](https://www.tslang.cn/docs/handbook/advanced-types.html)

### 联合类型 T1 | T2

一种“或”的关系。格式如 `T1 | T2 | T3` 。

```ts
interface U1 {
  name: string
  city: string
}
interface U2 {
  name: string
  age: number
}

function fn(): U1 | U2 {
  return {
    name: 'x',
    age: 20,
  }
}
```

注意事项：
- 基础类型可以联合

```ts
type T = string | number
const a: T = 'x'
const b: T = 100
```

- 但如果未赋值的情况下，联合类型无法使用 string 或 number 的方法

```ts
function fn(x: string | number) {
  console.log(x.length) // 报错
}
```

### 工具类型

全部：[[TypeScript：工具类型]]

- `Partial<T>` 所有属性设置为可选
- `Require<T>` 所有属性设置为必选 （和 Partial 相反）
- `ReadOnly<T>` 所有属性设置为只读，相当于为每个属性都设置一遍 `readonly`
  
- `Pick<T, K>` 挑选部分属性
- `Omit<T, K>` 剔除部分属性（和 Pick 相反）

## 使用遇到的问题

### TS 这些符号??.??! \_ & | # 分别什么意思

- `?` 可选属性，可选参数
- `?.` 可选链：有则获取，没有则返回 undefined ，但不报错。
- `??` 空值合并运算符：当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数。
- `!` 非空断言操作符：忽略 undefined null ，自己把控风险
- `_` 数字分隔符：分割数字，增加可读性
- `&` 交叉类型
- `_` 联合类型
- `#` 私有属性

### 如何扩展 window 属性

```ts
declare interface Window {
  test: string
}

window.test = 'aa'
console.log(window.test)
```

### 如何定义第三方模块的类型

```ts
// 使用第三方类型库,eg:
// npm i -D @types/lodash

// 快速绕过：
// 声明模块（不提供具体类型）
declare module 'module-name';

// 或提供粗略类型（适用于简单场景）
declare module 'module-name' {
  export function doSomething(arg: string): void;
  export const someValue: number;
}
```

### 是否有过真实的 Typescript 开发经验，讲一下你的使用体验

- 在 Vue/React 或其他框架使用时遇到的障碍？
	- Vite 对 TSX 支持问题，需要安装 babel 插件
- 在打包构建时，有没有遇到 TS 语法问题而打包失败？
	- 浏览器报错
- 有没有用很多 `any` ？如何避免 `any` 泛滥？

> [https://juejin.cn/post/6929793926979125255](https://juejin.cn/post/6929793926979125255)
