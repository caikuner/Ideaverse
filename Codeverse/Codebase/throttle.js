/* 节流
 * 含义：固定wait间隔，只要没有调用过，就执行一次
 * 执行时机：固定频率
 * 使用场景：发送请求，窗口resize，scroll无限加载，鼠标移动拖拽
 */

function throttle(fn, wait) {
  let timer = null;
  return function (...args) {
    const context = this;
    if (timer) return; // 上次计时未结束，本次不需要执行

    timer = setTimeout(() => {
      fn.apply(context, args);
      timer = null;
    }, wait);
  };
}

// 时间戳版本
function throttleTimestamp(fn, interval) {
  let last = 0;
  return function (...args) {
    const context = this
    const now = Date.now();
    if (now - last >= interval) {
      fn.apply(context, args);
      last = now;
    }
  };
}



// 使用示例
(function test() {
  const throttleLog = throttleTimestamp((n)=> console.log(n), 3000);

  throttleLog(1) 
  setTimeout(() => {
    throttleLog(2)
  }, 1000)            // 2不打印，被3s时间过滤了
  setTimeout(() => {
    throttleLog(3)
  }, 3000)
})();

