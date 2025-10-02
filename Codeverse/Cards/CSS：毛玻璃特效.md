---
tags: []
up:
related:
created: 2025-07-04
modified: 2025-07-04
---

毛玻璃效果（Frosted Glass）是一种流行的 UI 设计风格，通过模糊和半透明处理使背景内容产生朦胧美感。以下是几种 CSS 实现方案：

## 1. 使用 backdrop-filter（现代浏览器推荐）

```css
.frosted-glass {
  background-color: rgba(255, 255, 255, 0.3); /* 半透明底色 */
  backdrop-filter: blur(10px); /* 关键模糊效果 */
  -webkit-backdrop-filter: blur(10px); /* Safari兼容 */
  
  /* 可选增强效果 */
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
}

/* eg */
--bew-filter-glass-1: blur(20px) saturate(180%);
backdrop-filter: var(--bew-filter-glass-1)
```

## 2. 兼容方案：伪元素 + filter（支持旧浏览器）

```css
.frosted-glass-legacy {
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.frosted-glass-legacy::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: inherit;
  background-attachment: fixed; /* 关键：使背景固定 */
  filter: blur(10px);
  z-index: -1;
  margin: -20px; /* 消除边缘模糊减弱 */
  
  /* 半透明遮罩 */
  background-color: rgba(255, 255, 255, 0.3);
}
```

## 3. 动态背景示例（结合伪元素）

```html
<div class="background-image">
  <div class="frosted-glass-content">
    <!-- 你的内容 -->
    毛玻璃效果内容区
  </div>
</div>
```

```css
.background-image {
  background: url('your-image.jpg') center/cover;
  height: 100vh;
  position: relative;
}

.frosted-glass-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 2rem;
  width: 60%;
  
  /* 毛玻璃效果 */
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.18);
}
```

## 4. 彩色毛玻璃变体

```css
.colored-glass {
  /* 使用HSLA获得更好的透明色彩 */
  background: hsla(240, 60%, 65%, 0.3);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  
  /* 内发光效果 */
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.2);
}
```

## 5. 性能优化技巧

1. **限制模糊范围**：

   ```css
   /* 只模糊必要区域 */
   .optimized-blur {
     backdrop-filter: blur(5px);
     clip-path: inset(0 round 10px);
   }
   ```

2. **动画优化**：

   ```css
   /* 对模糊效果应用will-change */
   .animated-glass {
     will-change: backdrop-filter;
     transition: backdrop-filter 0.3s ease;
   }
   .animated-glass:hover {
     backdrop-filter: blur(15px);
   }
   ```

3. **降级方案检测**：

   ```javascript
   // 检测backdrop-filter支持
   if (!CSS.supports('backdrop-filter', 'blur(1px)')) {
     document.body.classList.add('no-backdrop-filter');
   }
   ```

## 浏览器兼容性说明

| 属性/方法            | Chrome | Firefox | Safari | Edge |
|----------------------|--------|---------|--------|------|
| backdrop-filter      | 76+     | 103+    | 9+     | 17+  |
| filter (伪元素方案)   | 18+     | 35+     | 6+     | 12+  |

对于不支持 `backdrop-filter` 的浏览器（如旧版 Firefox），建议：
1. 使用伪元素方案作为降级
2. 或提供纯色半透明替代方案

## 高级应用：滚动视差毛玻璃

```css
.parallax-glass {
  position: relative;
  height: 100vh;
  overflow: hidden;
}

.parallax-glass::before {
  content: '';
  position: fixed; /* 关键区别 */
  /* 其余与伪元素方案相同 */
}

.content {
  position: relative;
  backdrop-filter: blur(5px);
}
```

这些技术可以组合使用，根据项目需求和浏览器支持情况选择最适合的方案。现代浏览器推荐优先使用 `backdrop-filter`，它性能更好且实现更简单。
