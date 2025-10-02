---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-20
---

> **为什么 FPS 会掉到 60 以下？**

FPS（Frames Per Second，每秒帧数）低于 60 通常意味着浏览器无法在 **16.67ms（1 秒/60 帧）** 内完成一帧的渲染工作，导致动画卡顿或页面不流畅。以下是具体原因及优化方案：

---

### **1. JavaScript 执行时间过长**

#### **问题**

- 复杂的计算、未优化的循环或同步阻塞代码占用了主线程，导致浏览器无法及时渲染下一帧。
- **示例**：

  ```javascript
  // 同步阻塞代码，导致帧率下降
  for (let i = 0; i < 1000000; i++) {
    heavyCalculation(); // 耗时操作
  }
  ```

#### **优化方案**

✅ **使用 `Web Workers`**：将计算任务移到后台线程，避免阻塞主线程。
✅ **分帧处理**：通过 `requestAnimationFrame` 或 `setTimeout` 拆分长任务。
✅ **避免强制同步布局（Layout Thrashing）**：

   ```javascript
   // ❌ 错误：先读后写，触发强制同步布局
   const width = element.offsetWidth; // 读取
   element.style.width = width + 10 + 'px'; // 写入
   ```

---

### **2. 频繁的 DOM 操作**

#### **问题**

- 直接操作 DOM 会触发 **重排（Reflow）和重绘（Repaint）**，消耗大量 CPU/GPU 资源。
- **示例**：

  ```javascript
  // ❌ 每次循环都修改 DOM，导致多次重排
  elements.forEach(el => {
    el.style.width = '100px';
  });
  ```

#### **优化方案**

✅ **批量修改 DOM**：使用 `DocumentFragment` 或虚拟 DOM（React/Vue）。
✅ **使用 `class` 替代行内样式**：减少样式计算开销。
✅ **使用 `transform` 和 `opacity`**：这些属性不会触发重排，直接进入合成阶段（GPU 加速）。

---

### **3. 复杂的样式计算**

#### **问题**

- 复杂的 CSS 选择器或高性能消耗属性（如 `filter`、`box-shadow`）会增加渲染时间。
- **示例**：

  ```css
  /* ❌ 高性能消耗属性 */
  .card {
    filter: blur(5px);
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
  }
  ```

#### **优化方案**

✅ **简化 CSS 选择器**（避免嵌套过深）。
✅ **使用 `will-change` 提示浏览器优化**：

  ```css
  .animated-element {
    will-change: transform; /* 告诉浏览器准备 GPU 加速 */
  }
  ```

---

### **4. 内存泄漏**

#### **问题**

- 未释放的全局变量、事件监听或定时器会导致内存占用过高，浏览器变慢。
- **示例**：

  ```javascript
  // ❌ 未移除的事件监听
  window.addEventListener('scroll', handleScroll);
  // 但页面卸载时未移除
  ```

#### **优化方案**

✅ **及时清理资源**（移除事件监听、清除定时器）。
✅ **使用 `WeakMap` 管理对象引用**，避免内存泄漏。
✅ **通过 Chrome DevTools → Memory 面板检测泄漏**。

---

### **5. 图层（Layer）过多**

#### **问题**

- 浏览器会为某些 CSS 属性（如 `transform`、`opacity`）创建独立图层，但过多图层会增加合成（Composite）开销。
- **示例**：

  ```css
  /* ❌ 滥用硬件加速 */
  .element {
    transform: translateZ(0); /* 强制创建图层 */
  }
  ```

#### **优化方案**

✅ **使用 Chrome DevTools → Layers 面板检查图层数量**。
✅ **避免不必要的 `transform: translateZ(0)`**，仅在需要时启用 GPU 加速。

---

### **6. 浏览器渲染流程（为什么 FPS 下降？）**

浏览器渲染一帧的流程（**像素管道**）：
1. **JavaScript** → 2. **Style 计算** → 3. **Layout（重排）** → 4. **Paint（重绘）** → 5. **Composite（合成）**

如果任何一步耗时超过 **16.67ms**，FPS 就会低于 60。

#### **优化目标**

- **减少主线程负载**（JS、样式、布局）。
- **利用 GPU 加速**（`transform`、`opacity`）。
- **按需渲染**（避免不必要的更新）。

---

### **7. 调试工具**

| **工具**               | **用途**                                                                 |
|------------------------|-------------------------------------------------------------------------|
| **Chrome DevTools → Performance** | 分析帧耗时，找到卡顿点（Long Tasks）。                                   |
| **Chrome DevTools → Rendering**   | 高亮重绘区域、显示图层边界。                                            |
| **Frame Rate Meter**              | 实时监控 FPS（目标 ≥ 60）。                                             |
| **Lighthouse**                    | 检测页面性能问题并提供优化建议。                                        |

---

### **总结：如何保持 60 FPS？**

| **问题**               | **优化方案**                              |
|------------------------|------------------------------------------|
| **JS 执行过长**        | 分帧处理、Web Workers                    |
| **DOM 操作频繁**       | 虚拟 DOM、批量修改                       |
| **样式复杂**           | 简化 CSS、减少重绘                       |
| **内存泄漏**           | 及时清理监听器、定时器                   |
| **图层过多**           | 减少不必要的 `translateZ(0)`            |

**关键原则**：
- **减少主线程负载**（避免长任务）。
- **优先使用 GPU 加速属性**（`transform`、`opacity`）。
- **按需渲染**（避免不必要的更新）。

通过优化，可以让页面稳定运行在 **60 FPS**，提供流畅的用户体验！ 🚀
