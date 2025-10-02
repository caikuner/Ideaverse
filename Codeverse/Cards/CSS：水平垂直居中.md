---
tags:
  - handcode/css
up: 
related: 
rank: "4"
companies: 
created: 2025-06-18
modified: 2025-06-18
---
以下是 CSS 实现 **水平居中**、**垂直居中** 和 **水平垂直居中** 的 **最佳实践方案**（现代浏览器均支持）

### **一、水平居中**

#### 1. **行内/行内块元素**

```css
.parent {
  text-align: center; /* 水平居中 */
}
.child {
  display: inline-block; /* 或 inline */
}
```

#### 2. **块级元素**

```css
.child {
  width: 200px;
  margin: 0 auto; /* 水平居中 */
}
```

#### 3. **Flexbox 方案**

```css
.parent {
  display: flex;
  justify-content: center; /* 水平居中 */
}
```

#### 4. **Grid 方案**

```css
.parent {
  display: grid;
  justify-content: center; /* 水平居中 */
}
```

---

### **二、垂直居中**

#### 1. **单行文本/行内元素**

inline 元素可设置 `line-height` 的值等于 `height` 值，如单行文字垂直居

```css
.parent {
  height: 100px;
  line-height: 100px; /* 等于容器高度 */
}
```

#### 2. IFC 方式

- 当盒子中仅包含内联元素
- 设置其中一个内联元素的 `vertical-align: middle`, 其他行内元素则可以在此父元素下垂直居中。

```html
<div class="container">
  <span class="icon">★</span>
  <span class="text">评分</span>
</div>

.icon {
  vertical-align: middle; /* 图标与文字中线对齐 */
}
```

#### 3. **Flexbox 方案**

```css
.parent {
  display: flex;
  align-items: center; /* 垂直居中 */
}
```

#### 4. **Grid 方案**

```css
.parent {
  display: grid;
  align-items: center; /* 垂直居中 */
}
```

#### 5. **绝对定位 + transform**

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
```

---

### **三、水平垂直居中** ⭐️

#### 1. **Flexbox 终极方案**

```css
.parent {
  display: flex;
  justify-content: center; /* 水平 */
  align-items: center;     /* 垂直 */
}
```

#### 2. **Grid 终极方案**

```css
.parent {
  display: grid;
  place-items: center; /* 水平 + 垂直 */
}
```

#### 3. **绝对定位 + transform**

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

#### 4. **文本 + 行高**（仅限单行文本）

```css
.parent {
  text-align: center;  /* 水平 */
  line-height: 200px;  /* 等于容器高度（垂直） */
}
```

---

### **四、不同场景推荐方案**

| **场景**    | **推荐方案**                     | **兼容性** |
| --------- | ---------------------------- | ------- |
| 现代布局      | Flexbox / Grid               | IE11+   |
| 简单文本      | `text-align` + `line-height` | 全兼容     |
| 复杂元素（如图片） | 绝对定位 + `transform`           | IE9+    |
| 需要响应式     | Flexbox                      | 最佳选择    |

---

### **五、注意事项**

1. **Flexbox/Grid**：优先用于现代项目，避免在需要支持 IE10 以下的环境使用。
2. **绝对定位**：需确保父容器有 `position: relative`。
3. **transform**：可能影响模糊问题，可用 `margin` 替代（需已知子元素尺寸）。

---

### **六、代码示例**

```html
<div class="parent flex-center">
  <div class="child">Flexbox 水平垂直居中</div>
</div>

<style>
  /* Flexbox 方案 */
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
    
    height: 300px;
    border: 1px solid #ccc;
  }

  /* Grid 方案 */
  .grid-center {
    display: grid;
    place-items: center;
  }

  /* 传统方案 */
  .traditional-center {
    position: relative;
  }
  .traditional-center .child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
```
