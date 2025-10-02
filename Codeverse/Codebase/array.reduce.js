// js 实现 array reduce
/* reduce
arr.reduce(callback(accumulator, currentValue[, index[, array]]) [, initialValue])
- 一个回调reducer函数 (每一次的返回值作为下一次迭代的第一个参数(累计器))
    acc:累计器累计回调的返回值; 它是上一次调用回调时返回的累积值
    cur:当前元素
    index:可选，当前元素索引
    array:可选，arr
- 一个初始值，默认为arr[0]
- 会跳过空数据（稀疏数组那种，undefined/null不会）
*/
function myReduce(arr, callback, initialValue) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }
  if (!callback || typeof callback !== "function") {
    throw new TypeError("second argument must be a function");
  }
  if (initialValue === undefined && !arr.length) {
    throw new TypeError("Initial value is required");
  }

  let index = 0;
  let result = initialValue;
  if (result === undefined) { // 如果没有初始值, 数组第一个元素作为初始值
    result = arr[0];
    index = 1;
  }
  for (; index < arr.length; index++) {
    if (index in arr) { // 跳过稀疏元素
      result = callback.call(undefined, result, arr[index], index, arr); // result 给下一轮
    }
  }
  return result;
}


// 测试用例：

// 基础功能
console.log(myReduce([1,2,3], (sum, n) => sum + n, 0)) // 6
console.log(myReduce([1,2,3], (sum, n) => sum + n)) // 6 [无初始值]

// 稀疏数组
console.log(myReduce([1,,3], (sum, n) => sum + n, 0)) // 4

// 对象处理
console.log(
  myReduce(
    [{x:1}, {x:2}, {x:3}],
    (acc, cur) => ({x: acc.x + cur.x}),
    {x:0}
  )
) // {x:6}