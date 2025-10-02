---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-12
---


Redux 是一个用于 JavaScript 应用程序的可预测状态管理容器，它帮助开发者管理应用的全局状态。下面我将从核心概念、工作流程和实现原理几个方面来讲解 Redux 的原理。

## 三个核心概念

### 1. Store (存储)

- 存储整个应用的状态树
- 一个应用只有一个 Store
- 提供 `getState()` 方法获取当前状态
- 提供 `dispatch(action)` 方法更新状态
- 提供 `subscribe(listener)` 方法注册监听器

### 2. Action (动作)

- 描述发生了什么的对象
- 是改变 State 的唯一途径
- 必须包含 `type` 属性表示动作类型
- 通常由 Action Creator 函数创建

```javascript
const addTodo = (text) => ({
  type: 'ADD_TODO',
  payload: { text }
});
```

### 3. Reducer (纯函数)

- 指定应用状态如何响应 action 变化
- 是纯函数，接收旧 state 和 action，返回新 state
- 不应该直接修改 state，而是返回新对象
- 可以组合多个 reducer 来管理复杂状态

```javascript
function todos(state = [], action) {
  switch(action.type) {
    case 'ADD_TODO':
      return […state, action.payload];
    default:
      return state;
  }
}
```

## 设计原则

1. **单一数据源**：整个应用的状态存储在一个对象树中
2. **State 是只读的**：唯一改变 state 的方法是触发 action
3. **使用纯函数执行修改**：Reducer 必须是纯函数，没有副作用

## 工作流程

```
View -> Action -> Reducer -> State -> View
```

1. **View** ：用户在界面（View）上触发一个事件（如点击按钮）
2. **Action** ：事件触发一个 `action` ，并通过 `store.dispatch(action)` 分发
3. **Reducer** ：`store` 调用 `reducer` ，传入当前的 `state` 和 `action` ，返回生成新的 `state`
4. **State 更新** ：`store` 更新 `state` ，并通知所有订阅 `store` 的组件
5. **View** ：组件根据新的 `state` 重新渲染界面。

## 特点

1. **可预测性** ：
	- 由于状态更新是通过纯函数（ `reducer` ）完成的，相同的 `state` 和 `action` 总是会生成相同的新的 `state` 。
2. **集中管理** ：
	- 所有状态都存储在单一的 `store` 中，便于调试和管理。避免 props 深层传递
3. **易于测试** ：
	- `reducer` 是纯函数，没有副作用，易于测试。
4. **易于调试** ：
	- 通过记录 `action` 和 `state` ，可以实现时间旅行调试（如 Redux DevTools）。  
- **丰富的生态系统**：中间件、开发者工具等  

## 使用示例

```js
// 1. 定义 Action Types
const ADD_TODO = 'ADD_TODO'

// 2. 定义 Action Creator
function addTodo(text) {
  return {
    type: ADD_TODO,
    payload: text,
  }
}

// 3. 定义 Reducer
function todoReducer(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return […state, action.payload]
    default:
      return state
  }
}

// 4. 创建 Store
const store = Redux.createStore(todoReducer)

// 5. 订阅 Store
store.subscribe(() => {
  console.log('Current State:', store.getState())
})

// 6. 分发 Action
store.dispatch(addTodo('Learn Redux'))
store.dispatch(addTodo('Build a project'))
```

## Redux 在现代 React 中的替代方案

虽然 Redux 仍然广泛使用，但现代 React 也提供了其他状态管理方案：
- Context API + useReducer
- Zustand ⭐️
- Jotai
- Recoil
- MobX

理解 Redux 原理对于掌握这些状态管理方案都有帮助，因为许多概念是相通的。
