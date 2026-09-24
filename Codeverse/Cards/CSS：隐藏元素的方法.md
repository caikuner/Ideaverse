---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-19
---

#### 隐藏元素的方法和区别

- display：none; 隐藏元素 不占据空间,生成 render 树时会去除；会引起重渲染与回流，影响性能。
- visible：hidden; 隐藏元素，但占据空间；无重渲染与回流。
- opacity: 0; 严格来说这个并不是隐藏，透明之后它还占据着页面位置，事件绑定也能正常点击，在重排的时候还是会被计算消耗性能。而且会被子元素继承！
- rgba(255,255,255,255): 也是实现透明，但只作用于当前原色的颜色或背景色，不会被子元素继承；
- height:0;overflow:hidden; 溢出隐藏，就是宽、margin、padding 都还在；相对于 display 来说适用范围太窄，但是好处是能使用 CSS3 动画。
- position: absolute; left: -9999px; 通过移出可见区域来达到隐藏，效果还可以，就是看着比较恶心

#### rgba () 和 opacity 的透明效果有什么不同？

rgba () 和 opacity 都能实现透明效果，最⼤的不同是：

- opacity 作⽤于元素，以及元素内的所有内容的透明度。会被子元素继承！
- rgba () 只作⽤于元素的颜⾊或其背景⾊（⼦元素不会继承透明效果！）
