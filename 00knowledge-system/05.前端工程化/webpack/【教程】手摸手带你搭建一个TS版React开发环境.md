---
title: 📣【教程】webpack搭建TS版React开发环境
tags:
  - webpack
  - react
  - 工程化
categories:
  - blog
  - 教程
keywords: "webpack，react"
cover: https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/521a1831b6f84ae79f6fd929a41900da~tplv-k3u1fbpfcp-watermark.image
toc: true
abbrlink: 3338
---

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/521a1831b6f84ae79f6fd929a41900da~tplv-k3u1fbpfcp-watermark.image)

## 前言

本文初衷：平时的项目大多用`create-react-app`开发，从开发到打包都只是在敲命令而见不到`webpack.config.js`配置文件，简直是面向黑箱编程，遇到问题之后即使解决了也不知道怎么回事，这种感觉非常不好。

学习 webpack 的重要性不言而喻，即使市面上已经有如此众多的成熟脚手架，比如普通项目可以用 CRA，SPA 管理系统可以用 antdpro，打包组件库可以用 tsdx 等等，但如果不懂这些打包工具的原理甚至基础用法，总有一天你会遇到奇葩问题而不知道如何解决。

本文将以问题导向的形式，在实际搭建过程中逐个剖析 webpack 重要配置，深浅适宜，整体内容较基础，适合初入坑 `webpack` 的小伙伴们参考。

本示例 webpack 版本为`5.x`，`webpack-cli`版本为`4.x`

话不多说，马上开始吧~

## 正文

### 1.项目初始化

```bash
mkdir webapck-ts-react
cd webapck-ts-react
yarn init
yarn add webpack webpack-cli -D
```

空项目中初始化为以下结构：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/265c3b74377a4203929ba2507bc4147a~tplv-k3u1fbpfcp-watermark.image)

> 🤔 问题 1：webpack 是什么？

<details>
<summary>👉 展开查看答案</summary>
- webpack是一个打包工具；将符合`ES Module`和`CommonJS`模块化规范的工程文件打包成一个静态资源（可部署到服务器）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd518533d15c4382af450e3b37275e34~tplv-k3u1fbpfcp-watermark.image)

一张图讲清楚 webpack 的作用

</details>

此时直接执行`npx webpack`命令试试看吧：

```bash
webpack
```

神奇的事情发生了，会发现多出了个文件夹`dist`，里面是打包编译好的文件`main.js`，如果我们没有在`webpack.config.js`中配置任何内容，则默认按照相应出入口进行打包，默认命令类似：

```js
// webpack.config.js

const path = require("path")

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
}
```

再次命令行执行`npx webpack`结果一样，验证默认配置就是上面这样的~

配置项中`entry`为入口，可以配置为相对路径；
`output`为出口，`path`属性必须设置为绝对路径；

> 为什么输出路径要求绝对路径？
>
> 以上差异原因在于项目中入口一般可以确定为本项目中，但是出口理论上可以是磁盘上任意值，所以 output 的 path 必须为绝对路径。

`output`的`filename`在单入口项目中可以写任意固定值，在多入口项目中不能写固定值，`[name]`为变量占位符表示不固定的值；

> 🤔 问题 2：为什么要 npx webpack 而不是直接 webpack？

<details>
<summary>👉 展开查看答案</summary>
webpack打包命令默认有两种方式：全局和本地（局部）；
如果直接执行webpack则用的是全局webpack编译，结果一样的嗷；
如果使用npx webpack则会在当前项目中寻找webpack指令执行，查找路径为<code>/node_modules/bin/webpack</code>

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/98c1e75ddf05414bb9f702eb1a9618d0~tplv-k3u1fbpfcp-watermark.image)

</details>

> 🤔 问题 3：全局有 webpack 命令不就够了吗？为啥本地还要安装 webpack？

