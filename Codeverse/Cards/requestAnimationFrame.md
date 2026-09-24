---
tags: []
up:
related:
rank: "0"
companies:
created: 2025-06-19
modified: 2025-06-19
---

> Q: 如何理解 `requestAnimationFrame`

`requestAnimationFrame`（简称 **rAF**）是浏览器提供的 JavaScript API，用于在下一次浏览器重绘（repaint）前执行动画或视觉更新，相比 `setTimeout`/`setInterval` 更高效、更流畅。

---

## **1. 基本用法**

```javascript
function animate() {
  // 动画逻辑（如修改 DOM 样式）
  element.style.left = `${newPosition}px`;

  // 递归调用，实现连续动画
  requestAnimationFrame(animate);
}

// 启动动画
requestAnimationFrame(animate);
```

### **关键点**

- **回调函数**：浏览器会在每次重绘前调用它（通常 **60fps，即 16.67ms/帧**）。
- **自动暂停**：当页面隐藏（如切换标签页），浏览器会停止调用以节省资源。
- **返回值**：返回一个 ID，可用于取消动画（类似 `setTimeout`）。

---

## **2. 为什么优于 `setTimeout`/`setInterval`？**

| **特性**     | `requestAnimationFrame`       | `setTimeout`/`setInterval`  |
| ------------ | ----------------------------- | --------------------------- |
| **执行时机** | 与浏览器渲染同步，避免丢帧    | 可能因事件循环阻塞导致卡顿  |
| **性能优化** | 后台标签页自动暂停            | 持续执行，浪费 CPU          |
| **帧率控制** | 自动匹配屏幕刷新率（如 60Hz） | 需手动设置时间（如 `16ms`） |
| **GPU 友好** | 适合 CSS 动画、Canvas 绘制    | 无特别优化                  |

---

## **3. 实际应用场景**

### **（1）平滑动画**

```javascript
const element = document.getElementById("box");
let position = 0;

function move() {
  position += 1;
  element.style.transform = `translateX(${position}px)`;

  if (position < 200) {
    requestAnimationFrame(move);
  }
}

move();
```

### **（2）性能监控**

```javascript
let startTime;
function measureFPS(timestamp) {
  if (!startTime) startTime = timestamp;
  const elapsed = timestamp - startTime;
  console.log(`当前帧耗时：${elapsed}ms`);
  requestAnimationFrame(measureFPS);
}

requestAnimationFrame(measureFPS);
```

### **（3）游戏循环**

```javascript
function gameLoop() {
  updateGameState(); // 更新游戏逻辑
  renderGame(); // 渲染画面
  requestAnimationFrame(gameLoop);
}

gameLoop();
```

---

## **4. 兼容性与降级方案**

### **（1）兼容所有浏览器**

```javascript
const rAF =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  ((callback) => setTimeout(callback, 16));

rAF(() => {
  console.log("动画开始");
});
```

### **（2）取消动画**

```javascript
const animationId = requestAnimationFrame(animate);

// 取消动画
cancelAnimationFrame(animationId);
```

---

## **5. 注意事项**

1. **避免频繁修改 DOM**：在 rAF 中批量操作 DOM 以减少重排（reflow）。
2. **防抖逻辑**：如果动画计算复杂，可限制执行频率（如每 2 帧运行一次）。

   ```javascript
   let tick = 0;
   function animate() {
     tick++;
     if (tick % 2 === 0) {
       // 每 2 帧执行一次
     }
     requestAnimationFrame(animate);
   }
   ```

3. **与 CSS 动画对比**：简单动画优先用 CSS `transition`/`animation`（性能更高）。

---

## **6. 总结**

- **使用场景**：JavaScript 驱动的动画、游戏循环、高性能可视化（Canvas/WebGL）。
- **优势**：
  - 自动匹配屏幕刷新率，流畅不卡顿。
  - 后台标签页自动暂停，节省资源。
- **兼容性**：所有现代浏览器（IE10+）。
