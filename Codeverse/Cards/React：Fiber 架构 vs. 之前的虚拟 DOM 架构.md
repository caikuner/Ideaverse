---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

### **本质差异**

| 维度         | 普通 VNode（虚拟 DOM）          | Fiber 结构                           |
| ------------ | ------------------------------- | ------------------------------------ |
| **设计目标** | 减少真实 DOM 操作，提升渲染性能 | 实现可中断的异步渲染 + 优先级调度    |
| **数据结构** | 树形结构（递归遍历）            | 双向链表树（循环遍历）               |
| **功能范畴** | 仅描述 UI 结构                  | 描述 UI 结构 + 调度任务 + 副作用管理 |

### **节点数据结构对比**

- **普通 VNode（React 16-）**  
  **核心字段**：仅包含 UI 描述相关属性（type、props、children）。

```js
const vNode = {
  type: "div", // 节点类型（组件/原生标签）
  props: { className: "container" }, // 属性
  children: [vNode1, vNode2], // 子节点（树形结构）
  key: "unique-id", // 优化 Diff 性能
  // 无状态、调度、副作用信息
};
```

- **Fiber 节点（React 16+）\***  
  **核心扩展**：
  - **调度控制**：`lanes` 优先级、任务到期时间。
  - **状态管理**：Hooks 链表（函数组件）、类组件状态队列。
  - **副作用追踪**：`effectTag` 标记和副作用链表。
  - **遍历结构**：`child`/`sibling`/`return` 构成双向链表。

```js
const fiberNode = {
  tag: HostComponent, // 节点类型（函数组件/类组件/DOM元素）
  type: "div", // 原生标签或组件构造函数
  key: "unique-id", // Diff 优化标识
  stateNode: domNode, // 关联的真实 DOM 节点
  pendingProps: { className: "container" }, // 待处理的 props
  memoizedProps: {}, // 已生效的 props
  memoizedState: {
    // Hooks 状态（函数组件）
    hooks: [state1, effectHook],
  },
  updateQueue: [], // 状态更新队列（类组件）
  lanes: Lanes.HighPriority, // 调度优先级（Lane 模型）
  child: childFiber, // 第一个子节点
  sibling: siblingFiber, // 下一个兄弟节点
  return: parentFiber, // 父节点（构成双向链表）
  effectTag: Placement, // 副作用标记（插入/更新/删除）
  nextEffect: nextEffectFiber, // 副作用链表指针
};
```

### **协调机制对比**

| 流程           | VNode（Stack Reconciler） | Fiber Reconciler              |
| -------------- | ------------------------- | ----------------------------- |
| **遍历方式**   | 递归遍历（不可中断）      | 循环遍历链表（可中断 + 恢复） |
| **任务调度**   | 同步执行，阻塞主线程      | 异步分片，空闲时间执行        |
| **优先级控制** | 无                        | Lane 模型（31 个优先级车道）  |
| **副作用处理** | 统一提交 DOM 更新         | 构建副作用链表，分阶段提交    |

- **Fiber 两阶段提交**：
  1. **协调阶段**（可中断）：
     - 增量构建 Fiber 树，标记副作用（`effectTag`）。
     - 通过 `requestIdleCallback` 或 Scheduler 包分片执行。
  2. **提交阶段**（同步不可中断）：
     - 遍历副作用链表，执行 DOM 操作和生命周期方法。

### **能力扩展示例**

1. **支持 Hooks 状态管理**

- Fiber 节点通过 `memoizedState` 字段存储 Hooks 链表：

```js
// 函数组件的 Hooks 链表
fiberNode.memoizedState = {
  memoizedState: "state value", // useState 的状态
  next: {
    // 下一个 Hook（如 useEffect）
    memoizedState: { cleanup: fn },
    next: null,
  },
};
```

- VNode 无状态管理能力，仅描述 UI。

**2. 优先级调度实战**

- **高优先级任务抢占**：

````js
// 用户输入触发高优先级更新
input.addEventListener('input', () => {
  React.startTransition(() => {
	setInputValue(e.target.value) // 低优先级
  })
  // 高优先级更新立即执行
})
    ```

- VNode 架构无法实现任务中断和优先级插队。

**3. 副作用批处理**

- Fiber 通过 `effectList` 链表收集所有变更，统一提交：

```js
// 提交阶段遍历 effectList
let nextEffect = fiberRoot.firstEffect
while (nextEffect) {
  commitWork(nextEffect)
  nextEffect = nextEffect.nextEffect
}
````

- VNode 架构在 Diff 后直接操作 DOM，无批处理优化。

### **性能影响对比**

| 场景                      | VNode 架构         | Fiber 架构                   |
| ------------------------- | ------------------ | ---------------------------- |
| **大型组件树渲染**        | 主线程阻塞导致掉帧 | 分片渲染，保持 UI 响应       |
| **高频更新（如动画）**    | 多次渲染合并困难   | 基于优先级合并或跳过中间状态 |
| **SSR 水合（Hydration）** | 全量同步处理       | 增量水合，优先交互部分       |
