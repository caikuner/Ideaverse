---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

React 的 **协调（Reconciliation）** 是用于高效更新 UI 的核心算法。当组件状态或属性变化时，React 会通过对比新旧虚拟 DOM（Virtual DOM）树，找出最小化的差异并应用更新。

1. **生成虚拟 DOM 树**
   - 当组件状态或属性变化时，React 会重新调用组件的 `render` 方法，生成新的 **虚拟 DOM 树** （一个轻量级的 JavaScript 对象，描述 UI 结构）。
   - 虚拟 DOM 是实际 DOM 的抽象表示，操作成本远低于直接操作真实 DOM。
2. **Diff 算法（差异对比）**：比较新旧两棵虚拟 DOM 树，找出需要更新的部分  
   详见 [[React：Diff 算法，并对比 Vue]]
3. **更新真实 DOM**
   - 通过 Diffing 算法找出差异后，React 将生成一系列 **最小化的 DOM 操作指令** （例如 `updateTextContent` 、 `replaceChild` ）。
   - 这些指令会被批量应用到真实 DOM 上，以减少重绘和重排的次数，提高性能

4. **协调的优化策略**
   - **Key 的作用**
     - 为列表元素提供唯一的 `key` ，帮助 React 识别元素的移动、添加或删除，避免不必要的重建。
     - [[React：循环中为何要使用 key]]
   - **批量更新（Batching）**
     - React 会将多个状态更新合并为一次渲染，减少重复计算。
     - [[React：batchUpdate 批量更新机制]]
   - 并发渲染（Concurrent Mode）：
     - 详见 [[React：Concurrency 并发机制]]
