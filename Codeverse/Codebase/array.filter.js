/*
filter() 方法创建一个新数组, 其包含通过所提供函数实现的测试的所有元素。
var newArray = arr.filter(callback(element[, index[, array]])
[, thisArg])

- callback
- this,默认undefined
- 会跳过稀疏数据（undefined/null不会）
*/

function myFilter(arr, callback, thisArg) {
  if (typeof callback !== "function") throw "参数必须为函数";

  const newArr = [];
  for (let i = 0; i < arr.length; i++) {
    if (i in arr && callback.call(thisArg, arr[i], i, arr)) {
      newArr.push(arr[i]);
    }
  }
  return newArr;
}

function myFilterUseReduce(arr, callback, thisArg) {
  if (typeof callback !== "function") throw "参数必须为函数";

  return arr.reduce((acc, cur, i, arr) => {
    if (callback.call(thisArg, cur, i, arr)) {
      acc.push(cur);
    }
    return acc;
  }, []);
}

// test
const arr = [1, 2, , undefined, null, 4, 5];
console.log(arr.filter((item) => item));
console.log(myFilter(arr, (item) => item));
console.log(myFilterUseReduce(arr, (item) => item));
