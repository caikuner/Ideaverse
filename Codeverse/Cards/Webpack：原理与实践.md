---
tags: []
up:
related:
companies:
created: 2025-06-24
modified: 2025-06-26
---

### 1.webpack 是什么？ 解决什么问题？

webpack 是一个现代 JavaScript 应用程序的静态模块打包器 (module bundler)，webpack 及其同类的工具是为了解决前端依赖、模块难以管理的问题。

- 依赖管理，能够识别依赖并且梳理依赖关系
- 资源加载管理，能根据依赖关系和输入配置，处理文件的加载顺序和优化文件加载数量（合并、拆分等）
- 效率与优化，能提升开发效率、优化结果以达到最终页面加载速度提升的效果

webpack 会递归地构建一个依赖关系图 (dependency graph)，其中包含应用程序需要的每个模块 (包括模块文件、url 静态资源、css 等)，然后将所有这些模块打包成一个或多个 bundle。

### ⭐2. module chunk bundle ，有什么联系和区别

#### webpack 中的 module 是什么

webpack 中的 module 就是我们平常使用的 module（模块）,即可以被导入导出的文件都是一个模块。

我们开发中的模块依赖复杂难以管理，所以才有 webpack 等工具的产生。

webpack 支持 ESModule, CommonJS, AMD, Assets 等.

1. ESM

关键字 export 允许将 ESM 中的内容暴暴露露给其他模块,关键字 import 允许从其他模块获取引⽤用到 ESM 中.

```

import { aa } from './a.js';

export { bb };

```

可以设置 package.json 中的属性来显式设置⽂文件模块类型。

在 package.json 中:

设置 `“type”: “module”` 会强制 package.json 下的所有文件使⽤用 ECMAScript 模块规范。

设置 `“type”: “commonjs”` 将会强制使⽤用 CommonJS 模块规范。

1. CommonJS

module.exports 允许将 CommonJS 中的内容暴暴露露给其他模块,require 允许从其他模块获取引⽤用到 CommonJS 中.

```js
const path = require("path");

module.exports = {
  aa,
  bb,
};
```

#### 所以 webpack modules 如何表达自己的各种依赖关系?

- ESM import 语句
- CommonJS require() 语句
- AMD define 和 require 语句 (不常用)
- css/sass/less 文件中的 @import 语句。
- stylesheet url(…) 或者 HTML 文件中的图片链接。（静态资源）

#### chunk 和 bundle 又是什么，有什么区别

1. Chunk

Chunk 是 Webpack 打包过程中 Modules 的集合，是打包过程中的概念。

Webpack 的打包是从⼀一个入口模块 (main.js/index.js) 开始，入口模块引用其他模块，模块再引用模块。

然后 Webpack 通过引用关系逐个打包模块，这些关联依赖的 modules 就形成了⼀个 Chunk。

如果有 entry 字段定义了多个入口 (key),会产出多条打包路径，每条路径都会各自形成⼀个 Chunk。

entry 配置对象的 key 被用作 chunkName(如 index test)!!

另外，有时为了优化会进行一些切分 chunk(split chunks) 的操作，主 chunk 会切割成多个小 chunk(下面会讲)

```js

//2个入口

entry: {
    index: ['./src/main.js','./src/modules/add.js'], // index算作一个入口

    test: './src/test.js'
},

```

1. Bundle 是什么？Chunk 和 Bundle 的对应关系?

Bundle 是对每个 chunk 进行编译压缩打包，最终输出的一个或多个文件,这些文件会放到服务器上供浏览器下载后直接运行.

output 配置对象的 filename 会被用作 bundleName(如 index.js test.js)!

多数情况下，一个 Chunk 会对应生产一个 Bundle。

比如咱们来简单写个项⽬ (webpac-run-demo) 试一下。

不过也有例外，比如开启了 sourcemap 后，会同时额外生成一个 sourcemap(.map) 的 bundle 文件。

1. module，chunk 和 bundle 的关系

module，chunk 和 bundle 其实就是同一份逻辑代码在不同转换场景下的取了三个名字：

- 我们开发中直接写出来的是 module，webpack 做的就是帮助我们管理各 module 及其相互依赖关系
- 在 webpack 打包处理过程中，我们的 modules 变成了 chunk
- 打包完成后，每一个 chunk 最终生成一或多个结果文件就称为 bundle，可供浏览器直接运行。

