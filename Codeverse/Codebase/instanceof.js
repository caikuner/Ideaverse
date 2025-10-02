function myInstanceof(val, constructor) {
  // params verify
  if (!val || !constructor || !constructor.prototype) return false;

  const prototype = constructor.prototype;
  let objProto = Object.getPrototypeOf(val);

  // 通过 __proto__ 不断向上找，直到找到 prototype 或者 null
  while (true) {
    if (!objProto) return false;
    if (objProto === prototype) return true;

    objProto = Object.getPrototypeOf(objProto);
  }
}


// test
const o = {};
console.log(myInstanceof(o, Object))
console.log(myInstanceof(o, Array))