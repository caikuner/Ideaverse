---
tags: []
up:
related:
companies:
created: 2025-06-19
modified: 2025-06-19
---

## CSS 样式继承

CSS 的继承特性指的是应用在一个标签上的一些 CSS 属性被传递到其子标签上。

有继承性的元素属性会默认继承，这些属性是标签最先应用的，会被标签的\*\*自身样式 (包括默认和自定义) 所覆盖。当然开发者自己 inherit 的不在此列。

### 有继承性的属性

都是一些希望复用的属性，免得重复添加，增加样式表复杂度

- **字体系列属性**
  - font-
- **文本系列属性**
  - color
  - text-indent text-align text-transform(大小写)
- **line-height**
  - word-spacing letter-spacing
  - direction
- **元素可见性**
  - visibility
- **表格布局属性**
  - caption-side 标题的位置
  - border-collapse  表格的边框是否被合并为一个单一的边框
  - border-spacing  相邻单元格的边框间的距离
  - empty-cells 是否显示表格中的空单元格
  - table-layout 显示表格单元格、行、列的算法规则
- **列表布局属性**
  - list-style `list-style-type || list-style-image || list-style-position`
- **生成内容属性**
  - quotes 设置嵌套引用（embedded quotation）的引号类型
- **光标属性**
  - cursor
- **页面样式属性**
  - page 检索或指定显示对象容器时使用的页面类型
  - page-break-inside 设置元素内部的 page-breaking 行为
  - orphans 设置或返回一个元素必须在页面底部的可见行的最小数量，只用于块级元素
  - windows 表示当页面内部要分页的时候必须在页面顶部保留的最少行数
- **声音样式属性**
  - speak 各个系列
  - volume 音量
  - voice-family 设置或检索当前声音类型
  - pitch 指定讲话声音
  - pitch-range 指定讲话声音的变化
  - stress 讲话声音在指定的地方 " 重音 "
  - richness 设置或检索当前声音的音色
  - azimuth 设置声音应该来自哪里
  - elevation 设置或检索当前声音的音源仰角

### 无继承性的属性

- **文本属性：**
  - vertical-align 垂直文本对齐
  - text-decoration 规定添加到文本的装饰
  - none：标准文本；
  - underline：定义文本下划线；
  - overline：定义文本上的一条线；
  - line-through：穿过文本的一条线；
  - blink：闪烁文本；
  - inherit：继承父元素的 text-decoration 属性。
  - text-shadow 文本阴影效果
  - white-space 空白符的处理
  - unicode-bidi 设置文本的方向
- **盒子模型的属性**
  - display
  - width height
  - margin
  - padding
  - background 背景
  - **border** 边框
  - outline 轮廓
- **浮动 定位属性**
  - float、clear、position、top、right、bottom、left
  - min-width、min-height、max-width、max-height
  - overflow、clip、z-index
- **生成内容属性**
  - content、counter-reset、counter-increment
- **页面样式属性**
  - size、page-break-before、page-break-after
- **声音样式属性**
  - pause-before、pause-after、pause、cue-before、cue-after、cue、play-during

### 人为控制继承

- [inherit](https://developer.mozilla.org/zh-CN/docs/Web/CSS/inherit) 强制继承，它对继承和非继承属性都生效。
- [initial](https://developer.mozilla.org/zh-CN/docs/Web/CSS/initial) 恢复为用户代理（浏览器）的默认初始值
- [unset](https://developer.mozilla.org/zh-CN/docs/Web/CSS/unset) ‘不设置’自身样式，尝试从其父级继承，将该属性重新设置为继承的值。如果没有继承父级样式，则将该属性重新设置为初始值。
- [revert](https://developer.mozilla.org/en-US/docs/Web/CSS/revert) 恢复为用户代理（浏览器）的默认值，但如果存在用户样式表，在这种情况下恢复为该样式表的值。

### 注意

不是说有所有都可以继承生效，还要遵循 CSS 的规则，比如

- 内联元素就不可以继承 text-indent、text-align …
