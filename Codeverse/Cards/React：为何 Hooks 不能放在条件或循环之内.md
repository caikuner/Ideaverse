---
tags: []
up:
related:
created: 2025-06-12
modified: 2025-06-12
---

组件中的 hook 会以链表的形式串起来，在初始化阶段，保存在 FiberNode 的 memoizedState，指向 Hooks 链表中的第一个 Hook。

在更新时，会复用之前的 Hook。如果使用了条件或循环语句，增加或者删除 hooks，在复用 hooks 过程中，会产生复用 hooks 状态和当前 hooks 不一致的问题。