<details>
<summary>👉 展开查看答案</summary>
全局安装的都是固定版本（比如最新的5.x），有些年代久远的项目需要需要使用更早期的webpack版本（比如4.x），为了防止版本冲突，所以开发中一般都是用项目本地版本
</details>

不过每次都要`npx webpack`未免太麻烦了，所以我们可以在`package.json`中做如下配置：

```js
// package.json
...
  "scripts": {
    "build": "webpack"
  },
...
```

之后直接执行`yarn build`就和执行`npx webpack`效果一样啦~

### 2.处理图片 loader

接着我们发挥下 webpack 模块化打包的特性，新建一个模块专门在页面上加载图片：

```js
// src/loadImg.js

import Img from "./images/picture.jpg"

const Image = document.createElement("img")
Image.src = Img

document.body.appendChild(Image)
```

index.js 中引入

```js
require("./loadImg")

function sum(a, b) {
  return a + b
}

console.log(sum(1, 2))
```

执行`yarn build`发现报错：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/937b6de960b240a994a99efa6d218121~tplv-k3u1fbpfcp-watermark.image)

提示得很清楚啦，由于`webpack`默认只认识`.js`和`.json`文件，对于图片文件的识别是需要借助 loader 的；

> 🤔 问题 4：loader 是什么？

<details>
<summary>👉 展开查看答案</summary>
webpack 只能理解 JavaScript 和 JSON 文件，这是 webpack 开箱可用的自带能力。loader 让 webpack 能够去处理其他类型的文件，并将它们转换为有效模块，以供应用程序使用，以及被添加到依赖图中。
</details>

> 在 webpack4.x 版本中处理图片需要用到 file-loader，url-loader 或 raw-loader，但是在 webpack5.x 中不需要了，对于图片和字体文件等，可以通过 type: asset 声明直接处理文件。

这里我们采用 5.x 的方式处理图片：

```js
const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
+  module: {
+    rules: [
+      {
+        test: /\.(png|jpg|jpeg|gif|webp)$/,
+        type: 'asset'
+      }
+    ]
+  }
}
```

打包成功：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2df98667208443d3b0b042cbc790c668~tplv-k3u1fbpfcp-watermark.image)

新建 HTML 文件，引入打包后的`main.js`文件测试，注意 script 标签一定要加`defer`属性：

```html
dist/index.html

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <script defer src="./main.js"></script>
  </head>
  <body></body>
</html>
```

🤔 机智如你已经发现了，直接在`dist`文件夹中新建额外文件的操作不对劲吧，别急，后面会有 plugin 帮我们自动处理的。

打开`dist/index.html`预览，一切正常：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbec193117ec4a51b3f31ddc1c372f81~tplv-k3u1fbpfcp-watermark.image)

### 3.处理 css 文件 loader

让我们新建一个 css 文件

```css
// src/css/index.css

body {
  background-color: burlywood;
  color: blueviolet;
}
```

引入

```js
src/index.js
require('./loadImg')
+ import './css/index.css'

function sum (a, b) {
  return a + b
}

console.log(sum(1, 2))
```

不出所料，还是同样内容的报错：缺少合适的 loader，因为上面我们已经知道了，webpack 默认只能识别 js 文件和 JSON 文件，其他格式文件都需要 loader 帮助识别处理。
安装处理 css 的 loader

```bash
yarn add style-loader css-loader -D
```

配置文件中指定.css 文件的解析所用 loader

```js
...
module.exports = {
...
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset'
      },
+      {
+        test: /\.css$/,
+        use: ['style-loader', 'css-loader']
+      }
    ]
  }
}
```

再次`yarn build`，无报错而且样式生效

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a46e3ec261fc46f78c2e9ca78adae011~tplv-k3u1fbpfcp-watermark.image)

> 🤔 问题 5：css-loader 我猜是解析 css 的，那么 style-loader 是干啥的？

<details>
<summary>👉 展开查看答案</summary>
css-loader仅能识别并打包css文件，而style-loader将打包出来的css样式插入到HTML的head中，使其在页面上生效
</details>

