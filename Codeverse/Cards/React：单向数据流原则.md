---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-11
---

在 React 中，props（属性）是从父组件传递给子组件的数据，子组件不应该直接修改接收到的 props。

React 遵循**单向数据流**的设计模式：

- 数据只能从父组件流向子组件
- 子组件不能直接修改父组件传递的 props
- 如果需要修改，应该通过回调函数通知父组件

```jsx
// 正确做法：通过回调让父组件修改
function Child({ value, onChange }) {
  return <button onClick={() => onChange(value + 1)}>增加</button>;
}

function Parent() {
  const [value, setValue] = useState(0);
  return <Child value={value} onChange={setValue} />;
}
```

保持 props 不可变可以：

- 使组件行为更加可预测
- 更容易追踪数据变化来源
- 简化调试过程（知道数据只在父组件被修改）

如果需要 " 修改 "props 中的数据：

1. **提升状态**：将状态提升到共同的父组件
2. **使用回调**：通过父组件提供的回调函数间接修改
3. **复制数据**：如果需要修改数据副本，应该先深拷贝

```jsx
// 正确：先复制再修改
function Child({ items }) {
  const localItems = […items]; // 创建副本
  localItems.push('new item');  // 修改副本

  return <List items={localItems} />;
}
```

记住：**Props 应该是只读的**，这是 React 组件设计的基本原则之一。
