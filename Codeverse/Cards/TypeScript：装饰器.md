---
tags: [fe/ts]
up:
related:
rank:
created: 2025-07-10
modified: 2025-07-10
---

TS 的 Decorators 装饰器可以方便地注入方法。JS 原生语法已经有提案，但尚未正式支持。

```ts
function log(target: Object, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with arguments: ${args}`);
    return originalMethod.apply(this, args);
  };

  return descriptor;
}

class Calculator {
  @log // 自动注入
  add(a: number, b: number): number {
    return a + b;
  }
}

const calculator = new Calculator();
calculator.add(1, 2);
// Output: Calling add with arguments: 1,2
// Output: 3
```
