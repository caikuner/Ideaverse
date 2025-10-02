---
tags: [handcode]

related: 
rank: "3"
companies:
created: 2025-06-16
modified: 2025-06-24
---

> 手写版：[[instanceof.js]]

- instanceOf 的原理

instanceof 可以判断是否对象是否是某个数据类型的实例，内部机制是通过判断**对象的原型链中是不是能找到类型的 prototype**。

就是说如果有 obj._ proto_ === xxx.prototype，那么 obj 就是 xxx 的实例。

- 实现一下 instanceOf:

    注意边界情况：
    - 构造函数没有 prototype, 比如使用了箭头函数、bind
    - 对象没有隐式原型，比如 Object.create(null)

```js
/**
 * 实现 instanceOf
 * @param {*} obj
 * @param {*} constructor
 */
function _instanceOf(obj, constructor) {
  // 1.注意这里不光要排除obj为空，还要排除 null、undefined的情况，所有类型中只有它们没有原型！
  if (!obj || !constructor || !constructor.prototype) return false;

  const prototype = constructor.prototype;
  let objProto = Object.getPrototypeOf(obj);
  // objProto = obj.__proto__

  while (true) {
    // 原型找到 null 都没找到
    if (objProto===null) return false;

    // 找到返回 true
    if (objProto === prototype) return true;

    // 不断沿着__proto__向上查找原型
    objProto = Object.getPrototypeOf(objProto);
    // objProto = objProto.__proto__
  }
}

// test
const o = {};
console.log(_instanceOf(o, Object))
console.log(_instanceOf(o, Array))


```
