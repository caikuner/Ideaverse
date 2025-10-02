// 柯里化（Currying）是函数式编程的一个重要概念，它是把接受多个参数的函数变换成接受一个单一参数的函数，并且返回一个新函数，新函数会接受余下的参数，直至全部参数接收完毕返回结果。
// 通俗理解就是：多项式->单项式, add(1,2,3) -> add(1)(2)(3)
// 实际利用了闭包，参数多的时候内存占用高；好处是适用性更好，就像二次封装，不用管参数

function curry(fn) {
  return function curried(...args) {
    const context = this;
    if (args.length >= fn.length) {
      // 参数足够时：执行并返回结果，注意修正 this
      return fn.apply(context, args);
    } else {
      // 参数不够时：收集参数，并返回偏函数。用于后续调用继续收集参数
      return function (...nextArgs) {
        return curried.apply(context, args.concat(nextArgs));
      };
    }
  };
}


// 追问：支持占位符，用于延迟参数
function curryWithFilled(fn, placeholder = '_') {
  const length = fn.length

  return function curried(...args) {
    // 检查是否所有参数都已经填充（不包含占位符）
    const checkFilled = (args) => {
      // 统计非占位符的参数个数
      const filledArgsCount = args.filter((arg) => arg !== placeholder).length
      return filledArgsCount >= length
    }

    // 合并新旧参数，处理占位符
    const mergeArgs = (existingArgs, newArgs) => {
      const result = [...existingArgs]
      let newArgsIndex = 0

      // 遍历现有参数，将占位符替换为新参数
      for (let i = 0; i < result.length && newArgsIndex < newArgs.length; i++) {
        if (result[i] === placeholder) {
          result[i] = newArgs[newArgsIndex++]
        }
      }

      // 将剩余的新参数添加到结果中
      return result.concat(newArgs.slice(newArgsIndex))
    }

    const mergedArgs = mergeArgs(args, [])

    // 如果参数已经足够，执行原函数
    if (checkFilled(mergedArgs)) {
      // 过滤掉占位符
      const finalArgs = mergedArgs.slice(0, length).filter((arg) => arg !== placeholder)
      return fn.apply(this, finalArgs)
    }

    // 否则继续返回柯里化函数
    return function (...nextArgs) {
      return curried.apply(this, mergeArgs(mergedArgs, nextArgs))
    }
  }
}

// 使用示例
const add = (a, b, c) => a + b + c
const curriedAdd = curryWithFilled(add)
const _ = '_' // 占位符

console.log(curriedAdd(1)(2)(3)) // 6
console.log(curriedAdd(1, 2)(3)) // 6
console.log(curriedAdd(1)(_, 3)(2)) // 6
console.log(curriedAdd(_, 2)(1)(3)) // 6
console.log(curriedAdd(_, _, 3)(1)(2)) // 6