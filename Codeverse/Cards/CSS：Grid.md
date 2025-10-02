---
tags: []
up:
related:
companies:
created: 2025-06-18
modified: 2025-06-18
---
CSS Grid 是一种**二维布局系统**，可以同时控制行和列，适用于复杂的页面布局（如仪表盘、杂志排版等）。

## **1. Grid 布局的核心概念**

### **（1）Grid 容器（Grid Container）**

- 通过 `display: grid` 或 `display: inline-grid` 定义 Grid 容器。
- 容器内的直接子元素自动成为 **Grid 项目（Grid Items）**。

### **（2）网格线（Grid Lines）**

- 水平（行）和垂直（列）的线，用于定位项目。
- 编号从 `1` 开始（也可以使用负数，如 `-1` 表示最后一条线）。

### **（3）网格轨道（Grid Track）**

- 行（`grid-template-rows`）和列（`grid-template-columns`）定义的区域。

### **（4）网格单元格（Grid Cell）**

- 行和列的交叉区域，最小的布局单位。

### **（5）网格区域（Grid Area）**

- 由多个单元格组成的矩形区域，可通过 `grid-area` 命名。

---

## **2. Grid 容器的属性**

### **（1）`grid-template-columns` / `grid-template-rows`**

定义列和行的大小：

```css
.container {
  grid-template-columns: 100px 1fr 2fr; /* 3列：固定100px + 剩余空间1:2分配 */
  grid-template-rows: 50px auto 100px;   /* 3行：固定50px、自适应、固定100px */
}
```

- **单位**：
  - `fr`（剩余空间比例）
  - `auto`（自适应）
  - `minmax(min, max)`（范围限制，如 `minmax(100px, 1fr)`）
  - `repeat(n, size)`（重复，如 `repeat(3, 1fr)`）

### **（2）`grid-template-areas`**

通过命名区域定义布局：

```css
.container {
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
}
.item-header { grid-area: header; }
.item-sidebar { grid-area: sidebar; }
.item-main { grid-area: main; }
.item-footer { grid-area: footer; }
```

### **（3）`gap`（间距）**

- `row-gap` / `column-gap`（行/列间距）
- `gap`（简写，如 `gap: 10px 20px`）

### **（4）`justify-items` / `align-items`**

- 控制**单元格内**项目的对齐方式（默认 `stretch` 拉伸）。
- `start` / `end` / `center` / `stretch`

### **（5）`justify-content` / `align-content`**

- 控制**整个网格**在容器中的对齐方式（当网格总大小小于容器时生效）。
- `start` / `end` / `center` / `stretch` / `space-around` / `space-between` / `space-evenly`

### **（6）`grid-auto-columns` / `grid-auto-rows`**

- 定义**隐式轨道**（超出定义的行/列时自动生成的大小）。

```css
.container {
  grid-auto-rows: 50px; /* 超出定义的行高默认50px */
}
```

### **（7）`grid-auto-flow`**

- 控制自动排列方式：
  - `row`（默认，按行排列）
  - `column`（按列排列）
  - `dense`（紧凑填充空缺）

---

## **3. Grid 项目的属性**

### **（1）`grid-column` / `grid-row`**

- 定义项目占据的**行/列范围**：

```css
.item {
  grid-column: 1 / 3;  /* 从第1列到第3列 */
  grid-row: span 2;     /* 占据2行 */
}
```

- 简写：
  - `grid-column-start` / `grid-column-end`
  - `grid-row-start` / `grid-row-end`

### **（2）`grid-area`**

- 指定项目所在的**命名区域**（需配合 `grid-template-areas`）。
- 也可直接定义位置：

```css
.item {
  grid-area: 1 / 2 / 3 / 4; /* row-start / column-start / row-end / column-end */
}
```

### **（3）`justify-self` / `align-self`**

- 控制**单个项目**在单元格内的对齐方式（覆盖容器的 `justify-items` / `align-items`）。
- `start` / `end` / `center` / `stretch`

### **（4）`order`**

- 调整项目的显示顺序（数值越小越靠前）。

---

## **4. Grid 布局的典型应用场景**

### **（1）圣杯布局（Header + Sidebar + Main + Footer）**

```css
.container {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main main"
    "footer footer footer";
  grid-template-rows: 80px 1fr 60px;
  grid-template-columns: 200px 1fr;
}
```

### **（2）响应式网格（自动适应列数）**

```css
.container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}
```

### **（3）复杂杂志布局**

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-auto-rows: minmax(100px, auto);
  gap: 10px;
}
.item-a {
  grid-column: 1 / 3;
  grid-row: 1;
}
.item-b {
  grid-column: 3;
  grid-row: 1 / 3;
}
```

---

## **5. Grid vs. Flexbox**

| **特性**       | **CSS Grid**            | **Flexbox**              |
|--------------|------------------------|------------------------|
| **维度**      | 二维（行和列）          | 一维（行或列）          |
| **适用场景**  | 整体页面布局            | 组件内部布局            |
| **对齐控制**  | `justify-items` / `align-content` | `justify-content` / `align-items` |
| **项目定位**  | 通过网格线精准控制      | 依赖 `flex-direction` 和 `order` |

---

## **6. 兼容性**

- 现代浏览器全面支持（IE11 部分支持，需加 `-ms-` 前缀）。
- 移动端兼容性良好。

---

### **总结**

CSS Grid 适用于：
✅ **复杂二维布局**（如仪表盘、杂志排版）
✅ **响应式网格系统**
✅ **精确控制行列对齐**

**Grid + Flexbox 结合使用**，可以构建更灵活的现代布局！