### 4.打包模式 mode

接下来解决打包模式警告问题：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ba3d1a289a1e4a499396e864f849aa34~tplv-k3u1fbpfcp-watermark.image)

只需要在`webpack.config.js`中指定`mode`配置项即可

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a70af772f1b6437096a90957fdb8e54c~tplv-k3u1fbpfcp-watermark.image)

`mode`参数有两种：`development`和`production`，默认为`production`，这两种模式各有一套默认配置：

**Mode: development**

```js
// webpack.development.config.js

module.exports = {
 mode: 'development'
 devtool: 'eval',
 cache: true,
 performance: {
   hints: false
 },
 output: {
   pathinfo: true
 },
 optimization: {
   moduleIds: 'named',
   chunkIds: 'named',
   mangleExports: false,
   nodeEnv: 'development',
   flagIncludedChunks: false,
   occurrenceOrder: false,
   concatenateModules: false,
   splitChunks: {
     hidePathInfo: false,
     minSize: 10000,
     maxAsyncRequests: Infinity,
     maxInitialRequests: Infinity,
   },
   emitOnErrors: true,
   checkWasmTypes: false,
   minimize: false,
   removeAvailableModules: false
 },
 plugins: [
   new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
 ]
}
```

**Mode: production**

```js
// webpack.production.config.js
module.exports = {
  mode: "production",
  performance: {
    hints: "warning",
  },
  output: {
    pathinfo: false,
  },
  optimization: {
    moduleIds: "deterministic",
    chunkIds: "deterministic",
    mangleExports: "deterministic",
    nodeEnv: "production",
    flagIncludedChunks: true,
    occurrenceOrder: true,
    concatenateModules: true,
    splitChunks: {
      hidePathInfo: true,
      minSize: 30000,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
    },
    emitOnErrors: false,
    checkWasmTypes: true,
    minimize: true,
  },
  plugins: [
    new TerserPlugin(/* ... */),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
}
```

### 5.借助 babel 打包 react 项目

当前的 webpack 配置已经能够打包 js 和 css 以及图片文件了，接下来我们让它支持 react 项目的打包；
众所周知，打包 react 项目的核心工作就是转化其 jsx 语法，这就不得不提到`babel`了。

> 🤔 问题 6：什么是 babel？

<details>
<summary>👉 展开查看答案</summary>
Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。除此之外还能为你做的事情有：

1. 语法转换

2. 通过 Polyfill 方式在目标环境中添加缺失的特性 (通过 @babel/polyfill 模块)

3. 源码转换 (codemods)
</details>

babel 的使用方法：
一个核心包`@babel/core`必须安装的，其余功能可以通过配置插件 plugins 或预设 presets 实现，这里我们要转化 jsx 语法，可以直接使用`@babel/preset-react`这个预设（预设就是一堆插件的合集方案），考虑到在 webpack 中使用 babel，所以还要用到`babel-loader`

```bash
yanr add @babel/core @babel/preset-react babel-loader -D
```

当然 react 和 react-dom 也需要安装到生产依赖中

```bash
yarn add react react-dom
```

新建`index.jsx`文件写入 react 代码

```js
// src/index.jsx

import React from "react"
import ReactDOM from "react-dom"

ReactDOM.render(<div>React组件测试</div>, document.getElementById("root"))
```

配置文件中更改打包入口并增加 jsx 解析规则：

```js
// webpack.config.js

const path = require('path')

module.exports = {
-  // entry: './src/inde.jsx',
+  entry: './src/index.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|webp)$/,
        type: 'asset'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader']
      },
+      {
+        test: /\.jsx?/,
+        use: [
+          {
+            loader: 'babel-loader',
+            options: {
+              presets: ['@babel/preset-react']
+            }
+          }
+        ]
+      }
    ]
  }
}
```

执行`yarn build`打包；
更改`dist/index.html`文件新增 id 为 root 的节点

