---
tags: [handcode]

related:
rank: "3"
companies:
created: 2025-06-16
modified: 2025-06-24
---

> 手写版：[[new.js]]

new 的过程： [[JS：new 的过程]]

```js
/* 优化
- 直接操作__proto__ 的操作比较耗费性能，不推荐
- 即使操作也要使用 Object.setPrototypeOf
- 推荐直接在创建时指定原型，Object.create(constructor.prototype)
 */
function myNew(constructor, ...args) {
  if (!constructor || !constructor.prototype || typeof constructor !== "function") return;
  // 创建一个空的对象，链接到原型，obj 可以访问构造函数原型中的属性
  const obj = Object.create(constructor.prototype);
  // 绑定 this到对象，并执行
  const res = constructor.apply(obj, args);
  // 优先返回构造函数返回的对象，否则直接返回对象自身。这是 new 的规则
  return res instanceof Object ? res : obj;
}
```

JavaScript 的 `new` 操作符的返回有以下行为规则：

1. **构造函数没有显式返回**：返回新创建的对象 (`obj`)
2. **构造函数返回非对象值**（如原始值：number, string, boolean, null, undefined）：忽略返回值，仍然返回新创建的对象 (`obj`)
3. **构造函数返回对象**（包括数组、函数、日期等）：返回这个结果 (`res`) 而不是新创建的对象
