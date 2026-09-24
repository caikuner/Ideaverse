Promise.allSettled = function (promises) {
  return new Promise((resolve) => {
    let results = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }
    promises.forEach((p, i) => {
      Promise.resolve(p)
        .then(
          (value) => {
            results[i] = { status: "fulfilled", value };
          },
          (reason) => {
            results[i] = { status: "rejected", reason };
          },
        )
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    });
  });
};

// 测试
Promise.allSettled([Promise.resolve(1), Promise.reject(2), Promise.resolve(3)]).then(console.log);
