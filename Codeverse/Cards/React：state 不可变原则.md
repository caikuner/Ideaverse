---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-11
---

### **状态（state）的不可变性**

在 React 中，**状态（state）的不可变性** 是指：  
不能直接修改状态的值，而是需要创建一个新的值来替换旧的状态。

这是 React 数据的核心原则。

### 使用不可变数据的好处

#### **性能优化**

React 是使用浅比较（shallow comparison）来检测状态是否发生变化。  
再对比对象类型的数据时，如果状态是不可变的，React **只需要比较引用（即内存地址）是否变化，而不需要深度遍历整个对象或数组**。

#### **可预测性**

- 不可变数据使得状态的变化更加可预测和可追踪。
- 每次状态更新都会生成一个新的对象或数组，这样可以更容易地调试和追踪状态的变化历史。

#### **避免副作用**

- 直接修改状态可能会导致意外的副作用，尤其是在异步操作或复杂组件中。
- 不可变数据确保了状态的更新是纯函数式的，避免了副作用。

### 如何实现不可变数据？

#### **更新对象时使用新的对象**

```jsx
// ❌ 错误：直接修改状态
state.name = 'new name'
setState(state)
```

```jsx
// ✅ 正确：创建新对象
setState({
  …state, // 复制旧状态
  name: 'new name', // 更新属性
})
```

#### **更新数组时使用新的数组**

```jsx
// ❌ 错误：直接修改数组
state.items.push(newItem)
setState(state)
```

```jsx
// ✅ 正确：创建新数组
setState({
  …state,
  items: […state.items, newItem], // 添加新元素
})
```

#### **使用工具库简化不可变更新操作**

常用的库有：

- **Immer.js**  
[Immer](https://immerjs.github.io/immer/) 是一个流行的库，它允许你以可变的方式编写代码，但最终生成不可变的数据。

```jsx
import produce from 'immer'

setState(
  produce(state, (draft) => {
    draft.user.profile.name = 'new name' // 直接修改
    draft.items.push(newItem) // 直接修改
  })
)
```

- **Immutable.js**

[Immutable.js](https://immutable-js.com/) 提供了不可变的数据结构（如 `List`、`Map` 等），可以更方便地处理不可变数据。

```jsx
import { Map } from 'immutable'

const state = Map({ name: 'John', age: 30 })
const newState = state.set('name', 'Jane')
```
