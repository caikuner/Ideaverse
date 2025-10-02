---
tags:
  - handcode

related: 
rank: "1"
created: 2025-06-16
modified: 2025-06-16
---

```html
<div class="container">
  <img src="x1.png" />
  <p>hello</p>
</div>
```

参考答案

```js
const vnode = {
  tag: 'div',
  props: {
    class: 'container',
  },
  children: [
    {
      tag: 'img',
      props: {
        src: 'x1.png',
      },
    },
    {
      tag: 'p',
      props: {},
      children: ['hello'],
    },
  ],
}
```
