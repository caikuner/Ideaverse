---
tags: [handcode/css]
up: 
related: 
rank: "3"
companies: 
created: 2025-06-18
modified: 2025-06-21
---

> Q: 使用 CSS 绘制一个边长为 20px 的等边三角形

```css
.triangle {
  width: 20px;
  height: 17.32px;  /* 20 × sin(60°) */
  background-color: red;
  clip-path: polygon(0 100%, 50% 0, 100% 100%)
}

@supports not (clip-path: polygon(0% 100%, 50% 0%, 100% 100%)) {
  .triangle {
    width: 0; /* 注意设为 0 */
    height: 0;

    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 17.32px solid red;
  }
}
```

### 方法 1：使用 CSS border

**原理**：利用 `border` 属性绘制三角形。
**特点**：
- 纯 CSS 实现，无需额外标签。
- 重点在于使用**左右透明边框**露出底框的颜色。
- 但 `border` 方式无法精确控制边长，通过调整 `border-left`/`right` 和 `border-bottom` 的比例实现。

```html
<div class="triangle-border"></div>
<style>
  .triangle-border {
  width: 0; /* 注意设为 0 */
  height: 0;
  border-left: 10px solid transparent;  /* 边长 20px 的等边三角形，左右 10+10 */
  border-right: 10px solid transparent;
  border-bottom: 17.32px solid red;   /* 高度 = 20 × sin(60°) ≈ 17.32px */
</style>
```

追问：
- 直角三角形呢
改成 0px：`border-left: 0px solid transparent;`

---

### 方法 2：使用 SVG（精确控制边长）

**原理**：SVG 的 `<polygon>` 直接定义顶点坐标。
**特点**：
- 精确控制边长和角度。
- 代码直观，符合数学定义。
- 像素值版

```html
<svg width="20" height="17.32" viewBox="0 0 20 17.32">
  <polygon points="0,17.32 10,0 20,17.32" fill="red" />
</svg>
```

- 百分比版

```html
<svg width="20" height="17.32" viewBox="0 0 100 100">
    <polygon points="0,100 50,0 100,100" fill="red" />
</svg>
```

**坐标计算**：
- 等边三角形的三个顶点坐标：
  - 左下角：`(0, 17.32)`
  - 顶点：`(10, 0)`
  - 右下角：`(20, 17.32)`
- 高度 `17.32px` 由 `20 × sin(60°)` 计算得出。

---

### 方法 3：使用 CSS Clip-Path ⭐️

**原理**：用 `clip-path` 裁剪出一个等边三角形。
**特点**：
- 直接使用边长定义，代码更直观。
- 兼容性较好（现代浏览器支持）。

```html
<div class="triangle-clip"></div>
<style>
.triangle-clip {
  width: 20px;
  height: 17.32px;
  background-color: red;
  clip-path: polygon(0% 100%, 50% 0%, 100% 100%);
}
</style>

```

其中，polygon 是以元素自身为坐标系，左上顶点为原点：

```text
(0%, 0%)       (100%, 0%)
    +-------------+
    |             |
    |             |
    +-------------+
(0%, 100%)     (100%, 100%)
```

---

### **总结**

| 方法                | 优点       | 缺点                    |
| ----------------- | -------- | --------------------- |
| **CSS Border**    | 简单，兼容性好  | 边长不精确，依赖 `border` 计算  |
| **SVG**           | 精确控制，可缩放 | 需额外 SVG 标签            |
| **CSS Clip-Path** | 直接定义边长   | 极旧浏览器不支持（但满足 2020 基线） |

**推荐**：
- 需要精确边长 → **SVG**
- 快速实现 → **CSS Border**
- 现代项目 → **CSS Clip-Path**

如果需要动态调整大小，SVG 或 `clip-path` 更灵活！
