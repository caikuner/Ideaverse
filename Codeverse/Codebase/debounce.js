/* 防抖
 * 含义：delay 时间内，不管触发几次，都只实际执行一次
 * 执行时机：第一次/最后一次触发
 * 使用场景：点按按钮、文本框搜索框输入等，防止多次触发事件
 */

// 最后一次执行
function debounce(fn, delay) {
  let timer = null; // 通过闭包缓存一个定时器 id
  // 返回函数
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer); // 清空上次设定、但是没有触发函数执行的定时器
    // 设定一个新的定时器，定时结束时执行
    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, delay);
  };
}

function debounceWithImmediate(fn, delay, immediate = true) {
  let timer = null;
  return function (...args) {
    const context = this;
    timer && clearTimeout(timer);

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    timer = setTimeout(() => {
      !immediate && fn.applay(context, args);
      timer = null;
    }, delay);
  };
}

// 使用示例
(function test() {
  const debounceLog = debounce((n) => console.log(n), 3000);

  debounceLog(1); // 1不打印
  debounceLog(2);
  setTimeout(() => {
    debounceLog(3);
  }, 7000);
})();

(function test() {
  const debounceLog = debounceWithImmediate((n) => console.log(n), 3000);

  debounceLog(4);
  debounceLog(5); // 5不打印
  setTimeout(() => {
    debounceLog(6);
  }, 7000);
})();
