---
tags:
  - zettel
  - todo
  - fe/react
up:
related:
created: 2023-02-28
modified: 2025-07-22
---

TODO：  
[Why React Re-Renders](https://www.joshwcomeau.com/react/why-react-re-renders/)

## Body

1. react 为什么需要性能优化？为什么 react 提供了性能优化 API ^40b047
   - 从 DOM 更新的力度上讲，react 是应用级别，vue 是组件级别，solid 是元素级别
   - react 更新时，会重新创建一个树，从顶层 app 节点一直遍历到有 diff 子节点。如果没有任何 diff 优化，会重渲染这些所有节点，对于那些没有 diff 的节点来说，就是性能的浪费；
   - 这种遍历是 react 底层决定的，但是只要遍历到那些没有变化的节点，控制它们不去重新渲染，那么这种性能损耗勉强可以接受，这就是 react 的性能优化
   - 对比 vue： vue 是组件级别更新，内部自动控制组件的 diff， 只会定位到有 diff 的节点重新渲染
2. react 性能优化需要遵循的原则
   - 关键是区分好是否有 diff，只更新有 diff 的节点，就要：==将变的部分从不变的部分中分离，从而让不变的部分得到优化==
   - 变的部分
     - props （父组件传过来的）
     - state
     - context
   - 如果结构写的好（变与不变的组件相互分离），是不需要使用 api 优化的，demo：
     - demo1，只有子组件变，直接把变的子组件抽出来： <https://codesandbox.io/s/infallible-heisenberg-tbqu2e?file=/src/App.tsx>
     - demo2，父和某些子都变，把不变的子组件抽出来: <https://codesandbox.io/s/wizardly-zhukovsky-2jbuyb?file=/src/App.tsx>
   - 当父组件满足性能优化的条件，子组件才有可能得到优化 （props 不变）【必要不充分】
     - 就是说这是有传染性的，如果一个父节点无法命中性能优化，那他的所有子组件结构写的再好都没用
3. 性能优化背后的源码运行机制
   - react 如何比较 props？
     - 全等比较，高效，但不易命中，比如 props 如果为空： {} !== {} ，无法命中
     - 浅比较，不高效 (遍历比较所有 key-value)，但容易命中
     - react 源码用的是 全等比较，因此很容易使得一个组件提供的 props 不全等，导致他的所有子节点全部无法命中性能优化
     - 所以这时候需要性能优化 API：React.memo （useMemo），它会把 oldProps 缓存住，从而是自身全等比较，就可以命中
4. 如何对 react 项目做性能优化：
   1. 用 devtool 等工具找到项目中性能损耗严重的子树
   2. 对子树的根节点使用性能优化 API，是该子树满足必要条件：props 不变
   3. 对子树的节点运用“变与不变相分离”的原则，使不变的部分命中性能优化

## References 🔗

- [「上集」React性能优化，你需要知道的一切\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1Yr4y1J7oc/?spm_id_from=333.999.0.0&vd_source=202346755f1b2292405b3321de1dfb27)
- [「下集」React性能优化，你需要知道的一切\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1j44y1g74m/?spm_id_from=pageDriver&vd_source=202346755f1b2292405b3321)

## Related 💭

🏷tags: #zettel #on  
👈backlinks: [[+Zettelkasten MOC]]  
👉links:
