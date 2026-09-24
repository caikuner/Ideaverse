// class Parent {
//   constructor(name) {
//     this.name = name
//   }
// }
// class Child extends Parent {
//   constructor(name) {
//     super(name); // 必须优先调用，相当于 Parent.call(this,name)
//   }
// }

function Parent(name) {
  this.name = name;
  console.log(this.name);
}
function Child(name) {
  Parent.call(this, name); // 1.构造函数继承
}

function inheritPrototype(Child, Parent) {
  // 2.寄生式继承
  Child.prototype = Object.create(Parent.prototype); // 创建父类原型副本，赋值给子类原型
  Child.prototype.constructor = Child; // 修复构造函数
}
inheritPrototype(Child, Parent);

// use
const c = new Child("x");
console.log(c.name); // 'father'
