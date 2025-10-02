---
tags:
  - handcode

related: 
rank: "3"
created: 2025-06-16
modified: 2025-06-17
---
- ES6 语法

```js
class Parent {
  constructor(name) {
    this.name = name
  }
}
class Child extends Parent {
  constructor(name) {
    super(name); // 必须优先调用，相当于 Parent.call(this,name)
  }
}

// use
const c = new Child('father')
console.log(c.name) // 'father'
```

- ES5 寄生组合继承 [[JS：理解原型和原型链]]

```js
function Parent(name) {}
function Child() {
  Parent.call(this); // 借用构造函数继承属性，如果有属性要带上
}

Child.prototype = Object.create(Parent.prototype); // 从原型链继承方法
// ⬆️ 会导致：Child.prototype.constructor = Parent.prototype.constructor

Child.prototype.constructor = Child; // 修复 constructor 指向



// 验证：
const child = new Child();
console.log(child.constructor === Child); // true
console.log(Child.prototype.constructor === Child); // true
console.log(Child.prototype.__proto__ === Parent.prototype); // true（继承关系保留）

```

- 组合继承

```js
Child.prototype = new Parent()
```
