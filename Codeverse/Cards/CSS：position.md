---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-19
---

#### position 有哪些值

**定位相关属性** position，left right top bottom , z-index

Position： 改变元素在页面上的位置，避免盒子与盒子之间的重叠。

- stastic : 默认值，元素在文档标准流中正常布局。此时 top, right, bottom, left 和 z-index 属性无效。
  
- relative : 不会脱离标准流，元素位置相对于普通位置（原来的位置）来定位【仍然占据原位置，所以会留下空白】。
  
- absolute : 脱离标准流，元素相对于 position 值不为 static 的第一个祖先元素来定位【不再占据原位置】。如果没有，就相对于初始包含块 body
  
- fixed : 类似 absolute，会创建新的层叠上下文。只是元素相对于整个浏览器视口（也是 body）定位，始终占据同样的位置，即不随页面滚动。不过当元素祖先的 transform 属性非 none 时，包含块由视口改为该祖先。
  
- sticky: 粘性定位，实验性。粘性定位可以被认为是相对定位和固定定位的混合。
  
    - 盒位置根据正常流计算 (这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。例子：
        - { position: sticky; top: 10px; }
    - 在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。
    - 之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下。

#### 为什么说 position absolute 跟 float 影响性能？

- 会开启新的层叠上下文。

position: absolute、fixed 会完全脱离文档流

不再在 z-index:0 层保留占位符，其 left、top、right、bottom 值是相对于自己最近的一个位置设置了 position: relative 或 position: absolute 的祖先元素的；

如果祖先元素都没有设置 position: relative 或 position: absolute，那么就相对于 body 元素。

**position 属性为 absolute 或 fixed 的元素，重排的开销会比较小，因为不用考虑它对其他元素的影响**

float 也能改变文档流

float 会改变正常的文档流排列，影响到周围元素。不同的是，float 属性不会让元素 “上浮” 到另一个 z-index 层，它仍然让元素在 z-index:0 层排列。只能通过 float:left 和 float:right 来控制元素在同层里 “左浮” 和 “右浮”。

**position: absolute 和 float 会隐式地改变 display 类型，会让元素以 display:inline-block 的方式显示。****就算我们显示地设置 display:inline 或者 display:block，也仍然无效。**
