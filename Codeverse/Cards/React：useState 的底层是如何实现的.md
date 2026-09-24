---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

useState` 是 React Hooks 的核心 API 之一，它的底层实现依赖于 **Fiber 架构** 和 **闭包 + 链表存储** 的机制。以下是其核心实现逻辑：

## **1. 基本流程**

当函数组件调用 `useState` 时，React 会：

1. **检查当前 Fiber 节点**：确定是初次渲染还是更新。
2. **读取/更新状态**：
   - 初次渲染：初始化状态，存入 Fiber 节点的 `memoizedState` 链表。
   - 更新阶段：从链表中取出最新状态，并触发重新渲染。
3. **返回状态和更新函数**：`[state, setState]`。

---

## **2. 核心数据结构**

### **(1) Fiber 节点中的 Hooks 链表**

每个函数组件的 Hooks（如 `useState`、`useEffect`）以 **链表形式** 存储在 Fiber 节点的 `memoizedState` 属性上：

```ts
interface FiberNode {
  memoizedState: Hook | null; // Hooks 链表头
  // 其他属性…
}

interface Hook {
  memoizedState: any; // 当前状态（如 `useState` 的值）
  baseState: any; // 基础状态（用于更新计算）
  queue: UpdateQueue<any>; // 更新队列（存放 setState 的调用）
  next: Hook | null; // 指向下一个 Hook
}

interface UpdateQueue<T> {
  pending: Update<T> | null; // 待处理的更新
}

interface Update<T> {
  action: T | ((prevState: T) => T); // setState 的参数
  next: Update<T> | null; // 下一个更新
}
```

### **(2) 当前正在渲染的 Fiber**

React 通过全局变量 `currentlyRenderingFiber` 跟踪当前组件对应的 Fiber 节点，确保 Hooks 能正确绑定到组件。

---

## **3. 详细步骤**

### **阶段 1：初次渲染（Mount）**

1. **调用 `useState`**：

   ```js
   const [count, setCount] = useState(0);
   ```

2. **创建 Hook 对象**：
   - 新建一个 Hook 节点，初始化 `memoizedState` 为 `0`（初始值）。
   - 将 Hook 添加到 Fiber 的 `memoizedState` 链表尾部。
3. **返回状态和更新函数**：
   - `count` 直接取自 Hook 的 `memoizedState`。
   - `setCount` 是一个闭包函数，内部会触发更新调度。

### **阶段 2：更新（Update）**

1. **调用 `setCount`**：

   ```js
   setCount((prev) => prev + 1);
   ```

2. **创建更新对象**：
   - 将更新（`action`）放入 Hook 的 `queue.pending` 队列（链表结构）。
3. **调度重新渲染**：
   - 标记 Fiber 节点需要更新，触发 React 的调度流程。
4. **下次渲染时计算新状态**：
   - 遍历 `queue.pending`，依次执行更新函数，得到最新状态。
   - 更新 Hook 的 `memoizedState`。

---

## **4. 关键代码（简化版）**

```js
// 伪代码：ReactHooks.js
let currentlyRenderingFiber: FiberNode | null = null;
let workInProgressHook: Hook | null = null;

function useState<T>(initialState: T): [T, (action: T | ((prev: T) => T)) => void] {
  // 1. 获取当前 Fiber 和 Hook 链表
  const fiber = currentlyRenderingFiber;
  let hook: Hook;

  if (fiber.memoizedState === null) {
    // 初次渲染：创建新 Hook
    hook = {
      memoizedState: initialState,
      queue: { pending: null },
      next: null,
    };
    fiber.memoizedState = hook;
  } else {
    // 更新：从链表中取出 Hook
    hook = fiber.memoizedState;
  }

  // 2. 计算新状态（如果有待处理更新）
  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;
    let update = firstUpdate;
    do {
      if (typeof update.action === 'function') {
        baseState = update.action(baseState);
      } else {
        baseState = update.action;
      }
      update = update.next;
    } while (update !== firstUpdate);
    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  // 3. 返回状态和更新函数
  const dispatch = (action) => {
    const update = { action, next: null };
    if (hook.queue.pending === null) {
      update.next = update; // 环形链表
    } else {
      update.next = hook.queue.pending.next;
      hook.queue.pending.next = update;
    }
    hook.queue.pending = update;
    // 触发重新渲染（调度更新）
    scheduleWork(fiber);
  };

  return [baseState, dispatch];
}
```

---

## **5. 核心特性**

### **(1) 闭包保存状态**

- `setCount` 是一个闭包函数，持有对当前 Hook 节点的引用，因此能准确更新对应状态。

### **(2) 批量更新（Batching）**

- 多次 `setState` 会被合并（如事件处理函数中的连续调用），仅触发一次重新渲染。

### **(3) 更新队列（Update Queue）**

- 更新以环形链表存储，确保顺序执行（即使是异步更新）。

### **(4) 为什么 Hooks 不能条件调用？**

- Hooks 的调用顺序决定了它们在链表中的位置。如果条件分支导致顺序变化，链表会错乱。

---

## **6. 与 Class 组件 `setState` 的区别**

| **特性**     | **`useState` (Hooks)** | **`this.setState` (Class)**   |
| ------------ | ---------------------- | ----------------------------- |
| **存储方式** | 链表（每个 Hook 独立） | 合并对象（统一 `this.state`） |
| **更新机制** | 闭包 + 队列            | 浅合并 + 批量更新             |
| **触发时机** | 每次渲染独立捕获状态   | 实例生命周期内共享状态        |

---

## **7. 总结**

- **底层依赖**：Fiber 节点的 `memoizedState` 链表 + 闭包。
- **更新流程**：`setState` → 放入队列 → 调度渲染 → 计算新状态。
- **设计目标**：函数组件中实现类组件的状态能力，同时支持并发渲染。

通过这一机制，`useState` 在函数组件中实现了 **持久化状态** 和 **按需更新**，成为 React Hooks 的基石。
