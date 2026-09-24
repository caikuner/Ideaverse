---
tags: []
up:
related:
created: 2025-07-04
modified: 2025-07-04
---

Simon Willison 在 2025 年 6 月 26 日发布的 [《Sandboxes》](https://simonwillison.net/2025/Jun/26/sandboxes/) 一文中介绍的沙箱实现方法，是基于 **Deno 的权限系统**和 **Web Worker 隔离技术**的组合方案。以下是关键实现要点分析：

---

### 核心实现技术

1. **Deno 的权限沙箱**
   - 利用 Deno 运行时内置的精细权限控制（`--allow-*` 标志）
   - 示例代码：

     ```javascript
     // 以受限权限执行代码
     deno run --allow-net=example.com https://example.com/untrusted_code.js
     ```

2. **Web Worker 进程隔离**
   - 每个沙箱代码都在独立的 Worker 线程中运行
   - 通过 `postMessage` 实现主线程与沙箱的通信
   - 关键代码结构：

     ```javascript
     const worker = new Worker(URL.createObjectURL(new Blob([`...`], { type: "text/javascript" })));
     ```

---

### 技术组合优势

| 技术          | 解决的问题                         | 实现方式                          |
| ------------- | ---------------------------------- | --------------------------------- |
| Deno 权限系统 | 文件/网络/环境变量等系统级访问控制 | 启动时声明精确权限                |
| Web Worker    | 内存隔离和崩溃防护                 | 每个沙箱独立进程                  |
| 消息协议      | 安全的数据交换                     | 结构化克隆算法 (Structured Clone) |

---

### 典型代码流程

1. **沙箱初始化**

   ```javascript
   const sandbox = new Sandbox({
     permissions: ["net:example.com"], // Deno式权限声明
     timeout: 1000, // 执行超时
   });
   ```

2. **代码执行**

   ```javascript
   const result = await sandbox.execute(`
     const res = await fetch('https://example.com/api');
     return res.json();
   `);
   ```

3. **通信机制**

   ```javascript
   // Worker内部
   self.onmessage = async (e) => {
     try {
       const fn = new Function("return (" + e.data.code + ")");
       const result = await fn()();
       postMessage({ result });
     } catch (error) {
       postMessage({ error: error.message });
     }
   };
   ```

---

### 安全增强措施

1. **双层隔离**：Worker 进程隔离 + Deno 权限边界
2. **输入净化**：对传入代码进行 AST 分析，禁止危险语法（如 `eval`）
3. **资源限制**：

   ```javascript
   // 在Worker中
   const controller = new AbortController();
   setTimeout(() => controller.abort(), options.timeout);
   fetch(url, { signal: controller.signal });
   ```

---

### 与其他方案的对比

| 方案     | 隔离级别 | 系统访问控制 | 适用场景        |
| -------- | -------- | ------------ | --------------- |
| 本文方案 | 进程级   | 精确到 API   | 云函数/插件系统 |
| VM2      | 上下文级 | 无           | 简单脚本执行    |
| iframe   | 文档级   | 同源策略     | 浏览器内隔离    |

---

### 关键创新点

1. **混合沙箱模型**：结合了 Deno 的权限模型和浏览器的 Worker 隔离
2. **协议化通信**：所有输入输出必须通过显式的消息协议
3. **可观测性**：内置执行指标监控（CPU/内存使用量）

这种设计特别适合需要同时处理 **系统级权限控制** 和 **代码执行隔离** 的场景，比如 Serverless 函数执行环境或用户自定义插件系统。
