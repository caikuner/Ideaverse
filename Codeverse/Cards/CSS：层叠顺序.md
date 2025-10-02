---
aliases: 
tags:
  - zettel
  - fe/css
up: 
related: 
rank: 
companies: 
url: 
created: 2023-09-03
modified: 2025-06-19
---

## 如何理解 `z-index`

- `z-index` 是一个 CSS 属性，用于控制元素的堆叠顺序（沿 Z 轴的显示顺序）。值越大，元素越靠前显示，反之值越小，元素越靠后。
- `z-index` 只适用于 **定位** 的元素，需要设置 `position` 属性为 `relative`、`absolute`、`fixed` 或 `sticky`，否则 `z-index` 不生效。
- `z-index` 只在**同级**比较，父子元素的 `z-index` 不会互相影响。

## Stacking

最基本的 HTML 页面可以认为是二维的，文本、图像和其他元素依次排列而不重叠 (overlapping)。在这种情况下，只有一个渲染流。
在 CSS 的作用下，页面虽然视觉仍然二维，其渲染层却是三维多层的。每个元素盒子都会有一个三维 z 轴位置，这个 z-axis 属性可以由 `z-index` 控制 。使用 `z-index` 可以在呈现内容时调整对象分层的顺序，也就是允许你在**默认渲染层（图层 0）** 之外的图层上控制放置元素。

### 规则 1：没有 z-index 时的表现

未指定 z-index 的元素：
- background and borders of the root element
- 后代的未定位元素，按照文档流顺序依次从下到上排列 （后来居上）
- 后代的定位元素，按照文档流顺序依次从下到上排列（后来居上）

### 规则 2：float elements

- 浮动元素放置在未定位元素和定位元素之间

问题：==浮动元素，会放到根 html 上；还是放到当前层上的根元素上？？？？？==

### 使用 z-index 控制堆叠级别（Stacking Level）

如果要自定义堆叠顺序，可以在 `定位元素` 上使用 `z-index` 属性。
z-index：
- 如果未指定 z-index 值，大多数浏览器会解释为 z-index:auto, IE6/7 会解释为 z-index:0。从表现上来说都是放到默认渲染层 0
- 如果多个元素有相同的有效 `z-index` 值，==就会被放置在同一个图层上==，在该层上不带 z-index 属性的堆叠部分中介绍的堆叠规则将适用。

#flashcards
Q: `z-index:0` 和 `z-index:auto` 的区别？
- 元素开启定位 (position!=static) 后 z-index 即可生效，默认的，如果未指定 z-index 值，大多数浏览器会解释为 z-index:auto, IE6/7 会解释为 z-index:0。
- 同：从表现上来说，二者同属于当前层级，没有高低之分。都会在默认渲层 0 显示，因此会遵从文档流先后
- 异：z-index:auto 不会创建堆叠上下文；z-index:0 会创建堆叠上下文

## 堆叠上下文 Stacking Context

**是什么？**
- 可以理解为，类似格式化上下文，堆叠上下文的作用就是创建出一个单独隔离的 layer。其所有子元素将被隔离在该层，在该层内遵从文档流的先后，不断向上叠加元素（不会考虑 z-index）

**如何创建出一个堆叠上下文？**
注意：float 不会创建

1. 根堆叠上下文：页面根元素（html 元素）
2. 定位元素的堆叠上下文 （z-index 在定位元素上生效）
    - relative/absolute: z-index 值不是 auto 时会创建堆叠上下文，值为 auto 时则不会
    - fixed/sticky: 会创建
3. CSS 3 与新时代的堆叠上下文
    1. Z-index 值不为 auto 的 flex/grid 子项 (父元素 display:flex|inline-flex)
    2. 元素的 opacity 值不是 1.
    3. 元素的 transform 值不是 none.
    4. 元素 mix-blend-mode 值不是 normal.
    5. 元素的 filter 值不是 none.
    6. 元素的 isolation 值是 isolate.
    7. Will-change 指定的属性值为上面任意一个。
    8. 元素的 -webkit-overflow-scrolling 设为 touch.


**如果堆叠上下文元素不依赖 z-index 数值，则其堆叠顺序是 z-index: auto, 效果上可看成 z:index: 0 级别；**

**如果堆叠上下文元素依赖 z-index 数值，则其堆叠顺序由 z-index 值决定。**

## 总结：堆叠顺序

![[<Pasted image 20230903164355.png>|7 层堆叠结构]]
