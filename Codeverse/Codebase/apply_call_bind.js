// js: apply, call, bind
Function.prototype.myApply = function (context, argsArray) {
  // 处理 context 默认值
  context = context || globalThis;

  // 创建唯一键防止属性冲突
  const fnKey = Symbol("tempFn");
  context[fnKey] = this;

  // 执行函数并获取结果
  const result = argsArray?.length ? context[fnKey](...argsArray) : context[fnKey]();

  // 清理临时属性
  delete context[fnKey];
  return result;
};

Function.prototype.myCall = function (context, ...args) {
  return this.myApply(context, args);
};

Function.prototype.myBind = function (context, ...bindArgs) {
  const originalFn = this;

  function boundFn(...callArgs) {
    // 判断是否通过 new 调用 (后续不管多少次调用，都固化为第一次调用的 this)
    const isNewCall = this instanceof boundFn;

    return originalFn.apply(isNewCall ? this : context, bindArgs.concat(callArgs));
  }

  // 保持原型链
  boundFn.prototype = Object.create(originalFn.prototype);

  return boundFn;
};
