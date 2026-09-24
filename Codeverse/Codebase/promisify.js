// js: 实现 promisify
// 把异步回调函数形式，转换成Promise, 后续可以.then操作
// callback(err, ...results) 转变成  fn => promise

// 1. 捕获调用错误
// 2. 使用 call 保留原始 this 绑定, 注意 call 的参数是展开形式
// 3. 传递外部参数 args
// 4. 注册自定义回调 (err, data) => {}, 注意兼容 data 多返回值场景

function promisify(fn) {
  return function (...args) {
    const context = this;
    return new Promise((resolve, reject) => {
      try {
        fn.call(context, ...args, (err, ...results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results.length > 1 ? results : results?.[0]);
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  };
}

// 测试用例
// 基础功能测试
const delay = promisify((ms, cb) => setTimeout(cb, ms));
delay(100).then(() => console.log("done"));

// 错误处理测试
const failFn = promisify((cb) => cb(new Error("test")));
failFn().catch((err) => console.log(err.message)); // "test"

// 多参数测试
const multiFn = promisify((cb) => cb(null, 1, 2));
multiFn().then(console.log); // [1, 2]
