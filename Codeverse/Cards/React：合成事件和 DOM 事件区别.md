---
tags: []
up: 
related: 
created: 2025-06-12
modified: 2025-06-16
---

> 合成事件机制简述：[[SyntheticEvent)](React：合成事件机制 (SyntheticEvent|React：合成事件机制 (SyntheticEvent)]].md)

---

### **事件绑定方式**

- **React 事件**
	- 使用**驼峰命名法**（如 `onClick`、`onChange`）
	- 通过 属性直接绑定函数：

```jsx
<button onClick={handleClick}>点击</button>
```

- **DOM 事件**
	- 使用**全小写命名**（如 `onclick`、`onchange`）
	- 使用字符串 (DOM0 级) 或 `addEventListener`(DOM1 级) 绑定：
	- 注意：
		- DOM0 比 DOM1 先注册，优先级高；冒泡阶段
		- DOM1 可以注册多个；默认冒泡阶段

```html DOM0
<button onclick="handleClick()">点击</button>
```

```js DOM1
button.addEventListener('click', handleClick)
```

### **事件对象（Event Object）**

- **React 事件** 使用**合成事件（SyntheticEvent）**，是原生事件对象的跨浏览器包装。
	- e 是合成事件
	- 可通过 `e.nativeEvent` 访问原生事件
	- 事件对象会被复用（事件池机制），异步访问需调用 `e.persist()`。

```jsx
const handleClick = (e) => {
  e.persist() // 保持事件对象引用
  setTimeout(() => console.log(e.target), 100)
}
```

- **DOM 事件** 直接使用浏览器原生事件对象，无复用机制。

```js
button.addEventListener('click', (e) => {
  console.log(e.target) // 直接访问
})
```

### **事件传播与默认行为**

- **React 事件**
	- **阻止默认行为**：必须显式调用 `e.preventDefault()`。
	- **阻止冒泡**：调用 `e.stopPropagation()`。

```jsx
const handleSubmit = (e) => {
  e.preventDefault() // 阻止表单默认提交
  e.stopPropagation() // 阻止事件冒泡
}
```

- **DOM 事件**
	- **阻止默认行为**：可调用 `e.preventDefault()` 或 `return false`（在 HTML 属性中）。
	- **阻止冒泡**：调用 `e.stopPropagation()` 或 `return false`（仅部分情况）。

```html
<form onsubmit="return false">
  <!-- 阻止默认提交 -->
  <button onclick="event.stopPropagation()">按钮</button>
</form>
```

### **性能优化：事件委托**

- **React 事件** 采用**事件委托**机制：
	- React 17 之前将事件委托到 `document` 层级。
	- React 17+ 改为委托到渲染的根容器（如 `ReactDOM.render` 挂载的节点）。
	- 可以减少内存占用，动态添加元素无需重新绑定事件。
- **DOM 事件** 直接绑定到元素，大量事件监听时可能导致性能问题。
	- 也可以自行进行事件委托

### **跨浏览器兼容性**

- **React 事件** 合成事件抹平了浏览器差异（如 `event.target` 的一致性），无需处理兼容性问题。
- **DOM 事件** 需手动处理浏览器兼容性（如 IE 的 `attachEvent` vs 标准 `addEventListener`）。

### **`this` 绑定**

- **React 事件**
	- 函数组件无需处理
	- 类组件中需手动绑定 `this` 或使用箭头函数：

```
class MyComponent extends React.Component {
  handleClick() {
	console.log(this) // 需绑定，否则为 undefined
  }

  render() {
	return <button onClick={this.handleClick.bind(this)}>点击</button>
  }
}
```

- **DOM 事件**
	- 事件处理函数中的 `this` 默认指向触发事件的元素：

```
button.addEventListener('click', function () {
  console.log(this) // 指向 button 元素
})
```

### 小结

| 特性            | React 事件               | DOM 事件                                |
| ------------- | ---------------------- | ------------------------------------- |
| **命名规则**      | 驼峰命名（`onClick`）        | 全小写（`onclick`）                        |
| **绑定方式**      | 属性直接绑定                 | DOM0 / DOM1                           |
| **事件对象**      | 合成事件（`SyntheticEvent`） | 原生事件对象                                |
| **默认行为阻止**    | `e.preventDefault()`   | `e.preventDefault()` 或 `return false` |
| **事件委托**      | 自动委托到根容器               | 需手动实现                                 |
| **跨浏览器兼容**    | 内置处理                   | 需手动适配                                 |
| **`this` 指向** | 类组件中需手动绑定              | 默认指向触发元素                              |

React 事件系统通过抽象和优化，提供了更高效、一致的事件处理方式，避免了直接操作 DOM 的繁琐和兼容性问题。
