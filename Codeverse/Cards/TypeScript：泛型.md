---
tags: [fe/ts]
up:
related:
rank:
created: 2025-07-10
modified: 2025-07-10
---

泛型 Generics 即通用类型，可以灵活的定义类型而无需写死。

1. 用于函数

```ts
// Type 一般可简写为 T
function fn<Type>(arg: Type): Type {
  return arg;
}
const x1 = fn<string>("xxx");

// 可以有多个泛型，名称自己定义
function fn<T, K>(a: T, b: K) {
  console.log(a, b);
}
fn<string, number>("x", 10);
```

1. 用于 class

```ts
class SomeClass<T> {
  name: T;
  constructor(name: T) {
    this.name = name;
  }
  getName(): T {
    return this.name;
  }
}
const s1 = new SomeClass<String>("xx");
```

1. 用于 type

```ts
function fn<T>(arg: T): T {
  return arg;
}

const myFn: <U>(arg: U) => U = fn; // U T 随便定义
```

1. 用于 interface

```ts
// interface F1 {
//   <T>(arg: T): T;
// }
interface F1<T> {
  (arg: T): T;
}
function fn<T>(arg: T): T {
  return arg;
}
const myFn: F1<number> = fn;
```
