---
tags: []
up: 
related: 
url: https://www.mianshipai.com/docs/second-exam/engineering.html
created: 2025-06-13
modified: 2025-07-09
---

## Vite：为什么更快？

Vite 相比传统构建工具（如 Webpack）更快 🚀，主要得益于以下几个核心特性：

- 基于原生 ES 模块（ESM）
	Vite 利用浏览器原生的 ES 模块，在开发模式下 `按需加载` 模块，避免了整体打包，从而减少了启动时间。它通过只编译实际修改的文件，提升了开发过程中的反馈速度。
- 高效的热模块替换（HMR）
	Vite 在开发模式下利用原生 ES 模块实现模块级的热更新。当文件发生变化时，Vite 只会重新加载发生变化的模块，而不是重新打包整个应用，极大提高了热更新的速度。
- 使用 esbuild 进行快速编译
	Vite 使用 esbuild 作为编译工具，相比传统的 JavaScript 编译工具（如 Babel、Terser），esbuild 提供显著的性能提升，能够快速完成代码转换和压缩，从而加速开发和构建过程。目前，Rowndown 已经发布了 1.0Beta 版本，可以代替 esbuild，带来开发、正式环境的一致性的同时，进一步加快编译。
- 现代 JavaScript 特性支持
	Vite 在生产环境中使用 Rollup 构建，支持优秀的树摇和代码拆分，有效减小构建体积。同时，Vite 利用现代浏览器特性（如动态导入、ES2015+ 模块），减少了 polyfill 的使用，提升了加载速度。
- 依赖预构建和缓存
	Vite 在开发时会预构建常用依赖（如 Vue、React），并将其转换为浏览器可执行的格式，避免每次启动时重新编译。同时，Vite 会缓存这些预构建的依赖，并在启动时复用缓存，从而加快启动速度。

## Vite：如何使用环境变量？

根据当前的代码环境变化的变量就叫做 **环境变量** 。比如，在生产环境和开发环境将 BASE_URL 设置成不同的值，用来请求不同的环境的接口。

Vite 内置了 `dotenv` 这个第三方库， dotenv 会自动读取 `.env` 文件， dotenv 从你的 `环境目录` 中的下列文件加载额外的环境变量：

> .env # 所有情况下都会加载.env.\[mode\] # 只在指定模式下加载

默认情况下

- `npm run dev` 会加载 `.env` 和 `.env.development` 内的配置
- `npm run build` 会加载 `.env` 和 `.env.production` 内的配置
- `mode` 可以通过命令行 `--mode` 选项来重写。 环境变量需以 VITE\_ 前缀定义，且通过 `import.meta.env` 访问。

示例：.env.development：

在代码中使用：

