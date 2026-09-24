---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-12
---

`setState(updater[,callback])` 在 React 中最常用的 API，它目前是异步的。

### React 18 之前是同步的

在 React 18 之前，React 采用批处理策略来优化状态更新。  
在批处理策略下，React 将在事件处理函数结束后应用所有的状态更新，这样可以避免不必要的渲染和 DOM 操作。

然而，这个策略在异步操作中就无法工作了。因为 React 没有办法在适当的时机将更新合并起来，所以结果就是在**异步操作中的每一个状态更新都会导致一个新的渲染**。

例如，当你在一个 onClick 事件处理函数中连续调用两次 setState，React 会将这两个更新合并，然后在一次重新渲染中予以处理。

然而，在某些场景下，如果你在事件处理函数之外调用 setState，React 就无法进行批处理了。比如在 setTimeout 或者 Promise 的回调函数中。在这些场景中，每次调用 setState，React 都会触发一次重新渲染，无法达到批处理的效果。

### React 18 之后是异步的

React 18 引入了自动批处理更新机制，让 React 可以捕获所有的状态更新，并且无论在何处进行更新，都会对其进行批处理。这对一些异步的操作，如 Promise，setTimeout 之类的也同样有效。

这一新特性的实现，核心在于 React 18 对**渲染优先级**的管理。  
React 18 引入了一种新的协调器，被称为“React Scheduler”。它负责管理 React 的工作单元队列。每当有一个新的状态更新请求，React 会创建一个新的工作单元并放入这个队列。当 JavaScript 运行栈清空，Event Loop 即将开始新的一轮循环时，Scheduler 就会进入工作，处理队列中的所有工作单元，实现了异步批处理。

### 例子

`setState` 的调用并不会马上引起 `state` 的改变，并且如果你一次调用了多个 `setState` ，那么结果可能并不如你期待的一样。

```js
handle() {
  // 初始化 \`count\` 为 0
  console.log(this.state.count) // -> 0
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  this.setState({ count: this.state.count + 1 })
  console.log(this.state.count) // -> 0
}
```

第一，两次的打印都为 0，因为 `setState` 是个异步 API，只有同步代码运行完毕才会执行。 `setState` 异步的原因在于，`setState` 会导致 DOM 的重绘，如果调用一次就马上去进行重绘，那么调用多次就会造成不必要的性能损失。设计成异步的话，就可以将多次调用放入一个队列中，在恰当的时候统一进行更新过程。

第二，虽然调用了三次 `setState` ，但是 `count` 的值还是为 1。因为多次调用会合并为一次，只有当更新结束后 `state` 才会改变，三次调用等同于如下代码

```js
Object.assign(
  {},
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
  { count: this.state.count + 1 },
)w
```

如果你想在每次调用 `setState` 后获得正确的 `state`：

```js

// setState(updater[,callback])
handle() {
    this.setState((prevState) => ({ count: prevState.count + 1 }), () => {
        console.log(this.state)
    })
}
```
