---
tags: []
up:
related:
companies:
created: 2025-06-26
modified: 2025-06-27
---

> Q: 列举 js 实现继承的各种方式

#### 1. **原型链继承**

```javascript
function Parent() {
  this.name = 'Parent';
}
Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child() {}
Child.prototype = new Parent(); // 关键继承语句

const child = new Child();
child.sayName(); // "Parent"
```

**特点**：
- 子类实例共享父类引用类型属性
- 无法向父类构造函数传参

#### 2. **构造函数继承（经典继承）**

```javascript
function Parent(name) {
  this.name = name;
}
function Child(name) {
  Parent.call(this, name); // 关键继承语句
}

const child = new Child('Child');
console.log(child.name); // "Child"
```

**特点**：
- 每个实例有独立属性副本
- 无法继承父类原型上的方法

#### 3. **组合继承（最常用）**

```javascript
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 第二次调用父类构造函数
  this.age = age;
}
Child.prototype = new Parent(); // 第一次调用父类构造函数
Child.prototype.constructor = Child; // 修复构造函数指向

const child = new Child('Tom', 10);
child.sayName(); // "Tom"
```

**特点**：
- 结合原型链和构造函数的优点
- 父类构造函数被调用两次

#### 4. **原型式继承**

```javascript
const parent = {
  name: 'Parent',
  sayName() {
    console.log(this.name);
  }
};

const child = Object.create(parent); // 关键继承语句
child.name = 'Child';
child.sayName(); // "Child"
```

**特点**：
- 基于现有对象创建新对象
- ES5 的 `Object.create()` 规范实现

#### 5. **寄生式继承**

```javascript
function createChild(parent) {
  const clone = Object.create(parent); // 创建副本
  clone.sayHi = function() { // 增强对象
    console.log('Hi!');
  };
  return clone;
}

const parent = { name: 'Parent' };
const child = createChild(parent);
child.sayHi(); // "Hi!"
```

**特点**：
- 在原型式继承基础上添加新方法
- 方法不能复用（类似构造函数模式）

#### 6. **寄生组合式继承（ES5 最优解）**

```javascript
function inheritPrototype(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype) // 创建父类原型副本，赋值给子类原型
    Child.prototype.constructor = Child // 修复构造函数
}

function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log(this.name);
};

function Child(name, age) {
  Parent.call(this, name); // 只调用一次父类构造函数
  this.age = age;
}
inheritPrototype(Child, Parent); // 实现原型继承

const child = new Child('Jerry', 8);
child.sayName(); // "Jerry"
```

**特点**：
- 只调用一次父类构造函数
- 原型链保持完整
- ES6 `class` 继承的底层实现

#### 7. **ES6 Class 继承**

```javascript
class Parent {
  constructor(name) {
    this.name = name;
  }
  sayName() {
    console.log(this.name);
  }
}

class Child extends Parent { // extends 关键字
  constructor(name, age) {
    super(name); // 调用父类构造函数
    this.age = age;
  }
}

const child = new Child('Lucy', 12);
child.sayName(); // "Lucy"
```

**特点**：
- 语法糖，底层基于寄生组合式继承
- 使用 `extends` 和 `super` 关键字
- 支持静态方法继承

### 继承方式对比表

| 方式               | 原型继承 | 构造函数继承 | 实例独立属性 | 方法复用 | 调用父类次数 |
|--------------------|----------|--------------|--------------|----------|--------------|
| 原型链继承        | ✓        | ✗            | ✗            | ✓        | 1            |
| 构造函数继承      | ✗        | ✓            | ✓            | ✗        | 多次         |
| 组合继承          | ✓        | ✓            | ✓            | ✓        | 2            |
| 原型式继承        | ✓        | ✗            | ✗            | ✓        | 0            |
| 寄生式继承        | ✓        | ✗            | ✓            | ✗        | 0            |
| 寄生组合式继承    | ✓        | ✓            | ✓            | ✓        | 1            |
| ES6 Class 继承     | ✓        | ✓            | ✓            | ✓        | 1            |

**推荐选择**：
1. 现代项目：优先使用 **ES6 Class 继承**
2. 兼容旧环境：使用 **寄生组合式继承**
3. 简单对象继承：使用 **原型式继承** (`Object.create()`)

> 所有继承方式的本质都是在操作原型链（`[[Prototype]]`）和构造函数之间的关系。
