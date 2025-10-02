---
tags: []
up:
related:
created: 2025-06-17
modified: 2025-06-17
---

### Q: 简述如何理解原型的

- 每个 JavaScript 对象都有一个原型对象，用于共享属性和方法.
	- new 对象时，对象的 `__proto__` 指向构造函数的 `prototype` (`myDog.__proto__ → Dog.prototype`)，也就是其原型对象
- 构造函数的 `prototype` 也是一个对象，又向上指，直到指向末端 null
- 构成了一条通过 `__proto__` 链接形成的链式结构，实现继承
- 当访问一个对象的属性时，JavaScript 会：
  1. 先在对象**自身属性**中查找
  2. 如果找不到，就去它的**原型对象**中查找
  3. 如果还找不到，就去**原型的原型**中查找
  4. 依此类推，沿着这条链，直到找到属性或到达原型链末端（**null**）

```text
myDog
  ├── __proto__: Dog.prototype
        ├── __proto__: Animal.prototype
              ├── __proto__: Object.prototype
                    ├── __proto__: null
```

## 一、原型（Prototype）基础

### 1. 什么是原型？

在 JavaScript 中，**每个对象都有一个原型（prototype）对象**，原型对象包含了可以被该对象继承的属性和方法。

### 2. 构造函数、实例和原型的关系

```javascript
function Person(name) {
  this.name = name;
}

// 在原型上添加方法
Person.prototype.sayHello = function() {
  console.log(`Hello, my name is ${this.name}`);
};

const person1 = new Person('Alice');
const person2 = new Person('Bob');

person1.sayHello(); // Hello, my name is Alice
person2.sayHello(); // Hello, my name is Bob
```

- `Person` 是构造函数
- `person1` 和 `person2` 是实例对象
- **`Person.prototype` 是原型对象**

### 3. 原型关系验证

```javascript
console.log(person1.__proto__ === Person.prototype); // true
console.log(Person.prototype.constructor === Person); // true
```

## 二、原型链（Prototype Chain）

### 1. 什么是原型链？

当访问一个对象的属性时，JavaScript 会：
1. 先在对象**自身属性**中查找
2. 如果找不到，就去它的**原型对象**中查找
3. 如果还找不到，就去**原型的原型**中查找
4. 依此类推，直到找到属性或到达原型链末端（**null**）

这种查找机制就形成了**原型链**。

### 2. 原型链示例

```javascript
function Animal(name) {
  this.name = name;
}

Animal.prototype.eat = function() {
  console.log(`${this.name} is eating.`);
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

// 设置原型继承
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

Dog.prototype.bark = function() {
  console.log('Woof!');
};

const myDog = new Dog('Buddy', 'Golden Retriever');

myDog.eat();  // 继承自Animal原型
myDog.bark(); // Dog自身的方法
```

### 3. 原型链图示 ⭐️

```
myDog
  ├── __proto__: Dog.prototype
        ├── __proto__: Animal.prototype
              ├── __proto__: Object.prototype
                    ├── __proto__: null
```

## 三、关键概念详解

### 1. `__proto__` 与 `prototype` 的区别 ⭐️

- `prototype` 是函数特有的属性，指向该函数的原型对象
    - 每个函数在创建之初就有了
    - 箭头函数没有
- `__proto__` 是每个对象都有的属性，指向创建该对象的构造函数的原型

```javascript
function Foo() {}
const foo = new Foo();

console.log(foo.__proto__ === Foo.prototype); // true
console.log(Foo.__proto__ === Function.prototype); // true
```

### 2. 原型链的终点

所有原型链的终点都是 `Object.prototype`，而 `Object.prototype.__proto__` 是 `null`。

```javascript
console.log(Object.prototype.__proto__); // null
```

### 3. 属性查找顺序

```javascript
function Parent() {
  this.a = 1;
}
Parent.prototype.b = 2;

function Child() {
  Parent.call(this);
  this.c = 3;
}
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child;
Child.prototype.b = 4;

const obj = new Child();

console.log(obj.a); // 1 (来自Parent构造函数)
console.log(obj.b); // 4 (来自Child.prototype，覆盖了Parent.prototype.b)
console.log(obj.c); // 3 (来自Child构造函数)
```

## 四、实际应用

### 1. 原型继承的实现

```javascript
function extend(Child, Parent) {
  Child.prototype = Object.create(Parent.prototype);
  Child.prototype.constructor = Child;
}
```

### 2. 检查原型关系

```javascript
console.log(myDog instanceof Dog); // true
console.log(myDog instanceof Animal); // true
console.log(myDog instanceof Object); // true

console.log(Dog.prototype.isPrototypeOf(myDog)); // true
console.log(Animal.prototype.isPrototypeOf(myDog)); // true
```

### 3. ES6 class 语法糖

```javascript
class Animal {
  constructor(name) {
    this.name = name;
  }
  
  eat() {
    console.log(`${this.name} is eating.`);
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }
  
  bark() {
    console.log('Woof!');
  }
}
```

## 五、常见问题

### 1. 为什么修改原型会影响所有实例？

```javascript
function Car() {}
const car1 = new Car();
const car2 = new Car();

Car.prototype.color = 'red';

console.log(car1.color); // red
console.log(car2.color); // red
```

**因为所有实例共享同一个原型对象。**

### 2. 如何避免原型污染？

```javascript
// 不推荐
Array.prototype.myMethod = function() { /*…*/ };

// 更好的方式
class MyArray extends Array {
  myMethod() { /*…*/ }
}
```

### 3. 性能考虑

过长的原型链会影响属性查找性能，应保持合理的继承深度。

## 六、总结

- **原型**：每个 JavaScript 对象都有一个原型对象，用于共享属性和方法
- **原型链**：对象通过 `__proto__` 链接形成的链式结构，实现继承
- **构造函数**：通过 `new` 创建对象时，对象的 `__proto__` 指向构造函数的 `prototype`
- **继承**：JavaScript 通过原型链实现面向对象的继承特性
