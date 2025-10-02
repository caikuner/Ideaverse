---
tags: []
up:
related:
created: 2025-06-16
modified: 2025-06-16
---

### 对象调用函数/方法的方式

```
obj.fn()
fn.call(obj, …arguments)
fn.apply(obj, […arguments])
fn.bind(obj, …arguments)()
```

### call / apply

都可以改变函数的调用对象。

第一个参数：将一个对象传给 call 或 apply，this 便会绑定到这个对象（不是对象会被包装）。

如果第一个参数不传或者传 null 、undefined，默认会将 this 指向全局对象（非严格模式）或 undefined（严格模式）。

call 和 apply 语法和作用类似，只有一个区别，就是除了 this 之外，

- `call()` 方法接受的是**一个参数列表**
- `**fn.call(thisArg, …arguments)**`
- `apply()` 方法接受是**一个包含多个参数的数组**
- `**fn.apply(thisArg,arguments)**`
- 一个数组或者类数组对象，其中的数组元素将作为单独的参数传给 `fn` 函数。如果该参数的值为 `[[ef31ab67c58d5a673779aa12ff3f929c.html|null]]` 或  `[[db35d98c3293670a2e3d56d18027152b.html|undefined]]`，则表示不需要传入任何参数。

返回值为：调用有指定 `**this**` 值和参数的函数 fn 的结果。

### bind

`**bind()**` 方法创建一个新的绑定函数。`fn.bind(thisArg, …arguments)`

在 `**bind()**` 被调用时，这个新函数的 `this` 同样被 bind 的第一个参数指定，其余的参数将作为新函数的参数供调用时使用。

- 第一个参数

`thisArg：` 调用绑定函数时，作为 `this` 参数传递给目标函数的值，不是对象的话会被包装成对象。

如果使用 `[[dfa702e50f3c5601f03e4afcda8b36c0.html|new]]` 运算符构造绑定函数，优先级别更高，会忽略该值。

如果 `bind` 函数的参数列表为空，当前执行作用域的 `this` 将被视为新函数的 `thisArg`。

- 后面的一个个参数，会被预先添加到绑定函数的参数列表中。
- 返回值：返回一个原函数的拷贝，并拥有指定的 `this` 值和初始参数。

【注意】

- bind 和 apply/call 的最大不同在于, bind 返回的是函数，那俩是返回函数执行后的结果
- 想直接调用可以立即执行 `fn.bind(thisArg,…arguments)()`
- **不管给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定**。

### 对比：call、apply、bind

作用：

- 最主要的应用就是 修改 this 指向 (为第一个参数，不指定默认全局)
- 借用其他对象的方法，比如
- Array.prototype.shift.call(arguments, 0,1) 删除第一个参数，并返回
- 不过能借用成功的原因是，arguments 本来就是个类数组，和数组一样是 index-value 的形式，而且它的 length 属性可读写。像 string 借用 array 的就不行，因为 string 的 length 不可读写

区别：

- apply 和 call 的区别只在于，除了 this 参数以外的参数形式，apply 为数组，call 和 bind 为单独的一个个参数
- bind 和另外两者的区别在于，bind 返回的是函数，那俩是返回函数执行后的结果

### 手写 call apply bind

> 涉及面试题：call、apply 及 bind 函数内部实现是怎么样的？

[[手写 call、apply​、bind]]
