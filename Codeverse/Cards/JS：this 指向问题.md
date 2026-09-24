---
tags: []
up:
related:
created: 2025-06-16
modified: 2025-06-16
---

> Q: 涉及面试题：如何正确判断 this？箭头函数的 this 是什么？

### 为什么会有 this 指向问题

为什么有这么复杂的 this 指向问题？

- 都是因为变量提升，导致不能在词法上区分作用域，只能在运行时确定
- 为了弥补这个问题，后来才推出了箭头函数（因为箭头函数只有赋值行为，无法被提升）

### this 指向优先级 ⭐️

> 具体知识可参考：[[JS：箭头函数 VS. 普通函数]] [[JS：call、apply、bind]]

- 默认 - 全局
  - this 会指向全局 this
  - 浏览器中就是 window，node 是 global；严格模式默认 undefined （注：日常可以用 `globalThis` 它做了兼容）
- 普通函数（按照优先级别）- 指向执行过程中的直接调用者
  - `正常函数`：
    - `fn()`
    - 指向调用者所在作用域，而调用者实际都是全局对象，不管函数被放在了什么地方，this 永远全局作用域
  - `对象的方法` 的形式调用：
    - `obj.fn()`
    - this 指向方法的直接调用对象 obj
- `bind/call/apply`
  - 修正 this 为第一个参数：如果为空 (null/undefined), 则为默认的全局

```js
fn.call(obj, …arguments)
fn.apply(obj, […arguments])
fn.bind(obj, …arguments)()
```

- `构造函数 new` - 指向实例
  - `new fn()`
  - this 固化为 new 出来的实例
- 箭头函数
  - 箭头函数的一个功能就是修正 this，普通函数以执行过程的**直接调用者**为 this，箭头函数则**修正为词法作用域中的 this**
  - 箭头函数实际没有 `this` ，箭头函数中的 `this` 只取决包裹箭头函数的第一个普通函数的 `this`。这在代码的词法上就确立下来了，后面无论如何不会再改变
  - **即使 bind/call/apply 也不改变**
- 最后总结一下优先顺序
  - **箭头函数 > new > bind/call/apply > obj.fn() > fn() = 默认全局**

### 示例

#### 1. 箭头函数

因为包裹箭头函数的第一个普通函数是 `a`，所以 `this` 是 `window`

```

function a() {
  return () => {
    return () => {
      console.log(this)
    }
  }
}
console.log(a()()())

```

#### 2. 普通函数

```

const c = new foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

function foo() {
  console.log(this.a)
}
var a = 1
foo()

```

我们一个个分析上面几个场景

- 对于 `new` 的方式来说，`this` 被永远绑定在了 `c` 上面，不会被任何方式改变 `this`
- 对于 `obj.foo()` 来说，我们只需要记住，谁调用了函数，谁就是 `this`，所以在这个场景下 `foo` 函数中的 `this` 就是 `obj` 对象
- 对于直接调用 `foo` 来说，不管 `foo` 函数被放在了什么地方，`this` 一定是 `window`

#### 3. `bind/apply/call`

对于这些函数来说，`this` 取决于第一个参数，如果第一个参数为空，那么就是 `window`。

那么说到 `bind`，如果对一个函数进行多次 `bind`，那么上下文会是什么呢？

```

let a = {}
let fn = function () { console.log(this) }
fn.bind().bind(a)() // => ?

```

我们可以把上述代码转换成另一种形式：

```

// fn.bind().bind(a) 等于
let fn2 = function fn1() {
  return function() {
    return fn.apply()
  }.apply(a)
}
fn2()

```

可以从上述代码中发现，不管给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定，所以结果永远是 `window`。

#### 4. 题目

```

let a = { name: 'yck' }
function foo() {
  console.log(this.name)
}
foo.bind(a)() // => 'yck'

```

```

var obj = {};
obj.log = console.log;
obj.log.call(console,this); // window

// 等价于
var obj = {
	log:console.log
};
(obj.log).call(console,this)
 // 把 (obj.log) 方法的 this 修正为 console，并传入当前 this 为参数（window）
console.log(this) // window.实际上这里就是打印传入的 this 实参

```

### 流程图

图中的流程只针对于单个规则，要额外注意优先顺序
![[Pasted image 20250616123400.png]]