对应关系：

- chunk 的入口 管理了各个 modlue 及其依赖关系
- 一个入口模块对应产生一个主 chunk。
- 每个 chunk 最终生成一个或多个 bundle。多数情况是一对一，除非开启了 sourcemap 等会额外生成相应文件的配置

#### split chunk 是什么

> <https://zhuanlan.zhihu.com/p/152097785>#

SplitChunks 是 Webpack 中一个提取或分离代码的插件，主要作用是拆分 chunk，比如提取公共代码，防止代码被重复打包，拆分过大的 js 文件，合并零散的 js 文件。

比如，配置见 (webpac-run-demo)

- runtime 单独分包
- 我们安装一下 lodash,把所有用到的 node_modules 下的包也都打到一起。
- 然后不同入口之间的公共引用可以打到一起
- 最后加上两个入口块 index test

#### bundle 名称？ hash、chunkhash、contenthash 的区别

最终的 bundle 文件名称都是在哪里配置的？怎么配的？

- entry 配置对象的 key 作为入口主包的 chunkName
- splitChunks 配置对象的分包名称 name 作为各分包的 chunkName
- output 配置对象的 filename 选项，配置 bundleName,

比如我们例子中设置的 [name].js, 就是简单的用 chunkName 作为 bundleName,即和上面两个配置的保持一致

实际开发我们会给 filename 配置加 hash：如果我们代码开发更新后，有更改的文件才会改变 hash，从而改变文件名。这样的好处是，没有更改的文件就可以使用缓存，更改的才去刷新缓存。

尤其是我们使用的公共库 lodash echarts element，一般也不会取升级版本，所有最好能被缓存。

常用的有三种模式：

- hash `filename: '[name]_[hash:8].js',`

hash 是项目级别的，即使只改了其中一个文件，最终得到的所有文件的文件名里面的 hash 都是一样的

- chunkhash `filename: '[name]_[chunkhash:8].js'`

chunkhash 是 chunk 级别的，所有有依赖文件构成一个 chunck，只要其中一个文件改变，那 chunk 的 hash 值就改变了。与当前 chunk(入口) 有依赖关系的所有 bundle 文件都会更改为新的 chunkhash

- contenthash `filename: '[name]_[contenthash:8].js'` ✅

contenthash 是真正 module(文件) 级别的，真正做到有改变的文件才改变 hash。只有具体到某一个文件的内容改变了，才会使 bundledName 改变 hash，这个才是满足我们要求的！

### ⭐3. 你了解 webpack 的哪些核心概念

webpack 的核心概念：

