---
tags: []
up:
related:
created: 2025-06-17
modified: 2025-06-17
---

## 什么是闭包？

**闭包（Closure）** 是指一个函数能够记住并访问其词法作用域，即使该函数在其词法作用域之外执行。

简单来说：当一个函数可以**访问并记住它被声明时的作用域**，即使这个函数在其它地方被调用，就形成了闭包。

## 闭包的基本示例

```javascript
function outer() {
  const outerVar = '我在外部函数中';
  
  function inner() {
    console.log(outerVar); // 访问外部函数的变量
  }
  
  return inner;  // ‘闭包函数’
}

const myInner = outer();
myInner(); // 输出: "我在外部函数中"
```

在这个例子中，`inner` 函数就是一个闭包，因为它：
1. 可以访问 `outer` 函数的变量 `outerVar`
2. 即使在 `outer` 函数执行完毕后，仍然能记住并访问这个变量

## 闭包的关键特性

1. **记忆作用域**：闭包会记住它被创建时的环境
2. **持久性**：闭包可以使变量的生命周期延长，超出其原始作用域
3. **私有性**：闭包可以创建私有变量和方法

## 闭包的常见用途

### 1. 创建私有变量

```javascript
function createCounter() {
  let count = 0; // 私有变量
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
console.log(counter.getCount());  // 1
```

### 2. 在函数式编程中的应用

```javascript
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);

console.log(double(5)); // 10
console.log(triple(5)); // 15
```

### 3. 事件处理和回调

```javascript
function setupButtons() {
  const buttons = document.querySelectorAll('button');
  
  for (var i = 0; i < buttons.length; i++) {
    (function(index) {
      buttons[index].addEventListener('click', function() {
        console.log('按钮 ' + index + ' 被点击');
      });
    })(i);  // 可以使用 let 代替这种写法，let 有自己的作用域
  }
}
```

## 闭包的工作原理

1. **作用域链**：每个函数在创建时都会记住自己的词法环境（作用域链）
2. **引用而非复制**：闭包保存的是对外部变量的引用，而不是值的复制
3. **垃圾回收**：只要闭包存在，它引用的变量就不会被垃圾回收

## 闭包的注意事项

1. **内存泄漏**：不当使用闭包可能导致内存无法释放

   ```javascript
   function leakMemory() {
     const bigData = new Array(1000000).fill('*');
     return function() {
       console.log('闭包保留了bigData的引用');
     };
   }
   ```

2. **性能考虑**：过多使用闭包可能影响性能
3. **循环中的闭包**：常见陷阱

   ```javascript
   // 错误示例
   for (var i = 0; i < 5; i++) {
     setTimeout(function() {
       console.log(i); // 总是输出5
     }, 100);
   }
   
   // 正确解决方案
   for (let i = 0; i < 5; i++) {
     setTimeout(function() {
       console.log(i); // 输出0,1,2,3,4
     }, 100);
   }
   ```

## 如何理解闭包的本质？

闭包的本质是 **函数 + 它被创建时的词法环境**。这个环境包含了函数可以访问的所有局部变量、参数和外部作用域的变量。就像是人为构造了一个函数作用域

理解闭包的关键在于认识到：**函数不仅仅是代码，它还携带了创建时的环境**。这使得函数可以 " 记住 " 并访问它被声明时的作用域，即使在其他地方执行。

## 总结

闭包是 JavaScript 中强大而灵活的特性，它：
- 允许函数访问并记住其词法作用域
- 可以创建私有变量和封装功能
- 是许多设计模式和高级编程技巧的基础
- 需要谨慎使用以避免内存问题
