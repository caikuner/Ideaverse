---
tags: []
up:
related:
created: 2025-07-03
modified: 2025-07-03
---

以下是对 React 原理更为详细的展开讲解，结合文档中提及的并发模式、Fiber 架构、Hook 机制等核心内容，从原理逻辑、实现细节和关键流程进行深度拆解：

### 一、并发模式（Concurrency Mode）：任务调度的优先级控制

#### 1. **核心目标与背景**

- **解决问题**：传统同步渲染（如 React 15 及之前）会阻塞主线程，导致动画卡顿、交互延迟。
- **核心思想**：将渲染任务拆分为可中断的单元，允许高优先级任务（如用户输入）插队执行。

#### 2. **关键实现机制**

- **时间切片（Time Slicing）**
  - 通过 `requestIdleCallback` 分配浏览器空闲时间执行渲染任务，每次执行不超过 50ms（避免掉帧）。
  - 示例：

    ```js
    // React 内部实现简化逻辑
    function workLoop() {
      while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
      }
      // 时间用尽则中断，下次继续
    }
    ```

- **优先级模型（Lane 模型）**
  - 用 31 位二进制数表示任务优先级（如 `NoLane`、`InputContinuousLane`），不同优先级可合并或中断。
  - 优先级排序：紧急交互（如输入） > 动画 > 普通更新 > 后台任务。
- **任务队列（TaskQueue）**
  - 维护一个按优先级排序的队列，每次从队列中取出最高优先级任务执行。
  - 高优先级任务插入时，会中断低优先级任务的执行（如用户点击按钮时，中断列表渲染）。

#### 3. **并发与中断的区别**

- **并发**：多个任务交替执行，不销毁已执行状态（如任务 A 执行到一半，切换到任务 B，再切回任务 A 继续）。
- **中断**：低优先级任务被取消，状态不保留（如任务 A 被中断后，重新执行时需从头开始）。

### 二、Fiber 架构：从递归到链表的革命性重构

#### 1. **三大核心节点对象**

- **FiberRootNode**
  - 每个 React 应用唯一的根节点，存储应用级状态（如 `current` 指向当前 Fiber 树）。
  - 负责协调整个更新流程，关联 `updateQueue` 管理更新任务。
- **Fiber 节点**
  - **核心属性**：
    - `tag`：标记节点类型（如函数组件、类组件、DOM 元素）。
    - `stateNode`：指向实际的 DOM 节点或组件实例。
    - `return`：父节点，形成链表结构。
    - `child`：子节点，`sibling`：兄弟节点，构成树状链表。
    - `effectTag`：副作用标记（如 `Update`、`Delete`、`Placement`）。
  - **作用**：替代传统递归栈，记录组件渲染状态，支持中断和恢复。
- **workInProgress Fiber**
  - 双缓冲机制：每次更新时，基于当前 Fiber 树创建新的 `workInProgress` 树。
  - 节点复用：通过 `alternate` 指针共享旧树节点的数据，减少内存分配。

#### 2. **Fiber 树的构建流程**

1. **初始构建（Mounting）**
   - 从 `FiberRootNode` 开始，递归创建组件对应的 Fiber 节点。
   - 示例：`App` 组件 → `div` 元素 → `span` 元素，形成树结构：

     ```
     FiberRootNode
       └─ AppFiber（函数组件）
         └─ divFiber（DOM 元素）
           └─ spanFiber（DOM 元素）
     ```

2. **更新构建（Updating）**
   - 通过 `reconcileChildFibers` 对比新旧节点，生成新的 `workInProgress` 树。
   - 关键函数：
     - `reconcileSingleElement`：处理单个元素节点的更新。
     - `reconcileChildrenArray`：处理数组子节点，通过 `key` 识别节点身份。

#### 3. **工作循环（workLoopConcurrent）**

- **核心逻辑**：
  1. 从 `workInProgress` 节点开始处理，执行 `beginWork` 计算节点变化。
  2. 遇到 `shouldYield()`（时间用尽）则中断，保存当前 `workInProgress` 状态。
  3. 浏览器空闲时继续执行，直到所有节点处理完毕，进入 `commit` 阶段。
- **与同步渲染的对比**：
  - 同步渲染：递归到底，无法中断（如 React 15 的 `stackReconciler`）。
  - Fiber 渲染：链表遍历，可中断恢复（如 React 16+ 的 `fiberReconciler`）。

### 三、Hook 原理：状态与副作用的闭环管理

#### 1. **Hook 的本质与设计原则**

- **本质**：通过闭包和链表机制，在函数组件中模拟类组件的生命周期和状态管理。
- **设计原则**：
  - **顺序规则**：Hook 必须在组件顶层按顺序调用，确保链表结构稳定。
  - **闭包保存状态**：每次渲染时，Hook 的状态通过闭包引用旧状态。

#### 2. **核心数据结构与流程**

- **Hook 链表**
  - 每个组件的 Hook 形成环形链表，通过 `next` 指针连接。
  - 示例：`useState` → `useEffect` → `useState`，链表结构：

    ```
    Hook1 → Hook2 → Hook3 → Hook1（环形）
    ```