```html
...
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

可以发现编译成功：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afc0bd66733c49118f0b3246afe8f989~tplv-k3u1fbpfcp-watermark.image)

### 6.配置 plugin

#### （1）html-webpack-plugin

之前的操作中我们多次手动修改 dist 文件夹下的内容，这种操作肯定是不被允许的，所以我们需要配置模板，借助`html-webpack-plugin`自动生成这个测试用的 HTML 文件

```bash
yarn add html-webpack-plugin -D
```

src 目录先新建`index.html`模板文件

```js
// src/index.html

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack搭建TS版React开发环境</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

修改配置项，增加插件

```js
// webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
      ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ]
}
```

此时`yarn build`打包，发现 dist 文件夹下已经自动生成了模板文件，并且自动引入了`main.js`打包文件

#### （2）clean-webpack-plugin

见名知意，这个插件作用很简单，就是在每次打包生成新的打包文件之前自动删除所有老的打包文件

```bash
yarn add clean-webpak-plugin -D
```

```js
// webapck.config.js

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
...

module.exports = {
  entry: './src/index.jsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chuankhash].[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
      ...
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}
```

### 7.支持 TS 版 React 项目编译

如何让 webpack 支持 ts 呢，其实这个问题和`如何支持jsx语法`一样性质，对于代码转化工作都是要 loader 去做。

以下提供两种方案用来支持 React 组件的 TS 写法，无论哪种都要先在本地安装`typescript`

```bash
yarn add typescript -D
```

生成`tsconfig.json`配置文件

```bash
yarn tsc --init
```

#### 方案一：babel-loader 的@babel/preset-typescript

一种方法就是沿用`babel-loader`，通过增加预设`preset`来支持 ts 解析：

```bash
yarn add @babel/preset-typescript -D
```

`src/index.jsx`改名为`src/index.tsx`，同时打包配置文件中的 entry 也要改为`entry: './src/index.tsx'`
为`babel-loader`的 presets 数组增加预设：`@babel/preset-typescript`

```js
// webpack.config.js

const path = require('path')

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[chuankhash].[name].js'
  },
  module: {
    rules: [
        ....
      {
        test: /\.tsx?/,
        use: [
          {
            loader: 'babel-loader',
            options: {
+              presets: ['@babel/preset-react', '@babel/preset-typescript']
            }
          }
        ]
      }
    ]
  },
}
```

执行`yarn build`可以成功打包；

但是这种方案下，很多 typescript 语法是不被支持的，比如我们新建一个 Comp 组件故意写出错误的类型定义：

```ts
const Comp = () => {
  const list: number[] = ["1", "abc"]
  let peekValue: string
  peekValue = list.pop()
  return (
    <>
      <div>这是COMP组件{peekValue}</div>
    </>
  )
}

export default Comp
```

执行`yarn build`可以看到：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d7473c7b6bb42e8916209253f5d4b4e~tplv-k3u1fbpfcp-watermark.image)

说明这种方案虽然能够打包 TS，但是无法在打包过程中对 TS 错误语法进行校验，如果既想打包又想校验怎么办呢？这是就要用到另一个 loader 了：

#### 方案二：ts-loader

```bash
yarn add ts-loader -D
```

配置文件中移除`@babel/preset-typescript`预设并增加`ts-loader`后执行打包：

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d5548f1cd2ca4a34b1738251c2a9c78f~tplv-k3u1fbpfcp-watermark.image)

可以看到一下子出了 16 个 error，可见`ts-loader`是**能在打包过程中对不符合规则的 ts 语法做校验**的。

> 解决报错的过程分别为
>
> 1. tsconfig.json 配置"jsx": "react"
>
> 2. yarn add @types/react @types/react-dom
>
> 3. 解决具体语法报错

### 8.优化开发体验 webpack-dev-server

目前每次重新打包之后都要手动查看 HTML 文件变更，太不“自动化”了，其实 webpack 允许我们开启一个本地服务监听打包过程自动更新页面，而且还能热更新。

