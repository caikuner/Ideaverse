/* array map
 创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。（所以会比forEach慢）

var new_array = arr.map(function callback(currentValue[, index[, array]]) {} [, thisArg])
- callback处理函数,有三个可选参数 currentValue,index,array
- thisArg,默认undefined
- 会跳过稀疏数据（undefined/null不会）
*/

function myArrayMap(arr, callback, thisArg) {
  if (typeof callback !== "function") throw "参数必须为函数";

  const newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr) {
      // 跳过稀疏数据
      newArray.push(callback.call(thisArg, arr[i], i, arr));
    }
  }
  return newArray;
}

// 方法2：reduce实现
function myArrayMapUseReduce(arr, callback, thisArg) {
  if (typeof callback !== "function") throw "参数必须为函数";

  return arr.reduce((acc, cur, i, array) => {
    // reduce 本身就会跳过稀疏元素，所以不用再判断
    acc.push(callback.call(thisArg, cur, i, array));
    return acc;
  }, []);
}

// 使用示例
const numbers = [1, 2, , undefined, null, 3, 4];
console.log(myArrayMap(numbers, (item) => item + "_h"));
console.log(myArrayMapUseReduce(numbers, (item) => item + "_h"));
