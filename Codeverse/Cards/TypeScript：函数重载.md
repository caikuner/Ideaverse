---
tags: [fe/ts]
up:
related:
rank:
created: 2025-06-13
modified: 2025-07-10
---

函数重载（Function Overloads）允许一个函数接受不同的参数类型或数量，并返回不同的结果类型，提升类型安全性和代码可读性。
原生 Javascript 没有函数重载。

## **1. 基础语法**

通过 **多次声明函数签名** + **一个实现** 完成重载：

```typescript
// 1. 声明重载签名（无函数体）
function greet(name: string): string;
function greet(age: number): string;

// 2. 实现签名（必须兼容所有重载）
function greet(value: string | number): string {
  if (typeof value === "string") {
    return `Hello, ${value}!`;
  } else {
    return `You are ${value} years old.`;
  }
}

// 调用时根据参数类型推断返回值
const msg1 = greet("Alice"); // string
const msg2 = greet(30); // string
```

---

## **2. 重载的常见场景**

### **(1) 参数数量不同**

```typescript
function createDate(timestamp: number): Date;
function createDate(year: number, month: number, day: number): Date;
function createDate(a: number, b?: number, c?: number): Date {
  return b === undefined ? new Date(a) : new Date(a, b, c);
}

const d1 = createDate(1625097600000); // Date
const d2 = createDate(2023, 5, 15); // Date
```

### **(2) 参数类型不同**

```typescript
function reverse(value: string): string;
function reverse<T>(value: T[]): T[];
function reverse(value: string | any[]): string | any[] {
  return typeof value === "string"
    ? value.split("").reverse().join("")
    : […value].reverse();
}

const s = reverse("abc");  // string
const arr = reverse([1, 2, 3]); // number[]
```

### **(3) 返回类型不同**

```typescript
function parseInput(input: string): number;
function parseInput(input: string, radix: number): string;
function parseInput(input: string, radix?: number): number | string {
  return radix === undefined ? parseInt(input) : parseInt(input, radix).toString(radix);
}

const num = parseInput("42"); // number
const str = parseInput("42", 16); // string ("2a")
```

---

## **3. 重载的规则与限制**

1. **声明顺序**：从最具体到最宽泛（否则会报错）。

   ```typescript
   // 错误：后续签名不兼容
   function fn(x: any): any;
   function fn(x: string): string; // ❌ 此签名被覆盖
   ```

2. **实现签名必须兼容所有重载**：

   ```typescript
   // 正确
   function fn(x: string): string;
   function fn(x: number): number;
   function fn(x: string | number): string | number { … }
   ```

3. **不能通过箭头函数重载**（仅适用于 `function` 关键字）。

---

## **4. 重载 vs. 联合类型**

| **场景**             | **重载**               | **联合类型**           |
| -------------------- | ---------------------- | ---------------------- |
| **参数逻辑差异大**   | ✅（不同分支独立处理） | ❌（需类型守卫）       |
| **返回类型依赖输入** | ✅（精确匹配）         | ❌（返回类型可能混合） |
| **代码简洁性**       | ❌（需多签名）         | ✅（单类型定义）       |

**示例对比**：

```typescript
// 联合类型方案（简单但不够精确）
function greet(value: string | number): string {
  // 需类型检查
  if (typeof value === "string") { … }
}

// 重载方案（更精准的类型推断）
function greet(value: string): string;
function greet(value: number): string;
function greet(value: string | number): string { … }
```

---

## **5. 最佳实践**

1. **优先用联合类型**：如果逻辑简单，避免过度设计。
2. **复杂逻辑用重载**：当参数和返回值关系复杂时（如 `lib.dom.ts` 中的 `addEventListener`）。
3. **文档化重载**：使用 JSDoc 说明每个签名的用途：

   ```typescript
   /**
    * Formats a number as currency.
    * @param amount - The numeric amount.
    */
   function format(amount: number): string;
   /**
    * Formats a string as currency (parsing first).
    * @param text - The string to parse.
    */
   function format(text: string): string;
   function format(value: any): string { … }
   ```

---

## **6. 在类中的重载**

类方法也支持重载：

```typescript
class Logger {
  log(message: string): void;
  log(error: Error): void;
  log(value: string | Error): void {
    if (value instanceof Error) {
      console.error(value.message);
    } else {
      console.log(value);
    }
  }
}
```

---

## **总结**

- **核心作用**：通过多签名精确表达函数的不同调用方式。
- **适用场景**：参数类型/数量影响返回值类型时。
- **替代方案**：简单场景可用联合类型 + 类型守卫。
- **注意事项**：实现签名需覆盖所有重载，且声明顺序从具体到宽泛。

**示例项目**：
查看 TypeScript 标准库（如 `lib.dom.d.ts`）中的 `createElement`、`querySelector` 等，均通过重载实现多态。
