---
tags:
  - handcode/css
up: 
related: 
rank: 
companies: 
created: 2025-06-16
modified: 2025-06-20
---

> Q: 什么是 BFC？ 如何触发 BFC？什么是 IFC

### BFC

BFC (Block formatting context) 直译为 " 块级格式化上下文 "。它是**一个独立的渲染区域，与这个区域外部毫不相干**。即，BFC 里面的的内容再怎么发生变化，也不会影响到 BFC 外面的布局。

#### 触发 BFC 的方式 👈

- 根元素
- 浮动元素：`float` 属性不为 `none`
- 绝对定位元素：`position` 为 `absolute` 或 `fixed`
- `display` 为 `inline-block` `table-cell` `table-caption` `flex` `inline-flex`
- `overflow` 不为 `visible`(hidden、auto、scroll)
- `display: flow-root`（新语法，用来语义化、安全地创建 BFC，无其他效果）👈

最常被用来的方式：
- `overflow: hidden` 之前是这个
- `display: flow-root` 优先使用这个，非常安全、语义化，且不会裁剪内容、影响滚动

#### BFC 渲染规则

- 内部块级盒子垂直方向排列
- 盒子垂直距离由 margin 决定，同一个 BFC 盒子的外边距会重叠
- BFC 就是一个隔离的容器，内部子元素不会影响到外部元素
- **BFC 的区域不会与 float box 叠加**
- 每个元素的左 margin， 与包含块的左边相接触 (对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
- 计算 BFC 高度时，浮动元素也会参与计算


BFC 的用途：
- 清除浮动
- 解决外边距合并 (塌陷) 问题
- 布局

#### 用来清除浮动

```css
/* 传统方法 */
.clearfix::after {
  content: "";
  display: table;
  clear: both;  /*both实际只会清除一边*/
}

/* 现代方法 */
.clearfix {
  display: flow-root;
}
```

#### 用来防止外边距合并坍缩

```html
<section style="margin-bottom: 20px;">
  <div style="display: flow-root; margin-top: 30px;">
    <!-- 外边距不会合并 -->
  </div>
</section>
```

### IFC

既然块级元素会触发 BFC，那么内联元素会触发的则是 IFC。IFC 的全称是 Inline Formatting Contexts，也就是 “内联格式化上下文”。

#### 触发 IFC 的方式

形成条件：块级元素中**仅包含**内联级别元素。
需要注意的是，当 IFC 中有块级元素插入时，会产生两个匿名块将父元素分割开来，产生两个 IFC。
![[Pasted image 20250616105142.png]]

#### IFC 渲染规则

- 内部的 box 水平方向
    - 横向排列，且起点为外部盒子**顶部**
    - 内部的 box 横向样式空间**有效** `(padding、border、margin)`
    - 水平对齐方式：
        - 当 inline-level boxes 的总宽度少于包含它们的 line box 时，其水平渲染规则由 **text-align** 属性值来决定。
        - 当一个 “inline box” 超过父元素的宽度时，它会被分割成多个 boxes，这些 boxes 分布在多个 “line box” 中。如果子元素未设置强制换行的情况下，“inline box” 将不可被分割，将会**溢出父元素**。
- 内部的 box 水平方向垂直方向
    - 垂直方向样式空间**不会被计算**，`(padding、border、margin)`
    - 对齐方式：用 `vertical-align` 控制，以它们的底部、顶部对齐，或以它们里面的文本的基线（baseline）对齐（默认，文本与图片对其），例：line-heigth 与 vertical-align。
- float 元素会优先排列

#### 用来设置居中

- 水平居中：当一个块要在环境中水平居中时，设置其为 **inline-block** 则会在外层产生 IFC，通过 **text-align** 则可以使其水平居中。
    
- 垂直居中：创建一个 IFC，用其中一个元素撑开父元素的高度，然后设置其 **vertical-align:middle**，其他行内元素则可以在此父元素下垂直居中。

```html
<div class="container">
  <span class="icon">★</span>
  <span class="text">评分</span>
</div>

.icon {
  vertical-align: middle; /* 图标与文字中线对齐 */
}
```
