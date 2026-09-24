---
tags: []
up:
related:
created: 2025-06-16
modified: 2025-06-16
---

### 为什么要箭头函数

### 箭头函数讲解

- **箭头函数写法更简单**
- **没有 arguments**
- **没有 this，也无法改变 this**
- **没有 prototype 属性，因此不能作为构造函数来实例化对象**
- **不能用作 Generator 函数**
- **箭头函数内部不可以使用 super 关键字**

**对于普通函数：**

每个函数调用时，内部存在两个特殊对象：

- arguments ：包含调用函数时传入的所有参数的类数组对象，**箭头函数没有**
- **this**：**箭头函数没有**，它在定义时就确定了

每个函数定义时，都有两个属性：

- `length`：函数定义时的命名参数的个数 ->**箭头函数也有!!!**
- prototype : 原型对象 **箭头函数没有**

插播：注意函数的 length 属性值

- 扩展运算符 只是一个不定参数的语法糖，无法影响 length 属性值
- 不管是普通函数的 argument.length，还是所有函数的 length 属性，都无法知道 `…` 的具体存在。
- 因为都是按照调用函数时实际传入的参数来一个一个地接收参数，直到接收完毕
- 赋予了默认值的参数，无法影响 length 属性值
- 至少在定义时，赋予默认值的参数就不被当成参数，而是具体值了
- 后面的调用传参，只是更改了值
- 所以下例中的三个函数 length 值都是 `2`

```

// 命名函数
function f1(a, b, c = 1, …args) {
  console.log(arguments) // 类数组对象
  console.log(arguments?.length) // 4
  console.log(this) // window：调用者
}
console.log(f1.prototype) // 原型对象
console.log(f1.length) // 2

// 匿名函数, 和普通命名函数没啥不同, 不用看
let f2 = function (a, b, c = 1, …args) {
  console.log(arguments) // 类数组对象
  console.log(arguments?.length) // 4
  console.log(this) // window：调用者
}
console.log(f2.prototype) // 原型对象
console.log(f2.length) // 2

// 箭头函数
let f3 = (a, b, c = 1, …args)=>{
  // console.log(arguments) // 报错, arguments is not defined
  // console.log(arguments.length) // 报错
  console.log(this) // window : 定义该函数时的上下文
}
console.log(f3.prototype) // undefined
console.log(f3.length) // 2

f1(1, 2, 3,4);
f2(1, 2, 3, 4);
f3(1, 2, 3, 4);

console.log('end')

```

**箭头函数的不同：**

- **箭头函数写法更简单**
  - `let fun = (params) => { // 函数体 };`
  - 但是注意，箭头函数不能换行

```
var func = ()
           => 1; // SyntaxError: expected expression, got '=>'
```

- **还要注意**，箭头函数的一个返回值简写。
- 简单返回**对象字面量 {},会识别为函数块**
- 除非加个 () 括起来，或者显式 return

```

let fn =(a,b)=> a+ b; // √
let fn =(a,b)=> { a+b }; // X, 会识别为函数体{}，返回值 undefined
let fn =(a,b)=> {return a+ b}; // √
let fn =(a,b)=> ({a+ b}); // √

let fn =(a,b)=> { foo: a+b }; // 返回值 undefined
let fn = () => { foo: function() {} }; // SyntaxError: function statement requires a name

let fn =(a,b)=> ( a+b );fn(1,2) // √ 3
let func = (a,b) => ({ foo: a+b }); func(1,2) // √ {foo: 3}

```

- **没有 arguments**
- 在箭头函数中访问 arguments 实际上获得的是外层局部（函数）执行环境中的值
- 想获取参数可以使用剩余参数语法代替

```

let f = (…args) => {
 console.log(args)
}
f(1,2,3) // [1,2,3]

```

- **没有 this，也无法改变 this**
- 箭头函数不会创建 this，它会捕获自己在**定义**时（是定义时，不像普通函数是调用时）所处的外层执行环境的 this，并继承这个 this 值。
- 所以，箭头函数中 this 的指向在它被定义的时候就已经确定了，之后即使 bind、apply、call 也不会改变。
- **没有 prototype 属性，因此不能作为构造函数来实例化对象**
- 构造函数的 new 操作分为四步：创建一个空对象 -> 链接到原型 -> 绑定 this 值 -> 返回新对象
- 箭头函数无法完成上述操作，因此作为构造函数来 new 会报错
- **不能用作 Generator 函数**, 不能使用 yield 关键字 （ES 规范内没有相应的语法实现）
- **箭头函数内部不可以使用 super 关键字**

