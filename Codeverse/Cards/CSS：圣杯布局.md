---
tags:
  - handcode/css
up: 
related: 
rank: "3"
companies: 
created: 2025-06-16
modified: 2025-06-18
---

> Q: 使用 flex 设计一个“四合院/圣杯”布局

![[HTML 和 CSS  前端面试派-GVOrdXMepX.png]]

注意事项：
- html,body 撑满
- flex-direction:column 会竖向排列
- flex：1 [[CSS：Flex：1]]

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>CSS 四合院</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box; /*怪异盒模型，便于布局*/
    }
    html {
      height: 100%;  /*撑满高度*/
    }
    body {
      display: flex;
      flex-direction: column;  /*列排*/
      min-height: 100%;  /*撑满高度*/
      margin: 0;
    }
    #header {
      height: 50px;
      background-color: red;
    }
    #container {
      flex: 1;  /*flex:1,*/
      display: flex;
    }
    #left-container {
      width: 100px;
      background-color: green;
    }
    #main-container {
      flex: 1;
      background-color: #ccc;
    }
    #right-container {
      width: 200px;
      background-color: yellow;
    }
    #footer {
      height: 50px;
      background-color: blue;
    }
  </style>
</head>
<body>
  <header id="header">header</header>
  <section id="container">
    <aside id="left-container">left</aside>
    <section id="main-container">main</section>
    <aside id="right-container">right</aside>
  </section>
  <footer id="footer">footer</footer>
</body>
</html>
```
