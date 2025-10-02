---
tags: []
up:
related:
created: 2025-06-17
modified: 2025-06-17
---
Promise 是 JavaScript 中处理异步操作的核心机制，它提供了一种更优雅的方式来管理异步代码，避免了传统的回调地狱问题。

## 一、Promise 基本概念

### 1. 什么是 Promise？

Promise 是一个表示异步操作最终完成或失败的对象。它有三种状态：
- **pending**（等待中）：初始状态
- **fulfilled**（已成功）：操作成功完成
- **rejected**（已失败）：操作失败

三个特性：

（1）对象的状态不受外界影响
（2）一旦状态改变（变成成功/失败），就不会再变
（3）构造体内部的代码立即执行 `new Promise(x)中的 x`。一旦创建就会执行，无法中途取消

也就是说：Promise 创建之初就执行完代码了，后面的 then/catch 只是根据状态去执行不同的异步回调而已。

### 2. 创建 Promise

```javascript
const myPromise = new Promise((resolve, reject) => {
  // 异步操作
  setTimeout(() => {
    const success = true; // 模拟操作是否成功
    if (success) {
      resolve('操作成功！'); // 状态变为 fulfilled
    } else {
      reject('操作失败！'); // 状态变为 rejected
    }
  }, 1000);
});
```

## 二、Promise 的使用方法

### 1. 处理 Promise 结果

```javascript
myPromise
  .then((result) => {
    console.log(result); // 操作成功时执行
  })
  .catch((error) => {
    console.error(error); // 操作失败时执行
  })
  .finally(() => {
    console.log('无论成功失败都会执行');
  });
```

### 2. Promise 链式调用

```javascript
function asyncOperation1() {
  return new Promise((resolve) => {
    setTimeout(() => resolve(10), 1000);
  });
}

function asyncOperation2(value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value * 2), 1000);
  });
}

asyncOperation1()
  .then(result1 => {
    console.log('第一步结果:', result1); // 10
    return asyncOperation2(result1);
  })
  .then(result2 => {
    console.log('第二步结果:', result2); // 20
    return result2 + 5;
  })
  .then(finalResult => {
    console.log('最终结果:', finalResult); // 25
  });
```

## 三、Promise 高级用法

### 1. Promise 静态方法

#### Promise.all() - 等待所有 Promise 完成

```javascript
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3])
  .then(values => {
    console.log(values); // [3, 42, "foo"]
  });
```

#### Promise.race() - 第一个完成的 Promise

```javascript
const promise1 = new Promise((resolve) => {
  setTimeout(resolve, 500, 'one');
});
const promise2 = new Promise((resolve) => {
  setTimeout(resolve, 100, 'two');
});

Promise.race([promise1, promise2])
  .then(value => {
    console.log(value); // "two" (因为更快完成)
  });
```

#### Promise.allSettled() - 所有 Promise 都完成（无论成功失败）

```javascript
const promise1 = Promise.resolve(3);
const promise2 = new Promise((_, reject) => {
  setTimeout(reject, 100, 'error');
});

Promise.allSettled([promise1, promise2])
  .then(results => {
    console.log(results);
    // [
    //   { status: 'fulfilled', value: 3 },
    //   { status: 'rejected', reason: 'error' }
    // ]
  });
```

### 2. async/await 语法糖

```javascript
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error('获取数据失败:', error);
  }
}

fetchData();
```

## 四、Promise 实现原理

### 1. 简易 Promise 实现

```javascript
class MyPromise {
  constructor(executor) {
    this.state = 'pending';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
    };

    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
      } else {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });

    return promise2;
  }
}

function resolvePromise(promise2, x, resolve, reject) {
  // 简化实现，完整实现参考Promise/A+规范
  if (x === promise2) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}
```

## 五、Promise 最佳实践

1. **总是返回 Promise**：在 then 回调中返回新的 Promise 或值，以保持链式调用
2. **错误处理**：总是使用 catch 或 try/catch (async/await) 处理错误
3. **避免嵌套**：使用链式调用而非嵌套 Promise
4. **命名 Promise**：给 Promise 变量起有意义的名称，提高代码可读性
5. **合理使用 Promise 静态方法**：根据场景选择 all/race/allSettled 等

## 六、常见问题

### 1. Promise 与回调函数的区别

- Promise 提供了更清晰的链式调用方式
- 错误处理更集中（单个 catch 处理所有错误）
- 避免了回调地狱（Callback Hell）

### 2. Promise 无法取消

一旦创建就会执行，无法中途取消。可以考虑使用 AbortController 等机制。

### 3. 微任务队列

Promise 回调是作为微任务（microtask）执行的，优先级高于宏任务（macrotask）如 setTimeout。

```javascript
console.log('开始');

setTimeout(() => console.log('setTimeout'), 0);

Promise.resolve().then(() => console.log('Promise'));

console.log('结束');

// 输出顺序:
// 开始
// 结束
// Promise
// setTimeout
```

Promise 是现代 JavaScript 异步编程的基石，理解其原理和使用方法对于开发复杂应用至关重要。结合 async/await 语法，可以编写出既高效又易读的异步代码。
