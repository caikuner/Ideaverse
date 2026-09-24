---
tags: []
up:
related:
created: 2025-06-11
modified: 2025-06-12
---

主要是 React 中管理表单数据的不同方式，因为表单需要管理和更新值。

## 受控组件（Controlled Component）

### 概念

表单元素组件（如 `<input>`、`<textarea>`、`<select>`）的值由 React 的状态（state）自行管理控制，而不是由 DOM 自身管理。

### 特点

1. **数据存储在 state**：表单元素的值通过 value 属性绑定到 React 的 state
2. **直接获取 state 值**：通过 ref 在需要时访问 DOM 节点值
3. 更新 state：表单元素的值改变后，通过 onChange 事件处理函数来更新 state

### 适用场景

1. 完全控制表单数据：React 状态是表单数据的唯一来源，可以轻松地对数据进行验证、格式化或处理。
2. 实时响应输入：可以在用户输入时实时更新 UI 或执行其他操作（如搜索建议）。
3. 易于集成：与其他 React 状态和逻辑无缝集成。

### 示例

```jsx
function ControlledInput() {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value); // 更新状态
  };

  return (
    <div>
      <input
        type="text"
        value={value} // 绑定状态
        onChange={handleChange} // 监听输入变化
      />
      <p>Current value: {value}</p>
    </div>
  );
}
```

---

## 非受控组件 (Uncontrolled Components)

### 概念

与受控组件相反，非受控组件是指表单数据由 DOM 本身处理，而不是由 React 组件状态控制的组件。在非受控组件中，可以使用 ref 直接从 DOM 节点获取表单值。

### 特点

1. **数据存储在 DOM 中**：表单元素保持自己的状态，进行更新
2. **使用 ref 获取值**：通过 ref 在需要时访问 DOM 节点值
3. **更接近传统 HTML**：类似于非 React 的表单处理方式

### 适用场景

1. **简单表单**：不需要即时验证或复杂交互的表单
2. **文件输入**：`<input type="file" />` 总是非受控的
3. **性能敏感场景**：避免每次按键都触发重新渲染
4. **集成非 React 代码**：与第三方库集成时

### 示例

- 输入提交

```jsx
import { useRef } from "react";

function UncontrolledForm() {
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`输入的值是: ${inputRef.current.value}`);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={inputRef} />
      <button type="submit">提交</button>
    </form>
  );
}
```

- 文件上传示例

```jsx
function FileUpload() {
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("选择的文件:", fileInputRef.current.files[0]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" ref={fileInputRef} />
      <button type="submit">上传</button>
    </form>
  );
}
```

- 默认值设置

```jsx
function FormWithDefault() {
  const inputRef = useRef(null);

  return (
    <form>
      <input
        type="text"
        ref={inputRef}
        defaultValue="初始值" // 使用 defaultValue 而不是 value
      />
    </form>
  );
}
```

## 总结对比

| 特性       | 非受控组件 | 受控组件            |
| ---------- | ---------- | ------------------- |
| 数据存储   | DOM 中     | React 状态中        |
| 值获取方式 | ref        | state               |
| 更新触发   | DOM 事件   | onChange + setState |
| 即时验证   | 困难       | 容易                |
| 性能       | 更好       | 可能较差            |
| 代码量     | 更少       | 更多                |
| 管理       | 差         | 好                  |

## 最佳实践

- 非受控组件：
  - 对于简单表单或性能敏感场景、文件输入使用
  - 在大型应用中谨慎使用，以避免状态管理混乱
  - 考虑使用 `defaultValue` 和 `defaultChecked` 设置初始值
- 受控组件：
  - 需要即时反馈或复杂验证时使用受控组件