```bash
yarn add webpack-dev-server -D
```

开启打包服务，在 4.x 版本中需要修改命令为：`webpack-dev-server`；
而在 5.x 版本中只要：`webpack serve`

```json
// package.json

{
  ...
  "scripts": {
    "build": "webpack",
    "dev": "webpack serve"
  },
  ...
}
```

此时执行`yarn dev`即可观察到已经开启打包监听，devSer 的具体配置项如下：

```js
// webpack.config.js

module.exports = {
    ...
    devServer: {
      contentBase: path.join(__dirname, "dist"), // * 服务启动根目录（除了main.js所在目录之外的静态服务目录）
      compress: true, // * 为每个静态文件开启 gzip compression
      open: true, // * 是否自动打开浏览器，默认false不打开
      port: 8081, // * 自定义服务端口，默认为8080
      hot: true, // * 是否开启模块热更新，默认为false不开启
      proxy: { // * 本地正向代理（常用于非同源请求）
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: {
            "^/api": "",
          },
        },
      },
    },
    ...
}
```

那么至此，一个 ts 版的 react 开发环境就搭建好了，剩下一些自定义配置完全根据各自公司项目需要了，比如我们项目习惯用 sass module 模式开发。

### 9.支持 sass module 开发模式

安装 sass-loader 和 node-sass

```bash
yarn add sass-loader node-sass -D
```

```css
// src/comp.module.scss

.wrap {
  .head {
    font-size: 20px;
    color: blueviolet;
  }
  .body {
    font-size: 14px;
    color: yellowgreen;
  }
}
```

```js
// src/Comp.tsx

import React from 'react'
import styles from './comp.module.scss'

const Comp = () => {
  const list: string[] = ['1', 'abc']
  let peekValue: string
  peekValue = list.pop() as string
  return (<div className={styles.wrap}>
    <div className={styles.head}>这是COMP组件</div>
    <div className={styles.body}>测试使用</div>
  </div>)
}

export default Comp
```

配置文件中增加一个解析规则：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04f7ca0b8030411ab08bd7d8a30da1cb~tplv-k3u1fbpfcp-watermark.image)

为了配合一下 TS，还要新建个类型声明文件

```ts
// typed-css.d.ts

// scss模块声明
declare module "*.scss" {
  const content: { [key: string]: any }
  export = content
}
// less模块声明
declare module "*.less" {
  const content: { [key: string]: any }
  export default content
}
```

### 10.实现 react 模块热替换（HMR）

```bash
yarn add @pmmmwh/react-refresh-webpack-plugin react-refresh -D
```

```js
// webpack.config.js

const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
...
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new CleanWebpackPlugin(),
+    new ReactRefreshPlugin()
  ],
...
```

### 11.配置路径别名

一定要照着下面的配

```js
// webpack.config.js
module.exports = {
  ...
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  ...
}
```

```ts
// tsconfig.json

{
  "compilerOptions": {

    "baseUrl": "./src",
    "paths": {
      "@compoents": ["./components/*"],
      "@/*": ["./*"],
    },
}
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3035ef04c6b04a78ad0ff15933e6242b~tplv-k3u1fbpfcp-watermark.image)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b475ce7e07947c3b89c291562fc3aef~tplv-k3u1fbpfcp-watermark.image)

## 结语

至此，一款工作中能用的 TS 版 React 开发环境已经搭建完毕~

现已具备功能：

- [x] **typescript 语法**
- [x] **sass module**
- [x] **模块热替换**
- [x] **路径别名**
- [x] **解析图片和 CSS**
- [x] **source-map**
      后期可支持项：
- [ ] 第三方包优化，treeshaking，cdn 等
- [ ] 生产环境配置文件分离
- [ ] 生产环境包体积和 chunkname 优化

文中项目源码：[webpack-ts-react-lead](https://github.com/orime/common-test/tree/main/01.webpack-ts-react-lead)
