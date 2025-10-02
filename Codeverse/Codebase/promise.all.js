// 返回一个 Promise，其结果是所有成功了的结果；但只要有一个失败，即失败
Promise.all = function(promises) {
  return new Promise((resolve, reject) => {
    // 如果传入的不是可迭代对象，直接reject
    if (!Array.isArray(promises)) {
      return reject(new TypeError('Arguments must be an array'));
    }

    const results = [];
    let fulfilledCount = 0;
    // 处理空数组情况（根据规范，返回空数组）
    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      // 包裹一下确保每个元素都是Promise
      Promise.resolve(promise)
        .then(value => {
          results[index] = value;
          fulfilledCount++
          // 当所有Promise都完成时，resolve结果数组
          if (fulfilledCount === promises.length) {
            resolve(results);
          }
        })
        .catch(reject) // 任何一个Promise reject，整个就reject
    });
  });
};

Promise.all([new Promise(resolve => resolve(1)), 2, 3]).then(console.log); // 1 2 3