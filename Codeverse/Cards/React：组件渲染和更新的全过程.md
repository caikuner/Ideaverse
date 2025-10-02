---
tags: []
up: 
related: 
created: 2025-06-12
modified: 2025-06-12
---

React 组件的渲染和更新过程涉及多个阶段，包括：
1. **初始化阶段**：创建 Fiber 树和 Hooks 链表。
2. **渲染阶段**：生成新的虚拟 DOM（Fiber 树）。
3. **协调阶段**：对比新旧 Fiber 树，找出需要更新的部分。
4. **提交阶段**：将更新应用到真实 DOM。
5. **清理阶段**：重置全局变量，清理副作用，准备下一次更新。

### 1.初始化阶段

- **触发条件**：组件首次渲染或状态/属性更新。
- **关键函数**：`render`、`createRoot`、`scheduleUpdateOnFiber`。
- **逻辑**：
    1. 通过 `ReactDOM.render` 或 `createRoot` 初始化应用。
    2. 创建根 Fiber 节点（`HostRoot`）和 Hooks 链表。
    3. 调用 `scheduleUpdateOnFiber`，将更新任务加入调度队列。

### 2.渲染阶段

- **触发条件**：调度器开始执行任务。
- **关键函数**：`performSyncWorkOnRoot`、`beginWork`、`renderWithHooks`。
- **逻辑**：
    1. 调用 `performSyncWorkOnRoot`，开始渲染任务。
    2. 调用 `beginWork`，递归处理 Fiber 节点。
    3. 对于函数组件，调用 `renderWithHooks`，执行组件函数并生成新的 Hooks 链表。
    4. 对于类组件，调用 `instance.render`，生成新的虚拟 DOM。
    5. 对于 Host 组件（如 `div`），生成对应的 DOM 节点。
    6. 最终，生成新的虚拟 DOM（Fiber 树）

### 3.协调阶段

- **触发条件**：新的虚拟 DOM 生成后。
- **关键函数**：`reconcileChildren`、`diff`。
- **逻辑**：
    1. 调用 `reconcileChildren`，对比新旧 Fiber 树。
    2. 根据 `diff` 算法，找出需要更新的节点。
    3. 为需要更新的节点打上 `Placement`、`Update`、`Deletion` 等标记。

### 4.提交阶段

- **触发条件**：协调阶段完成后。
- **关键函数**：`commitRoot`、`commitWork`。
- **逻辑**：
    1. 调用 `commitRoot`，开始提交更新。
    2. 调用 `commitWork`，递归处理 Fiber 节点。
    3. 根据节点的标记，执行 DOM 操作（如插入、更新、删除），将更新应用到真实 DOM。
    4. 调用组件渲染/更新完成生命周期钩子（如 `componentDidMount`、`componentDidUpdate`）。

### 5.清理阶段

- **触发条件**：提交阶段完成后。
- **关键函数**：`resetHooks`、`resetContext`。
- **逻辑**：
    1. 重置全局变量（如 `currentlyRenderingFiber`、`currentHook`）。
    2. 清理上下文和副作用。
    3. 准备下一次更新。
