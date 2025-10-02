---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-11
---

React 官方文档其实对这个问题进行了 [[https://zh-hans.react.dev/reference/react/useEffect#my-effect-runs-twice-when-the-component-mounts]] ：

在开发环境下，如果开启严格模式，React 会在实际运行 setup 之前额外运行一次 setup 和 cleanup。

这是一个压力测试，用于验证 Effect 的逻辑是否正确实现。如果出现可见问题，则 cleanup 函数缺少某些逻辑。cleanup 函数应该停止或撤消 setup 函数所做的任何操作。一般来说，用户不应该能够区分 setup 被调用一次（如在生产环境中）和调用 setup → cleanup → setup 序列（如在开发环境中）。

借助严格模式的目标是帮助开发者提前发现以下问题：

1. 不纯的渲染逻辑：例如，依赖外部状态或直接修改 DOM。
2. 未正确清理的副作用：例如，未在 useEffect 的清理函数中取消订阅或清除定时器。
3. 不稳定的组件行为：例如，组件在多次挂载和卸载时表现不一致。

通过强制组件挂载和卸载两次，React 可以更好地暴露这些问题。
