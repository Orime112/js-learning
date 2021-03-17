# 从零搭建一个 webpack 开发环境

## 装包
```bash
yarn init -y

yarn add webpack webpack-cli babel-loader @babel/core @babel/preset-env css-loader style-loader webpack-dev-server clean-webpack-plugin html-webpack-plugin -D
```

## 配置React开发环境

装包

```bash
yarn add react react-dom -S
yarn add @babel/preset-react -D
```

## tree shaking

tree shaking 只支持 ESM 方案导入的模块，不支持 CJS 方案导入的模块

development环境下需要加配置项
```js
// webpack.config.js
module.exports = {
  ...,
  optimization: {
    usedExports: true
  }
  ...
}

// package.json
{
  ...,
  sideEffects: ["*.css", "@babel/polyfill"], // false 表示所有 import 导入但是没用到的模块都 tree shaking，如果传入数组则排除个别项
  ...
}
```

production环境下默认做了tree shaking
- 不需要配置 optimization 也可以实现 tree shaking
- 但是要把 devTool 更改为`cheap-module-source-map` 或 `false` 

## code spliting
默认将第三方模块一起打包到`main.js`文件中，导致首次请求2.0Mb的内容，页面重新刷新之后还要请求2.0Mb的内容
- 1、多入口配置方案经过多入口之后，手动进行代码分割 -> main.js 43Kb；lodash.js 1.8Mb
- 2、生产环境配置：optimization.splitChunks.chunks = 'all'，自动进行代码分割
  - 同步/异步代码都会进行代码分割

> 由于浏览器会缓存已经加载过的js文件，所以起到节省网络请求的功能

> 注意：webpack的optimization.splitChunks默认值为async，意思是异步代码才对首屏加载优化有影响，all同步代码只是提高了缓存利用率。

## import动态引入第三方库
```js
import('lodash').then(({default: _}) => {
  // ...
})
```
由于动态引入是实验性功能，所以需要安装`babel-plugin-dynamic-import-webpack`

但是以上插件无法支持魔法字符串更改动态模块打包名称，所以需要安装`@babel/plugin-syntax-dynamic-import`插件，并且配置到`babel-loader`的`plugins`选项中

- 魔法字符串配置语法
```js
  ...
  return import(/* webpackChunkName:"lds" */ "lodash")
  ...
```

## webpackPrefetch: true 优化异步代码加载速度
```js
document.addEventListener("click", () => {
  import(/* webpackPrefetch: true */ "./js/pre-fetch-click").then(({ default: func }) => {
    func()
  })
})
```
> 注意：preload 并不能等空闲时候才去加载

> 现在的前端性能优化，缓存并不是最重要的点，要转移到代码覆盖率上去思考

## 分离css模块文件
`mini-css-extract-plugin`无法在开发环境中热更新，只能在生产环境下使用
```js
// 安装 mini-css-extract-plugin
yarn add mini-css-extract-plugin -D
```
使用方式：
```js
const = MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 将原来的 style-loader 替换为 MiniCssExtractPlugin.loader
```

### 分离出的css代码进行压缩
```js
yarn add optimize-css-assets-webpack-plugin -D
```

## contenthash 标识每次打包生成独一无二的文件
