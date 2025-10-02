class MyWebpackPlugin {
  constructor(options={}) {
    this.options = options
  }

  apply(compiler) {
    compiler.hooks.done.tap("MyWebpackPlugin", function (stats) {
      console.log("编译完成")
      if (this.options.message) {
        console.log(this.options.message)
      }
    })
  }
}

// 哪些 hooks：


// use
const MyWebpackPlugin = require('./MyWebpackPlugin');

module.exports = {
  // …其他webpack配置
  plugins: [
    new MyWebpackPlugin({
      message: '这是我的第一个webpack插件!'
    })
  ]
};

