// 和 all 相反
// 只要有一个fulfilled，就 resolve其结果。但如果全部失败，返回全部失败原因的数组
Promise.any = function (promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("argument must be an array"));
    }
    if (promises.length === 0) {
      return reject(new AggregateError([], "All promises were rejected"));
    }

    const errors = [];
    let rejectedCount = 0
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then(resolve)
        .catch((err) => {
          errors[index] = err;
          rejectedCount++
          if (rejectedCount === promises.length) {
            reject(new AggregateError(errors, "All promises were rejected"));
          }
        });
    });
  });
};



// 测试1: 有一个成功
Promise.any([Promise.reject("error1"), Promise.resolve("success"), Promise.reject("error2")]).then(console.log); // 输出: "success"

// 测试2: 全部失败
Promise.any([Promise.reject("error1"), Promise.reject("error2")]).catch((e) => {
  console.log(e instanceof AggregateError); // true
  console.log(e.message); // "All promises were rejected"
  console.log(e.errors); // ["error1", "error2"]
});

// 测试3: 包含非Promise值
Promise.any(["immediate value", Promise.reject("error")]).then(console.log); // 输出: "immediate value"

// 测试4: 空数组
Promise.any([]).catch((e) => {
  console.log(e instanceof AggregateError); // true
});
