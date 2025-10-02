---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-19
---

## 盒模型

CSS 盒模型本质上是一个盒子，盒子包裹着 HTML 元素，盒子由四个属性组成，从内到外分别是：**content 内容**、**padding 内填充**、**border 边框**、**外边距 margin**

### 两种盒模型

- **W3C 盒子模型 (标准盒模型** content-box) ： 设置的宽高只是内容区域的宽高

![[Pasted image 20250619004409.png]]

- **IE 盒子模型 (怪异盒模型 border-box) : 设置的宽高还包括边框和内边距**

![[Pasted image 20250619004432.png]]

### 如何在 CSS 设置盒模型的解析方式

标准盒模型：`box-sizing: content-box`（默认）

怪异盒模型：`box-sizing: border-box` （这样设置更好布局，注意一下 margin 就好了）

### 背景 background

-color

-image

-repeat 定义背景图像的重复方式

-origin 背景图片的原点位置

-position 相对于原点的初始位置

-size 设置背景图片大小（宽度和高度值），默认 auto auto，不可继承

- 使用关键词 [[https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size$edit#contain]] : 【填充】缩放背景图片并保持图像的宽高比例, 以完全装入背景区，可能背景区部分空白
- 使用关键词 [[https://developer.mozilla.org/zh-CN/docs/Web/CSS/background-size$edit#cover]] : 【覆盖】缩放背景图片并保持图像的宽高比例，以完全覆盖背景区，可能背景图片部分看不见。
- 设定宽度和高度值 auto 或像素值或百分值

-clip 设置元素的背景（背景图片或颜色）是否延伸到边框下面

- **border-box** 背景延伸至边框外沿（但是在边框下层）。
- **padding-box** 背景延伸至内边距（[padding](https://ffb2ecb94ebe97dfaf50bac22a54561e.html)）外沿。不会绘制到边框处。
- **content-box** 背景被裁剪至内容区（content box）外沿。
- **text** 背景被裁剪成文字的前景色。
