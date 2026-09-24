---
tags: []
up:
related:
created: 2025-07-10
modified: 2025-07-10
---

### interface

interface 用于描述一个对象的结构，支持继承、同名接口自动合并。

```ts
interface User {
  name: string;
  age: number;
}

const user: User = {
  name: "John Doe",
  age: 30,
};

// 继承
interface User2 extends User {
  birthday: string;
}

let user2: User2 = {
  name: "John Doe",
  age: 30,
  birthday: "1999-01-01",
};
```

#### type vs. interface

type 和 interface 有很多相同之处，很多人因此而产生“选择困难症”，这也是 TS 热议的话题。

共同点

- 都能描述一个**对象结构**
- 都能被 class 实现
- 都能被扩展

区别

- type 可以声明基础类型
- type 有联合类型和交叉类型
- type 可以被 `typeof` 赋值
- interface 支持自动合并：
  - **同名的 interface 会自动合并属性**
- **`interface` 天然支持继承（`extends`）**：
  - 比 `type` 的交叉类型（`&`）更直观
- interface 的错误信息更友好
  - TypeScript 对 interface 的类型检查会直接显示字段名，而 type 可能展示为复杂的别名（尤其在联合类型时）。
- interface 的类型检查有缓存，更高效

**如何选择？**

- 能用 interface 就**尽量用 interface**
- 除非必须用 type 的时候才用 type