- **初始化流程（mount 阶段）**
  1. `renderWithHooks` 调用，创建 `currentHook` 指向链表头部。
  2. 执行 `useState(initialValue)` 时：
     - 创建 `updateQueue`（存储更新函数）。
     - 返回 `[state, dispatchSetState]`，其中 `dispatchSetState` 闭包引用 `updateQueue`。
  3. 执行 `useEffect(create, deps)` 时：
     - 创建 `effect` 对象，存入 `fiber.updateQueue`，在 `commit` 阶段执行。
- **更新流程（update 阶段）**
  1. 组件重新渲染，按顺序遍历旧 Hook 链表，复用节点。
  2. `useState` 读取 `baseState`（未被处理的更新状态）和 `baseQueue`（更新队列）。
  3. `dispatchSetState` 触发时，向 `queue.pending` 中添加更新，形成环形链表，标记组件需要重新渲染。

#### 3. **Effect Hook 的执行时机**

- **阶段划分**：
  1. **render 阶段**：计算 effect 依赖，存入 `fiber.updateQueue`。
  2. **commit 阶段**：DOM 更新完成后，按顺序执行 `useEffect` 的 `create` 函数（或清除旧 effect 的 `destroy` 函数）。
- **优化机制**：通过依赖数组（`deps`）判断是否需要更新 effect，避免无效执行。

### 四、Diff 算法：高效更新的核心策略

#### 1. **同级比较原则**

- **核心思想**：只比较同一层级的节点，避免跨层级递归，时间复杂度从 O(n³) 优化到 O(n)。
- **示例**：

  ```jsx
  <!-- 旧结构 -->
  <div>
    <p>1</p>
    <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  </div>

  <!-- 新结构 -->
  <div>
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
    </ul>
    <p>1</p>
  </div>
  ```

  - Diff 只会比较 `div` 下的子节点（`p` 和 `ul`），不会对比 `p` 和 `li` 的层级。

#### 2. **节点更新策略**

- **类型判断**：
  - 节点类型不同（如 `div` → `p`）：直接删除旧节点，创建新节点。
  - 节点类型相同（如 `div` → `div`）：复用节点，更新属性。
- **Key 的作用**：
  - 用于标识节点身份，避免因顺序变化导致的错误复用。
  - **反例**：使用索引作为 key（如 `{items.map((item, index) => <li key={index}>}</li>)`），当数组插入元素时，后面的节点会被错误复用，导致状态丢失。

#### 3. **核心函数解析**

- `reconcileChildFibers`：协调子节点，根据不同情况调用以下函数：
  - `reconcileSingleElement`：处理单个元素（如 `<div key="a" />`）。
  - `reconcileSingleFragment`：处理 Fragment 节点（如 `<></>`）。
  - `reconcileChildrenArray`：处理数组子节点，通过 `key` 匹配新旧节点。

### 五、事件系统：合成事件与事件委托的底层实现

#### 1. **合成事件（SyntheticEvent）**

- **设计目标**：跨浏览器兼容，统一事件处理接口（如 `e.preventDefault()`）。
- **实现原理**：
  - 原生事件触发时，通过事件插件（如 `SimpleEventPlugin`）转换为合成事件。
  - 事件池机制：复用事件对象，减少内存分配，调用 `e.persist()` 可阻止回收。

#### 2. **事件委托与冒泡机制**

- **绑定方式**：
  - 将所有事件委托到根节点（如 `document`），通过事件冒泡机制分发。
  - 示例：点击 `button` 元素时，事件冒泡到 `document`，React 根据事件类型和组件层级找到对应的事件处理函数。
- **事件流程**：
  1. 原生事件触发 → 2. 事件插件转换为合成事件 → 3. 放入事件池 → 4. 执行组件事件处理函数 → 5. 释放事件池中的对象。

#### 3. **事件优先级处理**

- 并发模式下，交互事件（如 `onClick`）具有高优先级，可中断低优先级渲染任务，确保响应性。

### 六、核心流程总结：从更新到渲染的完整链路

1. **更新触发**：`setState`、`dispatch` 或 `forceUpdate` 触发更新。
2. **任务调度**：根据更新类型确定优先级，加入 `taskQueue`。
3. **Fiber 调和（Reconciliation）**：
   - 构建 `workInProgress` 树，对比新旧节点，生成副作用（`effectTag`）。
   - 可中断的并发渲染，优先处理高优先级任务。
4. **提交（Commit）**：
   - 执行副作用（如 DOM 更新、`useEffect`），不可中断。
5. **渲染完成**：组件更新完毕，等待下一次更新。

### 七、面试高频问题与原理关联

1. **为什么 React 16 要引入 Fiber 架构？**
   - 答：解决同步渲染阻塞主线程的问题，实现可中断的并发渲染，提升交互响应性。

2. **Hook 为什么不能在条件语句中调用？**
   - 答：违反顺序规则，会导致 Hook 链表结构混乱，无法正确复用旧状态。

3. **React 事件系统为什么要用合成事件？**
   - 答：兼容跨浏览器差异，实现事件池复用，提升性能，并统一事件处理接口。

通过以上深度拆解，可清晰理解 React 原理中各模块的设计目标、实现细节和关联逻辑，从而在开发中更高效地应用和优化 React 应用。
