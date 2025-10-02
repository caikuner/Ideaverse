---
tags: []
up:
related:
created: 2025-07-13
modified: 2025-07-13
---

MessageChannel 是 JavaScript 中用于在不同上下文之间建立双向通信的 API，它是 Web Workers 和跨文档通信（如 iframe）的重要组成部分。

像 React 中任务队列就是使用 MessageChannel 模拟的。

## 基本概念

MessageChannel 创建一个新的消息通道，并通过它的两个 MessagePort 属性（port1 和 port2）发送数据：

```javascript
const channel = new MessageChannel();
```

- `port1` 和 `port2` 是完全对称的，可以互相发送和接收消息
- 每个端口都可以通过 `postMessage()` 发送消息，通过 `onmessage` 接收消息

## 主要使用场景

### 1. Web Workers 通信

```javascript
// 主线程
const worker = new Worker('worker.js');
const channel = new MessageChannel();

// 将 port2 传递给 worker
worker.postMessage({ port: channel.port2 }, [channel.port2]);

// 使用 port1 通信
channel.port1.onmessage = (e) => {
  console.log('收到 worker 消息:', e.data);
};
channel.port1.postMessage('主线程消息');
```

```javascript
// worker.js
onmessage = (e) => {
  const port = e.data.port;
  port.onmessage = (e) => {
    console.log('收到主线程消息:', e.data);
    port.postMessage('worker 回复');
  };
};
```

### 2. iframe 跨文档通信

```javascript
// 父页面
const iframe = document.querySelector('iframe');
const channel = new MessageChannel();

iframe.contentWindow.postMessage({ port: channel.port2 }, '*', [channel.port2]);

channel.port1.onmessage = (e) => {
  console.log('来自 iframe 的消息:', e.data);
};
```

```javascript
// iframe 内部
window.onmessage = (e) => {
  const port = e.data.port;
  port.postMessage('iframe 已连接');
};
```

### 3. Service Worker 通信

```javascript
// 页面代码
navigator.serviceWorker.controller.postMessage(
  { type: 'INIT_PORT' },
  [channel.port2]
);
```

### 4. 同一文档中不同部分通信

可以在同一文档的不同脚本之间建立直接通信通道。

## 优点

1. **双向通信**：不同于简单的 postMessage，MessageChannel 提供了双向通信能力
2. **私有通道**：创建的通道是独立的，不会与其他通信混淆
3. **高效**：直接端口通信比通过 window 的 postMessage 更高效
4. **结构化克隆算法**：支持复杂对象的传输（函数除外）

## 注意事项

- 传输的端口需要使用转移语法（如 `[channel.port2]`）来转移所有权
- 通信完成后应调用 `port.close()` 关闭端口
- 注意处理错误事件（`onmessageerror` 和 `onerror`）

MessageChannel 为复杂的 Web 应用提供了灵活、高效的通信机制，特别适合需要频繁或结构化数据交换的场景。
