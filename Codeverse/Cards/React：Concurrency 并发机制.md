---
tags: []
up:
related:
companies:
created: 2025-06-12
modified: 2025-06-19
---

> 相似问题：React 的并发机制; 为什么能够在空闲时执行低优先级任务

## 什么是 React 的并发机制

React 的并发机制（Concurrency）是 React 18 引入的一项重要特性， 允许 React 在渲染阶段 (render) 中**根据任务的优先级进行调度和中断**，从而确保高优先级的更新能够及时渲染，而不会被低优先级的任务阻塞。

## 并发机制的工作原理

- **时间分片（Time Slicing）：** React 将渲染任务拆分为多个小片段，每个片段在主线程空闲时执行。这使得浏览器可以在渲染过程中优先处理用户输入和其他高优先级任务，避免长时间的渲染阻塞用户交互。
- **优先级调度（Priority Scheduling）：** React 为不同的更新分配不同的优先级。高优先级的更新（如用户输入）会被优先处理，而低优先级的更新（如数据预加载）可以在空闲时处理。
- **可中断渲染（Interruptible Rendering）：** 在并发模式下，React 可以中断当前的渲染任务，处理更高优先级的任务，然后再恢复之前的渲染。这确保了应用在长时间渲染过程中仍能保持响应性。

### 1. Fiber 架构 + 时间切片（Time Slicing）

React 的 **Fiber 架构** 和 **调度器（Scheduler）** 共同实现了任务的可中断、恢复和优先级控制。

#### (1) Fiber 的链表结构

- Fiber 是 **双向链表**（非递归遍历），每个节点保存了组件信息、优先级和任务状态。
- **关键特性**：
  - **可中断**：React 可以暂停当前任务，处理更高优先级的任务（如用户交互）。
  - **恢复执行**：通过 `alternate` 指针保留任务上下文。

#### (2) 时间切片（Time Slicing）

- React 将渲染任务拆分为 **5ms 左右的小块**（避免阻塞主线程），每个片段在主线程空闲时执行。
- 会在 **浏览器空闲期（Idle Period）** 执行低优先级任务：

```js
// 伪代码：React 调度逻辑
// `deadline.timeRemaining()` 表示当前帧剩余时间。
// 如果时间不足，React 会暂停任务并等待下一次空闲。
function workLoop(deadline) {
  while (currentTask && deadline.timeRemaining() > 0) {
    // 执行任务块
    performUnitOfWork(currentTask);
  }

  if (currentTask) {
    // 如果时间不够，请求下一次空闲回调
    requestIdleCallback(workLoop);
  }
}
requestIdleCallback(workLoop);
```

### **2. 优先级调度（Lane Model）**

React 使用 **车道模型（Lane Model）** 管理任务优先级：

| **优先级**        | **场景**             | **调度方式**                    |
| ----------------- | -------------------- | ------------------------------- |
| **Immediate**     | 用户输入、动画       | 同步执行（不可中断）            |
| **User-blocking** | 点击、拖动           | 微任务（Promise）               |
| **Normal**        | 普通状态更新         | 时间切片（requestIdleCallback） |
| **Low**           | 数据预加载、日志上报 | 空闲时执行                      |
| **Idle**          | 完全不紧急的任务     | 最低优先级                      |

- **高优先级任务** 会打断 **低优先级任务**（如用户点击时暂停渲染）。

### **3. 空闲调度底层实现**

React 底层依赖浏览器 API 实现空闲调度：

#### **(1) `requestIdleCallback`（原始方案）**

**`window.requestIdleCallback()`**方法将在浏览器的空闲时段内调用的函数排队。

- 浏览器在空闲时触发回调：

  ```js
  requestIdleCallback((deadline) => {
    while (deadline.timeRemaining() > 0) {
      // 执行低优先级任务
    }
  });
  ```

- **问题**：兼容性和触发频率不稳定。

#### **(2) React 的自定义调度器（Scheduler）**

- React 实现了 **polyfill 版调度器**，模拟 `requestIdleCallback`：
  - 基于 `MessageChannel` 或 `setTimeout` 分片任务。
  - 更精确控制任务优先级和超时。

## 并发机制的优势

- **提升响应性：** 通过优先处理高优先级任务，React 能够更快地响应用户输入，提升用户体验。
- **优化性能：** 将渲染任务拆分为小片段，避免长时间的渲染阻塞，提升应用的整体性能。
- **更好的资源利用：** 在主线程空闲时处理低优先级任务，充分利用系统资源。

## 如何启用并发模式

- 在 React18+ 中， 使用 `createRoot` API，应用会自动启用并发模式
- 在并发模式下，React 会自动根据任务的优先级进行调度和渲染。

```javascript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
```

## 实际应用场景

### **(1) 并发模式（Concurrent Mode）**

```jsx
// 低优先级更新（可能被高优先级任务打断）
const [data, setData] = useState(null);
useEffect(() => {
  fetchData().then((res) => {
    // 使用 startTransition 标记低优先级
    startTransition(() => {
      setData(res);
    });
  });
}, []);
```

### **(2) 后台预加载**

```jsx
// 空闲时预加载组件
const OtherComponent = React.lazy(() => import("./OtherComponent"));

// 空闲时预加载数据
useEffect(() => {
  if (isIdle) {
    prefetchData();
  }
}, []);
```

## 为什么 Vue 不能这样做？

- **架构差异**：
  - Vue 的响应式更新是 **同步的**（依赖微任务批量更新）。
  - React Fiber 是 **异步可中断的**（链表结构 + 优先级调度）。
- **设计目标**：
  - Vue 追求 **简单高效的 DOM 更新**。
  - React 追求 **复杂交互的并发控制**。

## **总结**

| **技术**                | **作用**                                                 |
| ----------------------- | -------------------------------------------------------- |
| **Fiber 架构**          | 链表结构支持任务中断/恢复。                              |
| **时间切片**            | 将任务拆分为小块，避免阻塞主线程。                       |
| **优先级调度**          | Lane 模型管理任务优先级（高优先级打断低优先级）。        |
| **requestIdleCallback** | 利用浏览器空闲期执行任务（React 使用自定义调度器优化）。 |

**核心思想**：
React 通过 **任务分片 + 优先级调度**，在浏览器空闲时执行低优先级任务，同时保证高优先级任务（如用户交互）的即时响应。
