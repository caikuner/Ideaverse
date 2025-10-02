---
tags: []
up: 
related: 
created: 2025-06-12
modified: 2025-06-12
---
**JSX（JavaScript XML）** 是一个 JavaScript 的语法扩展，允许在 JavaScript 代码中通过类 HTML 语法创建 React 元素。它  
需要通过 Babel 等工具编译为标准的 JavaScript 代码，最终生成 **React 元素对象**（React Element），这些元素共同构成虚拟 DOM（Virtual DOM）树。

### **核心原理**

- **JSX 编译为 React 元素** JSX 会被转换为 `React.createElement()` 调用（或 React 17+ 的 `_jsx` 函数），生成描述 UI 结构的对象（React 元素），而非直接操作真实 DOM。

```jsx
// JSX
const element = <h1 className="title">Hello, world!</h1>

// 编译后（React 17 之前）
const element = React.createElement('h1', { className: 'title' }, 'Hello, world!')

// 编译后（React 17+，自动引入 _jsx）
import { jsx as _jsx } from 'react/jsx-runtime'
const element = _jsx('h1', { className: 'title', children: 'Hello, world!' })
```

- **虚拟 DOM 的运作**
    
    - React 元素组成虚拟 DOM 树，通过 Diff 算法对比新旧树差异，最终高效更新真实 DOM。
    - 虚拟 DOM 是内存中的轻量对象，避免频繁操作真实 DOM 的性能损耗。

### **JSX 的核心特性**

- **类 HTML 语法与 JavaScript 的融合**
	- **表达式嵌入**：通过 `{}` 嵌入 JavaScript 表达式（如变量、函数调用、三元运算符）
	- **禁止语句**：`{}` 内不支持 `if`/`for` 等语句，需改用表达式（如三元运算符或逻辑与）
	- 表达式注意返回 boolean，否则会把结果生成 UI

```jsx
const userName = 'Alice'
const element = <p>Hello, {userName.toUpperCase()}</p>

<div>{isLoggedIn ? 'Welcome' : 'Please Login'}</div>
```

- **语法规则**
    - **属性命名**：使用驼峰命名（如 `className` 代替 `class`，`htmlFor` 代替 `for`）。
    - **闭合标签**：所有标签必须显式闭合（如 `<img />`）。
    - **单一根元素**：JSX 必须有唯一根元素（或用 `<></>` 空标签包裹）。
- **安全性**
    - **默认 XSS 防护**：JSX 自动转义嵌入内容中的特殊字符（如 `<` 转为 `&lt;`）。
    - **例外场景**：如需渲染原始 HTML，需显式使用 `dangerouslySetInnerHTML`（需谨慎）：

```jsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### **编译与工具链**

1. **编译流程**  
   - JSX 需通过 **Babel** 编译为浏览器可执行的 JavaScript。典型配置如下：

    ```json
    // .babelrc
    {
      "presets": ["@babel/preset-react"]
    }
    ```

2. **React 17+ 的优化**
    - 无需手动导入 React：编译器自动引入 `_jsx` 函数。
    - 更简洁的编译输出：减少代码体积，提升可读性。
