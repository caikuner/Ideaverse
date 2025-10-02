---
tags: []
up:
related:
created: 2025-06-16
modified: 2025-06-16
---

## 如何理解 `z-index`

- `z-index` 是一个 CSS 属性，用于控制元素的堆叠顺序（沿 Z 轴的显示顺序）。值越大，元素越靠前显示，反之值越小，元素越靠后。
- `z-index` 只适用于 **定位** 的元素，需要设置 `position` 属性为 `relative`、`absolute`、`fixed` 或 `sticky`，否则 `z-index` 不生效。
- `z-index` 只在**同级**比较，父子元素的 `z-index` 不会互相影响。
