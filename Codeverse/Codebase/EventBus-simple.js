class EventBus {
  constructor() {
    this.deps = {};
  }

  on(eventName, callback) {
    if (!this.deps[eventName]) {
      this.deps[eventName] = [];   // 简单把相同 eventname 的回调存在一起，这样触发时候 forEach 即可
    }

    this.deps[eventName].push(callback);
  }
  emit(eventName, ...args) {
    if (!this.deps[eventName] || !this.deps[eventName].length) return;
    this.deps[eventName].forEach((cb) => {
      cb(...args);
    });
  }
  off(eventName) {
    delete this.deps[eventName]
  }
}


// test
const eb = new EventBus()
eb.on('test', (v1, v2) => console.log(v1, v2))
eb.emit('test', 'cc', 'ck')
eb.off('test')

eb.emit('test', 'cc', 'ck')