> 参考博文： [vite 中环境变量的使用与配置](https://juejin.cn/post/7172012247852515335)

## Vite：如何实现根据不同环境 (qa、dev、prod) 加载不同的配置文件？

在 Vite 中，根据不同环境设置不同配置的方式，类似于 Webpack 时代的配置方法，但更加简化。Vite 使用 `defineConfig` 函数，通过判断 `command` 和 `mode` 来加载不同的配置。

- **通过 `defineConfig` 动态配置：**

Vite 提供的 `defineConfig` 函数可以根据 `command` 来区分开发环境（ `serve` ）和生产环境（ `build` ），并返回不同的配置。

- **创建不同的配置文件**

`vite.base.config.ts` ：基础配置，适用于所有环境。

`vite.dev.config.ts` ：开发环境配置。

`vite.prod.config.ts` ：生产环境配置。

> 参考博文： [vite 指定配置文件及其在多环境下的配置集成方案](https://juejin.cn/post/7172009616967942175)

## Vite：依赖预加载机制

Vite 的依赖预构建机制通过在开发模式下提前处理常用依赖（如 Vue、React 等），将**这些依赖转换为浏览器可以直接执行的格式**。这避免了每次启动时重新编译这些依赖，显著提升了启动速度。预构建的依赖被缓存，并在后续启动时复用缓存，进一步加速了开发过程中的构建和启动时间。

具体来说，它的工作原理如下：

- **依赖识别和路径补全** ： Vite 会首先识别项目中需要的依赖，并对非绝对路径或相对路径的引用进行路径补全。比如， `Vue` 的加载路径会变为 `node_modules/.vite/deps/Vue.js?v=1484ebe8` ，这一路径显示了 Vite 在 `node_modules/.vite/deps` 文件夹下存放了经过预处理的依赖文件。
- **转换成 ES 模块** ： 一些第三方包（特别是遵循 CommonJS 规范的包）在浏览器中无法直接使用。为了应对这种情况，Vite 会使用 **esbuild** 工具将这些依赖转换为符合 ES 模块规范的代码。转换后的代码会被存放在 `node_modules/.vite/deps` 文件夹下，这样浏览器就能直接识别并加载这些依赖。
- **统一集成 ES 模块** ： Vite 会对每个包的不同模块进行统一集成，将各个分散的模块（如不同的 ES 函数或组件）合并成一个或几个文件。这不仅减少了浏览器发起多个请求的次数，还能够加快页面加载速度。

> 参考博文： [[https://juejin.cn/post/7172007612379054093#heading-3]] 、 [手写 vite 让你深刻了解 Vite 的文件加载原理](https://juejin.cn/post/7178803290820804667)

## Vite：如何加载、处理静态资源？

🎯 **静态资源目录（public 目录）** ：

- 静态资源可以放在 `public` 目录下，这些文件不会经过构建处理，直接按原样复制到输出目录。在开发时可以通过 `/` 路径直接访问，如 `/icon.png` 。
- `public` 目录可通过 `vite.config.js` 中的 `publicDir` 配置项修改。

🎯 **资源引入** ：

- **图片、字体、视频** ：通过 `import` 引入，Vite 会自动将其处理为 URL 并生成带哈希值的文件名。在开发时，引用会是根路径（如 `/img.png` ），在生产构建后会是如 `/assets/img.2d8efhg.png` 的路径。
- **CSS、JS** ：CSS 会被自动注入到页面中，JS 按模块处理。

🎯 **强制作为 URL 引入** ：通过 `?url` 后缀可以显式强制将某些资源作为 URL 引入。

🎯 **强制作为原始内容引入** ：通过 `?raw` 后缀将文件内容作为字符串引入。

🎯 `new URL()` ：通过 `import.meta.url` 可以动态构建资源的 URL，这对于一些动态路径很有用。

> 参考博文： [vite 中静态资源（css、img、svg 等）的加载机制及其相关配](https://juejin.cn/post/7173467405522305055)

## Vite：如何引入 CSS 预处理器?

在 Vite 中使用 CSS 预处理器（如 Sass、Less）是非常简单的，Vite 默认支持这些预处理器，我们只需要安装相应的依赖即可。

安装依赖：

在 Vue 组件中使用：

此外，我们可以通过在 vite 的 `preprocessorOptions` 中进行配置，使用 CSS 预处理器的一些强大功能。

对于 Less，假如我们需要在项目中全局使用某些变量，我们可以在 `vite.config.js` 中配置 `globalVars` ，使得变量在所有文件中无需单独引入：

一旦配置了全局变量，我们就可以在任何 Vue 组件中直接使用它，无需再次引入：

> 参考博文： [vite 中如何更优雅的使用 css](https://juejin.cn/post/7175366648659411000) 、 [[如 less)的配置](https://juejin.cn/post/7177549666291515447|Vite 中预处理器(如 less)的配置]] 、 [使用 postcss 完善 vite 项目中的 css 配置](https://juejin.cn/post/7178454300572516409)

## Vite：如何配置开发环境代理？

在 Vite 中配置代理可以通过 `server.proxy` 选项来实现。以下是一个示例配置：

## Vite：如何集成 TypeScript？如何配置？

**Vite 对 TypeScript 提供了开箱即用的支持，无需额外安装插件。**

我们创建一个 `index.html` 文件并引入 `main.ts` 文件：

在 `main.ts` 中，可以写入一些 TypeScript 代码：

运行 `vite` 后，可以看到控制台输出内容，表明 Vite 天生支持 TypeScript。

在 Vite 项目中，虽然默认支持 TypeScript，但 Vite 本身不会阻止编译时出现 TypeScript 错误。为了更严格的类型检查和错误提示，我们需要配置 TypeScript。

- 添加 TypeScript 配置（如果没有）

通过以下命令生成 `tsconfig.json` 配置文件

创建好 `tsconfig.json` 后，Vite 会根据该配置文件来编译 TypeScript。

- 强化 TypeScript 错误提示

Vite 默认不会阻止编译时的 TypeScript 错误。如果我们想要在开发时严格检查 TypeScript 错误并阻止编译，可以使用 `vite-plugin-checker` 插件。

然后在 `vite.config.ts` 中引入并配置该插件：

这样，任何 TypeScript 语法错误都会在控制台显示，并阻止编译。

- 打包时进行 TypeScript 检查

虽然 Vite 只会执行 `.ts` 文件的转译，而不会执行类型检查，但我们可以通过以下方式确保在打包时进行 TypeScript 类型检查。

修改 `package.json` 配置

`tsc --noEmit` 会执行类型检查，但不会生成编译后的文件。如果存在类型错误，打包过程会被阻止。

- TypeScript 智能提示

Vite 默认为 `import.meta.env` 提供了类型定义，但是对于自定义的 `.env` 文件，TypeScript 的智能提示默认不生效。为了实现智能提示，可以在 `src` 目录下创建一个 `env.d.ts` 文件：

> 参考博文:[https://juejin.cn/post/7177210200330829885](https://juejin.cn/post/7177210200330829885)

## Vite：未来改由 Rolldown 驱动

Vite 目前使用 esbuild 进行开发环境依赖预打包，使用 Rollup 进行生产构建，带来了不一致性。Rolldown 的目标是将这两个过程统一到一个高性能的打包工具中，以降低复杂性。
