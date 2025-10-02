function myNew(constructor, ...args){
  if (!constructor || !constructor.prototype || typeof constructor !== 'function') {
    throw new Error("参数 Error")
  }

  const obj = Object.create(constructor.prototype)
  const res = constructor.call(obj, ...args)
  return res instanceof Object ? res : obj
}


// 创建一个空的对象，链接到原型
// 绑定 this到对象，并执行
// 优先返回构造函数返回的对象，否则直接返回对象自身。