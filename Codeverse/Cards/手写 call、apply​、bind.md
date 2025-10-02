---
tags:
  - handcode

related: 
rank: "5"
created: 2025-06-16
modified: 2025-06-17
---

> 手写版 [[apply_call_bind.js]]

讲解请看：[[JS：call、apply、bind]]

**注意事项：**
- apply、call 是返回函数执行的结果
	- applay 传递参数数组，undefined/null 代表不需要改参数
	- call 传递参数列表
- bind 返回绑定函数，无需执行
	- 传递参数列表
	- 想直接调用可以立即执行 `fn.bind(thisArg, …arguments)()`
	- 不管给函数 `bind` 几次，`fn` 中的 `this` 永远由第一次 `bind` 决定

### apply

```js
Function.prototype.myApply = function (context, argsArry) {
  if (typeof this !== "function") {
    throw new TypeError("Error");
  }
  context = context || globalThis;
  
  // 创建唯一键防止属性冲突
  const tempfn = Symbol('tempfn');
  context.tempfn = this;

  const result = argsArry?.length ? context.tempfn(...argsArry) : context.tempfn()

  delete context.tempfn;
  return result;
};

```

### call

```js
Function.prototype.myCall = function(context, ...args) {
  return this.myApply(context, args)
}
```

### bind

bind 的实现对比其他两个函数略微地复杂了一点
- 因为 bind 需要返回一个函数，这个函数是可以 new 的，也就是可以多次调用。但是 bind 的一个特性是，不管多少次调用，都**保持第一次的 this**
- 最后执行需要用到 apply/call，所以可能需要先实现 apply/call（看面试官要求）

```js
Function.prototype.myBind = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  
  const selfFn = this

  // 返回一个函数
  return function bindFn() {
    // 处理多次调用的边界情况，**都保持修正为第一次的** this
    const isNewCall = this instanceof bindFn

    return selfFn.apply(isNewCall ? this : context, args.concat(...arguments)) // 合并参数
  }
}

```
