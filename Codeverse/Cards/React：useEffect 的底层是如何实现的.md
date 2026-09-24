---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

### useEffect 的执行过程

useEffect 是 React 用于管理副作用的 Hook，它通过 Fiber 机制 **在 commit 阶段 统一执行**，确保副作用不会影响渲染。

**(1) useEffect 存储在 Fiber 节点上**

React 组件是通过 Fiber 数据结构 组织的，每个 useEffect 都会存储在 fiber.updateQueue 中。

**(2) useEffect 何时执行**

React 组件**更新后**，React 在 commit 阶段 统一遍历 effect 队列，并执行 useEffect 副作用。

React 使用 `useEffectEvent()` 注册 effect，在 commitLayoutEffect 之后，异步执行 useEffect，避免阻塞 UI 渲染。

**(3) useEffect 依赖变化的处理**

依赖数组的比较使用 `Object.is()`，只有依赖变化时才重新执行 useEffect。

在更新阶段，React 遍历旧 effect，并先执行清理函数，然后再执行新的 effect。

### 简化版 useEffect 实现

```js
function useEffect(callback, dependencies) {
  const currentEffect = getCurrentEffect(); // 获取当前 Fiber 节点的 Effect

  if (!Object.is(currentEffect.dependencies, dependencies)) {
    cleanupPreviousEffect(currentEffect); // 先执行上次 effect 的清理函数
    const cleanup = callback(); // 执行 useEffect 传入的回调
    currentEffect.dependencies = dependencies;
    currentEffect.cleanup = cleanup; // 存储清理函数
  }
}
```

相比 useLayoutEffect，useEffect 是 异步执行，不会阻塞 UI 渲染。
