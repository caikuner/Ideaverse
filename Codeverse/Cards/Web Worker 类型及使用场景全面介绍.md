---
tags: []
up:
related:
companies:
created: 2025-06-24
modified: 2025-06-24
---

Web Workers 是现代浏览器提供的 JavaScript 多线程解决方案，允许在后台线程中运行脚本，避免阻塞主线程。以下是主要的 Web Worker 类型及其应用场景：

## 1. 专用 Worker (Dedicated Worker)

**特点**：

- 主线程与 Worker 一对一通信
- 最简单的 Worker 类型
- 不能在不同页面间共享

**创建方式**：

```javascript
// 主线程
const worker = new Worker("worker.js");

// worker.js
self.onmessage = function (e) {
  console.log("Worker received:", e.data);
  postMessage("Work done!");
};
```

**应用场景**：

- 复杂计算（如图像处理）
- 大数据集排序/过滤
- 长时间运行的算法

## 2. 共享 Worker (Shared Worker)

**特点**：

- 多个浏览器上下文（如多个标签页、iframe）可共享同一个 Worker
- 通过端口 (port) 进行通信
- 需要显式连接和断开

**创建方式**：

```javascript
// 主线程
const sharedWorker = new SharedWorker("shared-worker.js");
sharedWorker.port.start();
sharedWorker.port.postMessage("Hello Shared Worker!");

// shared-worker.js
let connections = 0;
self.onconnect = function (e) {
  const port = e.ports[0];
  connections++;

  port.onmessage = function (e) {
    console.log("Message from:", e.origin, e.data);
    port.postMessage(`Connections: ${connections}`);
  };
};
```

**应用场景**：

- 多标签页应用状态同步
- 共享 WebSocket 连接
- 跨标签页的缓存管理

## 3. 服务 Worker (Service Worker)

**特点**：

- 主要用作网络代理
- 可拦截和处理网络请求
- 支持离线缓存
- 生命周期独立于页面

**创建方式**：

```javascript
// 注册
navigator.serviceWorker.register("sw.js");

// sw.js
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll(["/app.css", "/app.js"]);
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
```

**应用场景**：

- PWA（渐进式 Web 应用）
- 离线缓存
- 后台同步
- 推送通知

## 4. 音频 Worker (Audio Worklet)

**特点**：

- 专为音频处理设计
- 低延迟音频操作
- 直接访问音频渲染线程

**创建方式**：

```javascript
// 主线程
const audioContext = new AudioContext();
await audioContext.audioWorklet.addModule("processor.js");
const oscillator = new OscillatorNode(audioContext);
const workletNode = new AudioWorkletNode(audioContext, "my-processor");
oscillator.connect(workletNode).connect(audioContext.destination);
oscillator.start();

// processor.js
class MyProcessor extends AudioWorkletProcessor {
  process(inputs, outputs) {
    // 处理音频数据
    return true;
  }
}
registerProcessor("my-processor", MyProcessor);
```

**应用场景**：

- 自定义音频效果
- 音频可视化
- 实时音频处理

## 5. 绘画 Worker (Paint Worklet)

**特点**：

- CSS Houdini API 的一部分
- 允许自定义 CSS 绘制
- 高性能的绘制操作

**创建方式**：

```javascript
// 主线程
CSS.paintWorklet.addModule('paint-worklet.js');

// CSS
.my-element {
  background-image: paint(myPainter);
}

// paint-worklet.js
registerPaint('myPainter', class {
  paint(ctx, size) {
    // 自定义绘制逻辑
  }
});
```

**应用场景**：

- 自定义 CSS 背景/边框
- 复杂图形渲染
- 动态样式效果

## 6. 动画 Worker (Animation Worklet)

**特点**：

- CSS 动画扩展
- 高性能滚动关联动画
- 在主线程外运行动画逻辑

**创建方式**：

```javascript
// 主线程
await CSS.animationWorklet.addModule("animator.js");

new WorkletAnimation("my-animator", new KeyframeEffect(element, keyframes, options)).play();

// animator.js
registerAnimator(
  "my-animator",
  class {
    animate(currentTime, effect) {
      // 动画逻辑
    }
  },
);
```

**应用场景**：

- 流畅的滚动动画
- 复杂的时间线控制
- 物理基础动画

## 选择指南

| Worker 类型  | 通信方式     | 共享性   | 主要用途          |
| ------------ | ------------ | -------- | ----------------- |
| 专用 Worker  | 直接通信     | 不可共享 | 通用计算任务      |
| 共享 Worker  | 端口通信     | 可共享   | 多标签页协作      |
| 服务 Worker  | 事件驱动     | 可共享   | 网络代理/离线功能 |
| 音频 Worklet | 音频处理 API | 不可共享 | 低延迟音频处理    |
| 绘画 Worklet | CSS Houdini  | 可共享   | 自定义 CSS 绘制   |
| 动画 Worklet | 动画 API     | 可共享   | 高性能动画        |

## 使用注意事项

1. **DOM 限制**：所有 Worker 都不能直接访问 DOM
2. **数据传输**：使用 postMessage 传递的数据会被结构化克隆
3. **内存管理**：Worker 会持续占用内存，不需要时应及时终止
4. **兼容性**：不同 Worker 类型的浏览器支持程度不同
5. **调试**：Chrome DevTools 提供专门的 Worker 调试面板

Web Workers 为现代 Web 应用提供了强大的多线程能力，合理使用可以显著提升应用性能和用户体验。
