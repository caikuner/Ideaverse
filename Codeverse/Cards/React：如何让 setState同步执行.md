---
tags: []
up:
related:
companies:
created: 2025-06-24
modified: 2025-06-24
---
在 React 中，`setState` 默认是异步执行的，这是 React 出于性能考虑所做的优化。但在某些特殊场景下，你可能需要让 `setState` 同步执行。以下是几种实现方式：

### 1. 使用回调函数

`setState` 接受一个回调函数作为第二个参数，这个回调会在状态更新完成后执行：

```javascript
this.setState({ count: this.state.count + 1 }, () => {
  console.log(this.state.count); // 这里能获取到更新后的值
});
```

### 2. 使用 setTimeout 强制异步转为 " 同步 "

```javascript
setTimeout(() => {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 会输出更新后的值
}, 0);
```

### 3. 在 React 事件系统外调用 setState

React 的批量更新机制只在 React 事件处理函数中生效，在其他异步代码中（如原生事件、setTimeout、Promise 等）`setState` 会同步执行：

```javascript
document.getElementById('btn').addEventListener('click', () => {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // 会输出更新后的值
});
```

### 4. 使用 ReactDOM.flushSync (React 18+)

在 React 18 及以上版本，可以使用 `ReactDOM.flushSync` 强制同步更新：

```javascript
import { flushSync } from 'react-dom';

flushSync(() => {
  this.setState({ count: this.state.count + 1 });
});
console.log(this.state.count); // 会输出更新后的值
```

### 5. 使用 useSyncExternalStore (函数组件)

对于函数组件，React 18 提供了 `useSyncExternalStore` 钩子来实现同步状态：

```javascript
import { useSyncExternalStore } from 'react';

function MyComponent() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
  // …
}
```

### 6. 使用类组件的 forceUpdate

`forceUpdate` 会同步触发重新渲染：

```javascript
this.setState({ count: this.state.count + 1 });
this.forceUpdate(() => {
  console.log(this.state.count); // 会输出更新后的值
});
```

### 注意事项

1. **性能影响**：强制同步更新会破坏 React 的批量更新优化，可能导致性能问题
2. **React 18 变化**：在 React 18 中，即使是在 setTimeout 或原生事件中，`setState` 默认也是批量更新的
3. **设计考虑**：大多数情况下不需要同步状态，考虑是否可以通过其他方式解决需求
4. **函数组件**：在函数组件中，`useState` 的 setter 函数没有回调参数，可以使用 `useEffect` 替代

### 最佳实践

除非有特殊需求，否则建议遵循 React 的异步更新机制。如果需要依赖更新后的状态，推荐使用：

```javascript
// 类组件
this.setState(newState, () => {
  // 在这里使用更新后的状态
});

// 函数组件
const [state, setState] = useState(initialState);
useEffect(() => {
  // 在这里响应状态变化
}, [state]);
```

强制同步更新应该是最后的选择，因为它会破坏 React 的优化机制。
