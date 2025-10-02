---
tags: []
up:
related:
companies:
created: 2025-06-21
modified: 2025-06-21
---

```js
function createReactiveArray(target) {
  return new Proxy(target, arrayHandlers);
}

const arrayHandlers = {
  get(target, prop) {
    if (isArrayMethod(prop)) { // 检查是否是变异方法
      return function (…args) {
        track(target, prop); // 追踪依赖
        return Reflect.apply(Array.prototype[prop], target, args);
      };
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    const oldValue = target[prop];
    const result = Reflect.set(target, prop, value);
    if (prop === 'length' || oldValue !== value) {
      trigger(target, prop); // 触发更新
    }
    return result;
  }
};
```
