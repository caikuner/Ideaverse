// 实现 Array flat 方法
/*
Array.prototype.flat() 特性总结：
Array.prototype.flat() 会按照一个可指定的深度递归遍历数组，变成一维的数组。该方法返回一个新数组，对原数据没有影响。

不传参数时，默认为1，可以传入一个整数，表示想要扁平化的层数。
传入 <=0 的整数将返回原数组，不扁平化
Infinity 关键字作为参数时，表示无穷层，无论多少层嵌套，都会转为一维数组

如果原数组有空位，Array.prototype.flat() 会跳过空位。
*/

function myFlat(arr) {
  return arr.reduce((acc, cur) => {
    return acc.concat(Array.isArray(cur) ? myFlat(cur) : cur)
  }, [])
}

// 迭代 bfs
function myFlat(arr) {
  const res = []

  const queue = []
  for (let i = 0; i < arr.length; i++) {
    queue.push(arr[i])

    while(queue.length) {
      const cur = queue.shift()
      if (Array.isArray(cur)) {
        queue.push(...cur)
      } else {
        res.push(cur)
      }
    }
  }

  return res
}


console.log(myFlat([1, [2, [3, [4, [5, 6]]]]]))