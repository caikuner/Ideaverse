---
tags: []
up:
related:
companies:
created: 2025-06-18
modified: 2025-06-18
---
Flexbox（弹性盒子布局）是 CSS 的一种现代布局方式，用于**一维布局**（行或列），能够高效地控制子元素的排列、对齐和分布空间。

## **1. 核心概念**

### **Flex 容器（Flex Container）**

- 通过 `display: flex` 或 `display: inline-flex` 定义 Flex 容器。
- 容器内的直接子元素自动成为 **Flex 项目（Flex Items）**。

### **主轴（Main Axis）和交叉轴（Cross Axis）**

- **主轴**：由 `flex-direction` 决定（默认水平方向）。
- **交叉轴**：与主轴垂直的方向（默认垂直方向）。

---

## **2. Flex 容器的属性**

### **`flex-direction`**（主轴方向）

- `row`（默认，水平从左到右）
- `row-reverse`（水平从右到左）
- `column`（垂直从上到下）
- `column-reverse`（垂直从下到上）

### **`justify-content`**（主轴对齐）

- `flex-start`（默认，左对齐）
- `flex-end`（右对齐）
- `center`（居中对齐）
- `space-between`（两端对齐，项目间隔相等）
- `space-around`（项目两侧间隔相等）
- `space-evenly`（所有间隔相等）

### **`align-items`**（交叉轴对齐）

- `stretch`（默认，拉伸填满）
- `flex-start`（顶部对齐）
- `flex-end`（底部对齐）
- `center`（垂直居中）
- `baseline`（基线对齐）

### **`flex-wrap`**（换行）

- `nowrap`（默认，不换行）
- `wrap`（换行）
- `wrap-reverse`（反向换行）

### **`align-content`**（多行对齐）

- `flex-start`（多行顶部对齐）
- `flex-end`（多行底部对齐）
- `center`（多行垂直居中）
- `space-between`（多行两端对齐）
- `space-around`（多行均匀分布）
- `stretch`（默认，拉伸填满）

### **`gap`**（项目间距）

- `row-gap`（行间距）
- `column-gap`（列间距）
- `gap`（简写，如 `gap: 10px 20px`）

---

## **3. Flex 项目的属性**

### **`order`**（排序）

- 数值越小越靠前（默认 `0`）， 可以为负值。

### **`flex-grow`**（放大比例）

- 默认 `0`（不放大），数值越大占据剩余空间越多，不允许负值。

### **`flex-shrink`**（缩小比例）

- 默认 `1`（允许缩小），`0` 表示不缩小，不允许负值。

### **`flex-basis`**（初始大小）

- 定义项目在分配空间前的默认大小（如 `100px`、`auto`），默认 auto，即项目原来的大小。

### **`flex`（简写）** ⭐️

- `flex: flex-grow flex-shrink flex-basis`
- 常用简写：
  - `flex: 1` → `flex: 1 1 0` 自由伸缩
  - `flex: auto` → `flex: 1 1 auto` 按内容宽度伸缩
  - `flex: none` → `flex: 0 0 auto` 固定不伸缩

### **`align-self`**（单个项目对齐）

- 覆盖 `align-items` 的设置：
  - `auto`（默认，继承父容器）
  - `flex-start` / `flex-end` / `center` / `baseline` / `stretch`

---

## **4. Flex 布局的典型应用场景**

1. **水平/垂直居中**

   ```css
   .container {
     display: flex;
     justify-content: center;
     align-items: center;
   }
   ```

2. **导航栏**

   ```css
   .nav {
     display: flex;
     justify-content: space-between;
   }
   ```

3. **圣杯布局（自适应等高）**

   ```css
   .container {
     display: flex;
   }
   .main {
     flex: 1;
   }
   .sidebar {
     flex: 0 0 200px;
   }
   ```

4. **卡片流式布局**

   ```css
   .cards {
     display: flex;
     flex-wrap: wrap;
     gap: 16px;
   }
   .card {
     flex: 1 1 200px; /* 最小宽度 200px，自动换行 */
   }
   ```

---

## **5. Flex vs. Grid**

| **特性**       | **Flexbox**              | **CSS Grid**            |
|--------------|------------------------|------------------------|
| **维度**      | 一维（行或列）          | 二维（行和列）          |
| **适用场景**  | 组件内部布局            | 整体页面布局            |
| **对齐控制**  | `justify-content` / `align-items` | `justify-items` / `align-content` |
| **项目顺序**  | `order` 可调整          | 依赖网格线              |

---

## **6. 兼容性**

- 现代浏览器全面支持（IE10+ 部分支持，需加 `-ms-` 前缀）。
- 移动端兼容性良好。

---

### **总结**

Flexbox 是前端开发中最常用的布局方式，适用于：
✅ **水平/垂直居中**
✅ **导航栏、菜单**
✅ **卡片流式布局**
✅ **等高列布局**
