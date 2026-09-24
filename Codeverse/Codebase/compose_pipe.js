// 函数组合是函数式编程中的一个重要概念，它将多个函数组合成一个函数执行。
// compose：从右到左执行，即数据流是从最后一个函数开始，逐步传递到第一个函数
// pipe：反之，从左到右执行
//
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((y, f) => f(y), x);
  };
}

function pipe(...fns) {
  return function (x) {
    return fns.reduce((y, f) => f(y), x);
  };
}

// test
const f1 = () => console.log(1);
const f2 = () => console.log(2);
const f3 = () => console.log(3);

compose(f1, f2, f3)(); // 3,2,1
pipe(f1, f2, f3)(); // 1,2,3

// 追问：可以做哪些改进
// 1. 支持异步函数
//  2.错误处理
async function composeAsync(...fns) {
  return fns.reduce((a, b) => async (...args) => {
    const result = await b(...args);
    return a(result);
  });
}
function composeWithError(...fns) {
  return fns.reduce((a, b) => (...args) => {
    try {
      const result = b(...args);
      return a(result);
    } catch (error) {
      console.error("Error in compose:", error);
      throw error;
    }
  });
}
