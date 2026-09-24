---
tags: []
up:
related:
companies:
created: 2025-06-15
modified: 2025-06-24
---

> Q: Commonjs 和 ESM 的区别？如何处理循环依赖的

### **CommonJS (CJS) 和 ES Modules (ESM) 的区别**

| **特性**         | **CommonJS (CJS)**               | **ES Modules (ESM)**                    |
| ---------------- | -------------------------------- | --------------------------------------- |
| **语法**         | `require()` / `module.exports`   | `import` / `export`                     |
| **加载方式**     | **同步加载**（运行时动态加载）   | **异步加载**（编译时静态解析）          |
| **适用环境**     | Node.js（传统方式）              | 浏览器 + Node.js（现代标准）            |
| **模块解析时机** | 运行时解析依赖                   | 编译时解析依赖（静态分析）              |
| **循环依赖处理** | 支持，但可能导致部分导出未初始化 | 支持，静态分析确保引用正确              |
| **动态导入**     | `require()` 可动态调用           | `import()` 动态导入（返回 Promise）     |
| **顶层 `this`**  | 指向 `module.exports`            | 指向 `undefined`                        |
| **严格模式**     | 默认非严格模式                   | 默认严格模式（`'use strict'`）          |
| **文件扩展名**   | `.js` / `.cjs`                   | `.js`（需 `"type": "module"`） / `.mjs` |
| **Node.js 支持** | 原生支持                         | 需 `"type": "module"` 或 `.mjs` 扩展名  |
| **浏览器支持**   | 不支持（需打包工具如 Webpack）   | 原生支持（`<script type="module">`）    |
| 导出             | 导出的是值的拷贝                 | 导出的是值的引用                        |

---

### **循环依赖（Circular Dependency）的处理**

循环依赖指模块 A 依赖模块 B，而模块 B 又依赖模块 A。不同模块系统处理方式不同：

#### **1. CommonJS 的循环依赖**

- **机制**：`require()` 是动态加载，遇到循环依赖时，会返回**已执行部分的 `module.exports`**，可能导致部分导出未初始化。
- **示例**：

  ```js
  // a.js
  const b = require("./b");
  console.log("a:", b);
  module.exports = { value: "A" };

  // b.js
  const a = require("./a");
  console.log("b:", a); // 此时 a.js 未完全执行，a 是 {}！
  module.exports = { value: "B" };
  ```

  **输出**：

  ```
  b: {}
  a: { value: 'B' }
  ```

- **解决方法**：
  - 延迟获取依赖：

    ```js
    // a.js
    module.exports = { value: "A" };
    setTimeout(() => {
      const b = require("./b");
      console.log("a:", b);
    }, 0);
    ```

  - 导出工厂函数而非对象：
    - require() 缓存的是工厂函数，而不是一个对象
    - 真正延迟执行：使用时候才会调用函数生成对象，获得新的内存地址

    ```js
    // a.js
    const b = require("./b")(); // 调用工厂函数
    console.log("a:", b);
    module.exports = () => ({ value: "A" }); // 导出工厂函数
    ```

  // b.js
  const a = require('./a')(); // 调用工厂函数
  console.log('b:', a);
  module.exports = () => ({ value: 'B' }); // 导出工厂函数

  ```

  ```

#### **2. ES Modules 的循环依赖**

- **机制**：ESM 是静态分析，所有 `import` 会被提升到模块顶部，并生成**绑定（引用）**。循环依赖时，引用可以指向正确的内存地址。
- **示例**：

  ```js
  // a.mjs
  import { b } from "./b.mjs";
  console.log("a:", b);
  export const a = "A";

  // b.mjs
  import { a } from "./a.mjs";
  console.log("b:", a); // 不会报错，a 是未初始化的引用
  export const b = "B";
  ```

  **输出**：

  ```
  b: <uninitialized>
  a: B
  ```

  - 虽然 `a` 在 `b.mjs` 中未完全初始化，但 ESM 的绑定机制确保后续访问正确。

- **解决方法**：
  - 通常无需特殊处理，ESM 的设计已保证循环依赖的安全性。
  - 避免在模块顶层直接依赖循环导出的值（可改用函数封装）。

---

### **总结**

| **循环依赖处理** | **CommonJS**                   | **ES Modules**                              |
| ---------------- | ------------------------------ | ------------------------------------------- |
| **机制**         | 动态加载，可能返回部分导出     | 静态绑定，引用始终正确                      |
| **问题**         | 未初始化的导出可能导致逻辑错误 | 顶层访问未初始化的绑定（`<uninitialized>`） |
| **最佳实践**     | 延迟加载或使用工厂函数         | 依赖 ESM 的静态解析，无需额外处理           |

**建议**：

- 在新项目中优先使用 **ES Modules**（现代浏览器和 Node.js 均支持）。
- 在旧项目或 Node.js 环境中，注意 CommonJS 的循环依赖陷阱，合理设计模块结构。
