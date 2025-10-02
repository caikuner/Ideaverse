---
tags:
  - handcode/css
up: 
related: 
rank: "4"
companies: 
created: 2025-06-16
modified: 2025-06-18
---
Retina 屏幕（高 DPI 设备）下，CSS 的 `1px` 实际上会显示为多个物理像素，导致边框看起来比设计稿更粗。有什么解决方式？

**1.使用 `transform: scale` 实现。（常用方案）**

```css
.border-1px {
  position: relative;
}

.border-1px::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 1px; /* 边框的物理宽度 */
  background-color: black; /* 边框颜色 */
  transform: scaleY(0.5); /* 缩放到 0.5 */
  transform-origin: 0 0; /* 缩放起点 */
}

@media (-webkit-min-device-pixel-ratio: 2) {
  .border-1px::after {
    transform: scaleY(0.5);
  }
}

@media (-webkit-min-device-pixel-ratio: 3) {
  .border-1px::after {
    transform: scaleY(0.33);
  }
}
```

```css
/* 更优雅的写法？待测试 （来自 40 条排坑）*/
.border-1px {
    position: relative;
    width: 200px;
    height: 80px;
}
.border-1px::after {
	position: absolute;
	left: 0;
	top: 0;
	border: 1px solid #f66;
	width: 200%;
	height: 200%;
	content: "";
	transform: scale(.5);
	transform-origin: left top;
}
```

**2.使用 `box-shadow` 模拟边框**

```css
.border-1px {
  position: relative;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.5); /* 通过阴影模拟边框 */
}
```
