---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-12
---

### Hooks 好处

_Hook_ 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。Class 组件有以下问题：

- Class 组件之间复用状态逻辑很难

React 的组件复用：[render props](https://zh-hans.legacy.reactjs.org/docs/render-props.html) 和 [高阶组件](https://zh-hans.legacy.reactjs.org/docs/higher-order-components.html)。这类方案需要重新组织组件结构，会很麻烦。 由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。**Hook 使你在无需修改组件结构的情况下复用状态逻辑。** 这使得在组件间或社区内共享 Hook 变得更便捷。

- 复杂组件变得难以理解

组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。  
例如，组件常常在 `componentDidMount` 和 `componentDidUpdate` 中获取数据。但是，同一个 `componentDidMount` 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 `componentWillUnmount` 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。

**Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据）**，而并非强制按照生命周期划分。还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

- 难以理解的 class

class 是学习 React 的一大屏障，比如 React Class 中 JavaScript 中 `this` 的指向问题。  
函数组件与 class 组件的差异很大，也各有使用场景。  
从概念上讲，React 组件一直更像是函数。而 Hook 则拥抱了函数。

---

### 1. 不要改变 hooks 的调用顺序

不要在循环、条件、嵌套函数中调用 Hook，确保总是在 React 函数的最顶层或者任何 return 之前调用他们。

- 这样才能保证 Hook 在每一次渲染中都按照同样的顺序被调用
- 原理：[[React：为何 Hooks 不能放在条件或循环之内]]

### 2. 只在 React 函数中调用 Hook

不要在普通的 JavaScript 函数中调用 Hook，这样可以保持纯函数的纯粹 (不要沾染状态逻辑)

### 3. 规避闭包陷阱

#### 闭包陷阱产生的原因

React Hooks 是依赖 JavaScript 的闭包机制实现的。

- 当一个函数被定义时，它会捕获当前作用域中的变量。
- 如果这些变量是状态或 props，它们的值在函数定义时被“固定”下来。
- 当状态或 props 更新时，闭包中的值并不会自动更新。

因此产生闭包陷阱：  
当使用接收一个回调作为参数的钩子时 (useEffect/useCallback)，可能会创建一个旧的闭包，该闭包会捕获过时的状态或者 prop 变量 (上一次渲染快照的)。

#### 闭包陷阱例子

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // 每次打印的都是初始值 0
    }, 1000);

    return () => clearInterval(timer);
  }, []); // 依赖数组为空，effect 只运行一次

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

在这个例子中：

- `useEffect` 只在组件挂载时运行一次。
- `setInterval` 的回调函数形成了一个闭包，捕获了初始的 `count` 值（即 0）。
- 即使 `count` 状态更新了，`setInterval` 中的回调函数仍然访问的是旧的 `count` 值。

#### 如何规避

为了避免闭包陷阱，要注意把依赖的 state 或 props 添加到 useEffect 的依赖数组中，这样每次状态更新时，useEffect 都会重新运行，闭包中的值也会更新。

```js
useEffect(callback, deps);
useCallback(callback, deps);
```

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log(count); // 每次打印最新的 count 值
  }, 1000);

  return () => clearInterval(timer);
}, [count]); // 将 count 添加到依赖数组
```