- 入口 (entry)
  - entry 属性对象，即入口起点 (entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。
  - 进入入口起点后，webpack 会递归找出和入口依赖的模块。
  - 每个依赖最终当做一个 chunk 被处理，输出到称之为 bundles 的文件中。
  - 可以通过在 webpack 配置 entry 属性，来指定一个入口起点（或多个入口起点）
- 输出 (output)
  - output 属性对象告诉 webpack 在哪里输出它所创建的 bundles，以及如何命名这些文件，默认值为 ./dist。
  - 基本上，整个应用程序结构，都会被编译到指定的输出路径的文件夹中。
  - 三种 bundle hash 模式
- loader
  - 模块转换器器，将非 js 模块转化为 webpack 能识别的 js 模块.（翻译作用）
  - loader 可以将所有类型的文件转换为 webpack 能够处理的有效模块 (js),然后就可以利用 webpack 的打包能力,对它们进行处理。
  - 本质上,webpack loader 为构建依赖图服务，是将所有类型的文件,转换为应用程序的依赖图（和最终的 bundle）可以直接引用的模块。
- plugin
  - 扩展插件，在 webpack 运行的各个阶段，都会广播出去相对应的事件，插件可以监听到这些事件的发生，在特定的时机做相对应的事情
  - Loader 被用于转换某些类型的模块，而插件则可以用于执行范围更广的任务。
  - 从打包优化和压缩,一直到重新定义环境中的变量。插件接口功能强大,可以用来处理各种各样的任务。
- module，chunk，bundle
- splitchunk
- tree shaking

### ⭐4. 既然 webpack 最重要的能力是用 plugin 扩展的，请详细说说 plugin 的工作原理？

插件是 webpack 生态系统的重要组成部分，直接触及 webpack 的编译过程 (compilation process)。webpack 不管是内部实现还是外部配置的使用都可以说是插件的集合。

- 在 webpack 运行的生命周期中每个编译 (compilation) 阶段，会广播出各阶段相应的事件
- Plugin 不需介入 webpack 的生命周期，只需要监听这些事件，在触发时钩入 (hook)，通过 webpack 提供的 几个 API 就可以改变输出结果。

#### Tapable

Plugin 的核心框架是 Webpack 的内部库 Tapable ,Tapable 提供了基于发布订阅模式（观察者模式或事件流）的架构，提供了以下功能：

- 注册事件监听，类似于使用 on 注册监听事件，Tapable 中使用 tap 注册，每个事件点支持插入监听回调；
- 触发指定事件，类似于使用 emit 触发事件，Tapable 中使用 call 触发；
- 支持多种事件类型，大类上按同步、异步串行、异步并行划分，每个大类下根据回调事件执行方式还有进一步细分。
- 支持多种监听事件处理逻辑分类：
- 普通模式，事件点上注册的所有监听回调按注册顺序根据事件类型依次调用，相互独立；
- 瀑布模式，上一个监听回调执行完成后的返回值将注入下一个监听回调；
- 熔断模式，监听回调返回非 null 值将中断剩余回调的调用。

#### compiler compilation

Webpack 提供了几个核心对象 (compiler compilation resolver parser)，最重要的就是 compiler compilation：

- Compiler(编译器对象) 模块
  - compiler 对象负责主流程运作，此模块暴露在 webpack.Compiler, 在 webpack 启动的时候进行 new 实例化（全局唯一！！），它的生命周期就是 Webpack 整个运行时期。
  - 接受 webpack 环境的所有配置信息，包括 options loader plugin（加载配置时，注册的插件会注册到这里）。
  - 在作用上可以把它近似理解为 webpack 的实例。
  - compiler 并不会涉及某个具体文件的编译细节，因此它对外暴露的事件钩子粒度比较粗。
- Compliation(编译对象) 模块
  - Compliation 负责每一次版本的编译构建和资源生成流程中的细节，在 Compiler 对象的生命周期内（即 Webpack 运行时）可能有多次编译流程，比如常用的开发环境下，文件内容变更会引起重新编译 (创建一次新的 compilation)
  - Compilation 模块包含当前的模块资源、编译生成资源
  - 它会被 Compiler 实例化,创建新的编译 Compilation（或新的构建），Compilation 实例可以访问到依赖图谱中的所有模块和他们的依赖（大部分是循环依赖）。
  - 它会对应用程序的依赖图中所有模块进行字面上的编译 (literal compilation)。在编译阶段，模块会被加载 (loaded)、封存 (sealed)、优化 (optimized)、分块 (chunked)、哈希 (hashed) 和重新创建 (restored)。

#### 如何知道 Plugin 在哪个生命周期执行？如何配置 Plugin？

Webpack 的 Plugin 基于 Tapable 事件流机制，通过钩子（Hooks）在编译的不同阶段执行。例如：

- entryOption：处理入口配置。
- compile：开始编译。
- emit：生成资源到输出目录前。
- done：编译完成。

Plugin 通过 apply 方法接收 compiler 对象，在编译的各个阶段注册钩子。

```js
class MyPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("MyPlugin", (compilation) => {
      console.log(" 资源即将生成！");
    });
  }
}
```

如何配置 Plugin？

```js
// webpack.config.js
const MyPlugin = require("./my-plugin");

module.exports = {
  plugins: [
    new MyPlugin(), // 自定义插件
    new HtmlWebpackPlugin({ template: "./index.html" }), // 常用插件
  ],
};
```

#### 总结一下插件流程

1. Webpack 的配置文件中所有依赖的插件通过 new XXXPlugin() 的方式填写在 plugin 配置项下，这些 Plugin 中注册了特定 hook 事件的回调。
2. Webpack 初始化配置阶段，将遍历 plugin 配置项并将每个 Plugin 都注册到 compiler 对象
3. 接下来在 Webpack 主流程运行时，每个关键生命周期点通过 call 方式触发特定事件，注册了特定事件的 Plugin 回调被调用，回调方法中被注入编译对象 (Compliation)，可以获取到特定事件触发时编译对象的最新状态（即当前编译信息），并进行一些操作达到扩展目的。

- 在编译的每一步，插件都具备完全访问 compiler 对象的能力，如果情况合适，还可以访问当前 compilation 对象。
- 在插件中，可以拿到 Compile(编译) 和 Compilation(创建新的编译) 的引用对象，使用它们广播事件，这些事件可以被其他插件监听到，或者对他们做出一定修改，其他插件拿到的也是变化的对象。

### ⭐5.请简述一下 webpack 打包的流程？

1. 初始化参数,配置解析 webpack.config.js: 读取配置文件（或命令行参数）
2. 开始编译: 启动 webpack，实例化唯一的 Compiler 对象，加载所有配置，并注册内置插件和配置文件中注册的插件,开始执行编译
3. 确定入口: 根据 entry 中的配置，找出所有的入口
4. 编译模块: 从入口文件开始，webpack 会递归找出和入口直接或间接依赖的模块
5. 完成模块编译: 得到每个模块被编译后的最终内容，并构建各模块之间的依赖关系图 (dependency graph)
6. 模块封装,输出资源：根据依赖关系图，组装成包含多个依赖 module 的 chunk
7. 输出完成：根据 output 配置，确定要输出的 filename 和 path

### 6.webpack 是如何开启一个 dev-server 的

> [dev-server](https://www.webpackjs.com/configuration/dev-server)

> [http-proxy-middleware](http-proxy-middleware)

webpack 内置一个 webpack-dev-server 工具来启动一个本地开发服务器,这个工具内部使用了 express、 [http-proxy-middleware](http-proxy-middleware)。

(我们可以 node + express + http-proxy-middleware 自行搭建类似的)

#### 使用 webpack-dev-server

- 命令行参数传入配置来启动,如 `webpack-dev-server --open`
- 通过 devServer 选项配置后启动 `webpack-dev-server`：

```js

devServer: {

contentBase: path.join(__dirname, "dist"),

compress: true, // contentBase目录下的文件都做gzip压缩

hot: true, // 启用 webpack 的模块热替换特性

index: 'index.htm',

open:true,

overlay: {

// 有错误时，浏览器会全屏覆盖

warnings: true,

errors: true

},

port: 9000,

proxy:{

// 代理，可以用来跨域。内部使用 http-proxy-middleware

"/api": {

target: "http://target.com",

pathRewrite: {"^/api" : ""} // 如果不想始终传递 /api ，可以重写路径

}

}

// ...

}

```

#### dev-server 原理

- webpack-dev-server
- Webpack-dev-Server 就是内置了 Webpack-dev-middleware 和 Express 服务器，以及利用 websocket 替代 eventSource 实现 webpack-hot-middleware 的逻辑
- 核心是做准备工作（更改 entry、监听 webpack done 事件等）、创建 webserver 服务器和 websocket 服务器让浏览器和服务端建立通信

编译和编译文件相关的操作都抽离到 webpack-dev-middleware

- Webpack-dev-middleware 也是实现了 dev-server 的功能,主要干了三件事
- 本地文件的监听、启动 webpack 编译；使用监控模式开始启动 webpack 编译，在 webpack 的 watch 模式下，文件系统中某一个文件发生修改，webpack 监听到文件变化，根据配置文件对模块重新编译打包；
- 设置文件系统为内存文件系统（让编译输出到内存中）
- 实现了一个 express 中间件，将编译的文件返回

webpack-dev-server 是封装好的,不好定制开发。搭建脚手架时，利用 webpack-dev-middleware 和 webpack-hot-middleware，以及后端服务，让开发更灵活。

#### webpack 如何进行模块热替换？

> <https://www.webpackjs.com/concepts/hot-module-replacement/>

> <https://juejin.cn/post/6844904020528594957>

模块热替换 (HMR - Hot Module Replacement) 功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载整个页面。主要是通过以下几种方式，来显著加快开发速度：

保留在完全重新加载页面时丢失的应用程序状态。

只更新变更内容，以节省宝贵的开发时间。

调整样式更加快速 - 几乎相当于在浏览器调试器中更改样式。

### 7.webpack 怎么监听文件的

> <https://www.webpackjs.com/configuration/watch/>

### 8.sourcemap 是什么，webpack 怎么开启

> <http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html>

devtool 选项控制是否生成，以及如何生成 source map。

### ⭐9.项目有用过哪些 webpack plugin 或 loader

#### loader

【注意】如果对同一个 test 规则用了多个 loader，loader 的加载顺序是从右到左，如 `[{loader: "style-loader" }, {loader: "css-loader" }, {loader: "sass-loader" }]`

- babel-loader

利用 babel 将最新标准的 ES6/TS 代码转成当下浏览器可执行的 JS 代码。

babel-loader 的配置即是 babel 的配置，其主要是以 .babelrc 配置文件的方式存在项目根目录。

如配置有特殊逻辑处理，可以在 module.rules 中引用 babel-loader 处做配置覆盖。

- css 相关 loader
  - sass-loader : 将 Sass 编译成 CSS
  - css-loader : 将 CSS 转化成 JS 模块,解释 css 文件内的 @import 和 url() ；可开启 css-module
  - style-loader : 将 JS 字符串生成为 style 节点: 将 css 以 style 标签插入 dom 中。
  - postcss-loader: css 样式后处理工具。css 压缩、合并、自动兼容浏览器等功能利器。
  - style-resources-loader：自动导入 css 预处理器的一些公共的样式文件变量、mixin 样式等

- file-loader

对于图片这样的静态资源，我们在代码中引入时，常以当前文件为基准，引入其相对路径下的图片。

而当我们访问 html 时，这个相对路径其实是基于 html 此时的路径的，故而会导致引入路径错误。 file-loader 主要解决这个问题。可以自动的识别 webpack 配置，打包资源图片，修复引入路径，进而保证资源引入正确。同时也支持修改输出后文件的路径与文件名、携带 hash 值等功能。

设置 `publicPath`

- url-loader

基本功能同 file-loader ，在它基础上，可以设置一个 limit 配置项，意义为文件的体积大小，单位为字节。对于小于此大小的文件，会转化成 base64 的数据，替换 url 引入。对于小图片等资源常用这样的操作，好处是减少资源的请求次数；或者在某些场景下，保证图片在 html 加载或渲染时就能展示，不需要再发起请求。

大于 limit 的图片会使用 file-loader 打包到 publicPath 下，并使用哈希值命名。

还可以配置 name `name = "img/[name].[hash:8].[ext]" // 打包到 publicPath/img/name.8位哈希值.扩展名`

#### plugin

- html-webpack-plugin 【内置】
- web 应用的工程，必须要有 html 文件或者其他 html 模板文件。这个插件根据项目中的 html 模板（没有也行），插入我们构建出来的 js 与 css 等资源，生成想要的 html 文件。

- mini-css-extract-plugin
- 抽离 css 文件。
- style-loader 是把样式插入到 dom，但我们多数情况想要单独的 css 文件，就用这个插件。
- 注意，需要在 css 文件的相关 loaders 要使用 `MiniCssExtractPlugin.loader` 替换 style-loader

- HotModuleReplacementPlugin 【内置】
- webpack-dev-server 中需要设置 hot 为 true 。
- style-loader 支持热替换，但是上小节中为了抽离 css 文件引入的 MiniCssExtractPlugin.loader 暂时未支持热替换，故而需要开发环境时采用 style-loader ，或者引入 css-hot-loader 。
- react 工程需要实现组件热替换的话，需引入 react-hot-loader 。
- vue-loader 已经实现了 HMR，无需要增加其他 loader。

- splitChunks【内置】
- 分包，比如独立拆分 node 包、公共代码、大的文件，合并零散文件

- compression-webpack-plugin【内置】
- gzip 压缩

- uglifyjs-webpack-plugin【内置】
- 压缩 js 代码，比如去格式化、去除打印等

- webpack-bundle-analyzer
- 打包后生成一个可视化分析包大小的页面，方便做优化
- prerender-spa-plugin
- 提供预渲染功能

### ⭐10.如何让从 0 开始搭建一个 webpack 开发环境的

1.初始化

```bash

npm init

npm i -D webpack

touch webpack.config.js

```

2.npm script

```

"dev": "webpack-dev-server",

"build": "rm -rf dist && webpack"

```

3.配置

```js
// webpack.config.js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
  entry: './index.js', // 1. 入口
  output: {
    filename: "[name].[contenthash].js", // 2. 输出
    path: __dirname + '/dist', // default
    publicPath: 'https://cdn.antfin.com' // 如果我们把静态资源放到了cdn上(比如index.contenthash..js); 同时要开启html-plugin
  },
  mode: process.env.NODE_ENV, // 3.模式
  devtool: "source-map", // 4. 开启sourcemap
  devServer: { // 5.开发配置 dev-server
    contentBase: path.join(__dirname, "dist"),
    compress: true, // contentBase目录下的文件都做gzip压缩
    hot: true, // 启用 webpack 的模块热替换特性
    index: 'index.html',
    open: true,
    overlay: {
      // 有错误时，浏览器是否全屏覆盖
      warnings: false,
      errors: true
    },
    port: 9000,
    proxy: {
      // 代理，可以用来跨域。内部使用 http-proxy-middleware
      "/api": {
        target: "http://target.com",
        pathRewrite: { "^/api": "" } // 如果不想始终传递 /api ，可以重写路径
      }
    }
  },
  resolve: {
    // 6.如何解析模块
    alias: {
      '@': path.resolve(process.cwd(), './src');
    }
  },
  module: {// 7.loader
    rules: [
      // ts
      {
        // test指定的是规则生效的文件
        test: /\.ts$/,
        // 要使用的loader
        // Webpack在加载时是"从后向前"加载！
        use: [
          // 配置babel
          {
            // 指定加载器
            loader: 'babel-loader',
            // 设置babel
            options: {
              // 设置预定义的环境
              presets: [
                [
                  // 指定环境的插件
                  '@babel/preset-env',
                  // 配置信息
                  {
                    // 要兼容的目标浏览器,这里测试的比较老,会被转码
                    targets: {
                      chrome: '58',
                      ie: '11',
                    },
                    // 指定corejs的版本
                    corejs: '3',
                    // 使用corejs的方式 "usage" 表示按需加载
                    useBuiltIns: 'usage',
                  },
                ],
              ],
            },
          },
          'ts-loader',
        ],
        // 要排除的文件
        exclude: /node-modules/,
      },
      // js
      {
        test: /\.(js)$/,
        use: 'babel-loader'
        // 另外，babel的配置.babelrc存在项目根目录
      },
      // scss
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true // 启用sourceMap
            }
          },
          // postcss
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 2 versions',
                    },
                  ],
                ],
              }
            },
          },
          'sass-loader',
        ],
      },
    ]
  },
  plugins: [
    // 8.plugin
    new HtmlWebpackPlugin()
  ],
  optimization: {
    // 9.构建配置 optimization
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true, // 多进程压缩
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // 优化压缩css
    ],
    runtimeChunk: "single", // 运行时的代码单独分chunk，single:单值创建一个运行时文件，以便为所有生成的块共享
    splitChunks: {
      chunks: "initial", // 默认是 async：只提取异步加载的模块；initial:提取同步加载和异步加载模块，并分开打包；all：不管异步加载还是同步加载的模块都提取出来，打包到一个文件中。
      minSize: 20000, // 需要拆分的最小体积，默认是20000Byte
      minChunks: 2, // 表示要被提取的模块最小被引用次数，引用次数超过或等于 minChunks 值，才能被提取。【注意】：是入口点引用的个数，比如index test都引用了是2次，同一个入口里面不管有多少次引用都是公共的，只算1次
      name: true, // 默认，以cacheGroups对象的key自动用做name，会自动拼接entrypoint,如 vendors~index.js。也可以在配置组中分别自定义覆盖
      cacheGroups: {
        // 这里的所有组，会继承外层的配置,除了 test、priority 和 reuseExistingChunk 只能在缓存组级别上配置
        commons: {
          // 创建一个公共块，其中包括入口点之间共享的所有代码。
          name: 'commons',
          minChunks: 2,
          minSize: 0, // 这里为了演示, 对最小体积不做限制
          priority: -9, // 默认组优先级置为负值，以让自定义的缓存组拥有更高优先级
          reuseExistingChunk: true
        },
        vendors: {
          // vendor块，使用的node包统一打到 vendors.js
          name: 'vendors',
          test: /node_modules/, // 正则匹配
          priority: -10,
          enforce: true
        },
        // 把不同页面公共的代码抽离到一个 commonChunk 。把外部依赖包单独抽离到一个 vendor 。还可以把React/Vue 等项目必引的库单独抽离成 dll 。
      }
    }
  },
};
```
