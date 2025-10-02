// 返回一个 Promise，状态是第一个运行完的状态（不管成败）
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    // 检查输入是否为数组
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Arguments must be an array"));
    }

    // 处理空数组情况（根据规范，空数组会永久pending）
    if (promises.length === 0) {
      return;
    }

    promises.forEach((promise) => {
      // Promise.resolve包裹一下 确保每个元素都是Promise
      Promise.resolve(promise)
        .then(resolve) // 第一个resolve的结果
        .catch(reject); // 或第一个reject的结果
    });
  });
};
