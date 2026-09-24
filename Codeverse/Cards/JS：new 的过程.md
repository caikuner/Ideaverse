---
tags: []
up:
related:
rank: "4"
created: 2025-06-16
modified: 2025-06-16
---

### 调用 `new` 的过程

调用 `new` 的过程中会发生四件事情：

1. 新生成一个空对象
2. 链接到原型：把这个空对象的 `__proto__` 指向其构造函数的 prototype ,即 `obj.__proto__ = constructor.prototypoe` 
3. 绑定 this ：把这个空对象赋值给 this
4. 返回新对象： 执行构造函数内的代码，空对象成为新对象返回。(原始值的构造函数 new 返回包装对象)

注：

- 建议不要直接操作隐式原型，即使操作也请用 Object.setPrototypeOf 代替
- **Object.create** 会自动设置原型，尽量使用它
  [[手写 new]]

### 所有对象都是 new 出来的

对于对象来说，其实都是通过 `new` 产生的，无论是 `function Foo()` 还是 `let a = {b : 1}` 。

对于创建一个对象来说，更推荐使用字面量的方式创建对象（无论性能上还是可读性）。
因为使用 new Object() 的方式创建对象需要通过作用域链一层层找到 Object，但是使用字面量的方式就没这个问题。

```
function Foo() {}
// function 就是个语法糖
// 内部等同于 new Function()

let a = { b: 1 }
// 这个字面量内部也是使用了 new Object()
```
