---
tags: []
up:
related:
url: https://www.mianshipai.com/docs/second-exam/react-usage.html#react-%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E8%B0%83%E7%94%A8%E9%A1%BA%E5%BA%8F
created: 2025-06-11
modified: 2025-06-11
---

> 如上，函数组件的生命周期通过 `useEffect` 模拟

父子组件生命周期调用顺序调用顺序如下：

**挂载阶段**

- **父组件**：执行函数体（首次渲染）
- **子组件**：执行函数体（首次渲染）
- **子组件**：`useEffect`（挂载阶段）
- **父组件**：`useEffect`（挂载阶段）

**更新阶段**

- **父组件**：执行函数体（重新渲染）
- **子组件**：执行函数体（重新渲染）
- **子组件**：`useEffect` 清理函数（如果依赖项变化）
- **父组件**：`useEffect` 清理函数（如果依赖项变化）
- **子组件**：`useEffect`（如果依赖项变化）
- **父组件**：`useEffect`（如果依赖项变化）

**卸载阶段**

- **父组件**：`useEffect` 清理函数
- **子组件**：`useEffect` 清理函数
