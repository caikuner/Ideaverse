// 深拷贝，处理循环引用
const isObject = (source) => source !== null && typeof source === 'object'
function cloneDeep(source, map=new WeakMap()) {
  if (!isObject(source)) return source
  if (map.has(source)) return map.get(source)
  
  const target = Array.isArray(source) ? [] : {}
  map.set(source, target)

  for (const key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      // 自身属性
      target[key] = cloneDeep(source[key], map)
    }
  }

  return target
}


// test
a = {b:{c: [1,2,3], d:4}, f:()=>{}}
x = cloneDeep(a)

console.log(a===x)
console.log(x)