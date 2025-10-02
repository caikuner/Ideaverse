function Fun(){}

const fun = new Fun()


// 写出 fun 和 Fun 的原型链

// fun 
//   → __proto__: Fun.prototype 
//     → __proto__: Object.prototype 
//       → __proto__: null

// Fun 
//   → __proto__: Function.prototype 
//     → __proto__: Object.prototype 
//       → __proto__: null