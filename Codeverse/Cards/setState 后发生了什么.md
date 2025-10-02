---
tags: []
up:
related:
created: 2025-07-01
modified: 2025-07-01
---

> 函数组件中 `useState` 后的更新流程
> 调度更新：新对象，入 hokks 更新队列，标记 re，加入调度器队列；
> 异步渲染：从根协调，重新执行函数组件，调用 hooks，得到新的树。diff：key，层，类型，移动
> 同步提交：计算 DOM 变更，应用，useLayoutEffect，浏览器重绘（渲染 dom 变更），useEffect

当你在函数组件中调用 `useState` 返回的 setter 函数（如 `setCount`）时，React 会触发以下更新流程：

## 1. 调度更新阶段

- **创建更新对象**：React 会创建一个更新对象（Update）包含新的状态值或更新函数
- **将更新加入队列**：将该更新加入对应 Hook 的更新队列中（每个 Hook 都有自己的更新队列）
- **标记组件需要更新**：React 标记该函数组件需要重新渲染
- **调度渲染工作**：React 将渲染工作加入调度器（Scheduler）队列

## 2. 渲染阶段（Render Phase）异步

- **开始协调过程**：React 从根节点开始协调整个组件树
- **处理函数组件**：
  - 调用函数组件本身（重新执行函数体）
  - 再次调用所有 Hook（但会保留它们的状态和队列）
  - 对于 `useState`：
    - 遍历并处理所有排队的状态更新
    - 计算最终的状态值
    - 返回最新的状态值和 setter 函数
  - **生成新的虚拟 DOM 树**
    - 当组件状态或属性变化时，React 会重新调用组件的 `render` 方法，生成新的 **虚拟 DOM 树
    - Diff 算法（差异对比）**：比较新旧两棵虚拟 DOM 树，找出需要更新的部分，打上更新标记
        详见 [[React：Diff 算法，并对比 Vue]]

## 3. 提交阶段（Commit Phase）同步

- **准备 DOM 更新**：React 计算需要进行的 DOM 变更
- **执行 DOM 操作**：实际应用所有 DOM 变更
- **执行布局副作用**：（dom 更新后，浏览器绘制之前）
  - 同步执行 `useLayoutEffect` 的清理函数（如果依赖项变化）
  - 同步执行 `useLayoutEffect` 的新 effect
- **浏览器重绘**：浏览器会在下一个渲染帧处理这些 DOM 变更，重新绘制屏幕 （raq，同步任务），
- **调度被动副作用**：
  - 异步调度 `useEffect` 的清理函数（如果依赖项变化）
  - 异步调度 `useEffect` 的新 effect

## 关键细节

1. **批量更新**：在事件处理函数或生命周期中的多个 `setState` 会被批量处理

   ```jsx
   const handleClick = () => {
     setCount(c => c + 1);  // 不会立即更新
     setCount(c => c + 1);  // 与上一个合并
   }
   ```

2. **更新队列处理**：如果对同一个状态多次调用 setter，更新会按顺序处理

   ```jsx
   setCount(1);
   setCount(c => c + 2);  // 基于前一个更新计算
   ```

3. **闭包陷阱**：由于函数组件每次渲染都是独立的闭包，需要注意过时闭包问题
4. **性能优化**：React 使用 Fiber 架构可以中断和恢复渲染过程

## 与类组件的主要区别

1. **没有实例**：函数组件没有 `this`，状态存储在 Hook 的闭包中
2. **每次渲染独立**：每次渲染都有独立的 props 和 state
3. **更细粒度的更新**：可以单独更新某个状态而不影响其他状态

## 示例流程

```jsx
function Counter() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(prev => prev + 1);  // 1. 创建更新
    setCount(prev => prev + 1);  // 2. 加入队列
  };
  
  return <button onClick={handleClick}>{count}</button>;
}
```

1. 点击按钮触发 `handleClick`
2. 两个更新被加入 `count` 的更新队列
3. React 调度重新渲染
4. 在下次渲染时，React 按顺序处理更新队列
5. 最终 `count` 会增加 2
6. 组件使用新值重新渲染
