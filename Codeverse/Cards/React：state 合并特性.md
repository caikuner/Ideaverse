---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-11
---
React **状态的“合并”特性** 是指当使用 `setState` 更新状态时，React 会将新状态与旧状态进行浅合并（shallow merge），而不是直接替换整个状态对象。

合并特性在类组件中尤为明显，而在函数组件中需要手动实现类似的行为。

1. **类组件中的状态合并**

在类组件中，`setState` 会自动合并状态对象。例如：

jsx

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'John',
      age: 30,
    }
  }

  updateName = () => {
    this.setState({ name: 'Jane' }) // 只更新 name，age 保持不变
  }

  render() {
    return (
      <div>
        <p>Name: {this.state.name}</p>
        <p>Age: {this.state.age}</p>
        <button onClick={this.updateName}>Update Name</button>
      </div>
    )
  }
}
```

在这个例子中：

- 调用 `this.setState({ name: 'Jane' })` 只会更新 `name` 属性，而 `age` 属性保持不变。
- React 会自动将新状态 `{ name: 'Jane' }` 与旧状态 `{ name: 'John', age: 30 }` 进行浅合并，结果是 `{ name: 'Jane', age: 30 }`。

1. **函数组件中的状态替换**

在函数组件中，`useState` 的 setter 函数不会自动合并状态。如果你直接传递一个新对象，它会完全替换旧状态。

jsx

```
function MyComponent() {
  const [state, setState] = useState({
    name: 'John',
    age: 30,
  })

  const updateName = () => {
    setState({ name: 'Jane' }) // ❌ 直接替换，age 会丢失
  }

  return (
    <div>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={updateName}>Update Name</button>
    </div>
  )
}
```

在这个例子中：

- 调用 `setState({ name: 'Jane' })` 会完全替换状态对象，导致 `age` 属性丢失。
- 最终状态变为 `{ name: 'Jane' }`，而不是 `{ name: 'Jane', age: 30 }`。

1. **如何在函数组件中实现状态合并？**

在函数组件中，如果需要实现类似类组件的状态合并特性，可以手动合并状态：

方法 1：使用扩展运算符

jsx

```
function MyComponent() {
  const [state, setState] = useState({
    name: 'John',
    age: 30,
  })

  const updateName = () => {
    setState((prevState) => ({
      …prevState, // 复制旧状态
      name: 'Jane', // 更新 name
    }))
  }

  return (
    <div>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={updateName}>Update Name</button>
    </div>
  )
}
```

方法 2：使用 `useReducer``useReducer` 可以更灵活地管理复杂状态，并实现类似合并的行为。

jsx

```
function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_NAME':
      return {
        …state,
        name: action.payload,
      }
    default:
      throw new Error()
  }
}

function MyComponent() {
  const [state, dispatch] = useReducer(reducer, {
    name: 'John',
    age: 30,
  })

  const updateName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: 'Jane' })
  }

  return (
    <div>
      <p>Name: {state.name}</p>
      <p>Age: {state.age}</p>
      <button onClick={updateName}>Update Name</button>
    </div>
  )
}
```