```

let a = {
    x(){
        console.log('x')
    }
};

let b = {
    y:()=>{
        super.x();//报错：Uncaught SyntaxError: 'super' keyword unexpected here
    }
}
Object.setPrototypeOf(b,a);
b.y();

```

### 对比：箭头函数和普通函数

| 特性                       | 箭头函数                                       | 普通函数                              |
| -------------------------- | ---------------------------------------------- | ------------------------------------- |
| 语法                       | =>                                             | 使用 `function` 定义                  |
| `this` 绑定                | 词法绑定，继承外层 `this`                      | 动态绑定，调用时决定                  |
| `arguments` 对象           | 没有，需要使用 `…args`                         | 有自己的 `arguments` 对象             |
| 是否能作为构造函数         | 不能                                           | 可以                                  |
| 是否有 `prototype` 属性    | 没有                                           | 有                                    |
| 是否支持 `bind/call/apply` | 不支持                                         | 支持                                  |
| 适用场景                   | 用于回调函数、闭包、需要继承外层 `this` 的场景 | 需要动态绑定 `this`，或用作构造函数时 |

```js
// 箭头函数 this
const obj = {
  name: "Alice",
  say: () => {
    console.log(this.name); // undefined (继承全局作用域的 this)
  },
};
obj.say();

// 普通函数 this
const obj = {
  name: "Alice",
  say: function () {
    console.log(this.name); // "Alice" (this 指向 obj)
  },
};
obj.say();

// 箭头函数 不能作为构造函数
const Person = (name) => {
  this.name = name;
};
const p = new Person("Alice"); // TypeError: Person is not a constructor

// 普通函数 构造函数
function Person(name) {
  this.name = name;
}
const p = new Person("Alice");
console.log(p.name); // "Alice"

// 箭头函数 ...args
const add = (...args) => {
  console.log(args); // [1, 2, 3]
};
add(1, 2, 3);

// 普通函数 arguments
function add() {
  console.log(arguments); // Arguments(3) [1, 2, 3]
}
add(1, 2, 3);

// 箭头函数 不支持 `bind/call/apply`
const obj = {
  value: 42,
};
const arrowFn = () => {
  console.log(this.value);
};
arrowFn.call(obj); // undefined

// 普通函数 支持 `bind/call/apply`
const obj = {
  value: 42,
};
function normalFn() {
  console.log(this.value);
}
normalFn.call(obj); // 42
```

## 什么时候不能使用箭头函数

1. 需要动态绑定 `this` 的场景。
2. 作为 `构造函数`。
3. 需要 `arguments` 对象的场景。
4. 需要显式修改 `this` 的场景（使用 `bind/call/apply` 等）。
5. 类的实例方法（特别是 `getter 和 setter`）。—— 无法动态绑定 `this`

### Babel 会将箭头函数编译成什么

1. **编译成普通函数**
2. **当用到 this 和\*\***arguments 时,\***\*存储\*\***外部值，生成临时变量**`**\_this**`**和**`**\_arguments\*\*`
3. **由于编译后是普通函数，所以具有**`**prototype**`**属性，使用**`**new实例化**`**也不会报错**

这样一来，和普通函数就没啥区别了。

编译前：

```

let A = ()=>{
  console.log(this.foo)//undefined
  console.log(this);//window
  console.log(arguments);//ReferenceError: arguments is not defined
}
let b = {
foo:'foo'
}
A.call(b);
console.log(A.prototype)//undefined
let a = new A();//TypeError: A is not a constructor

```

编译后：

```

var _arguments = arguments,
    _this = this;

var A = function A() {
  console.log(_this.foo); //undefined

  console.log(_this); //window

  console.log(_arguments); //ReferenceError: arguments is not defined
};

var b = {
  foo: 'foo'
};
A.call(b);
console.log(A.prototype); //{constructor:f}
var a = new A(); //不会报错

```
