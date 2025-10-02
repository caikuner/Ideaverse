---
tags:
  - handcode

related: 
rank: "2"
created: 2025-06-16
modified: 2025-06-16
---
获取详细的变量类型

参考答案

```js
function getType(data) {
  // 获取到 "[object Type]"，其中 Type 是 Null、Undefined、Array、Function、Error、Boolean、Number、String、Date、RegExp 等。
  const originType = Object.prototype.toString.call(data)
  // 可以直接截取第8位和倒数第一位，这样就获得了 Null、Undefined、Array、Function、Error、Boolean、Number、String、Date、RegExp 等
  const type = originType.slice(8, -1)
  // 再转小写，得到 null、undefined、array、function 等
  return type.toLowerCase()
}
```
