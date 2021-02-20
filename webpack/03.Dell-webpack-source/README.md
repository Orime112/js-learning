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
- 经过多入口之后，手动进行代码分割 -> main.js 43Kb；lodash.js 1.8Mb
- 或者配置optimization.splitChunks.chunks = 'all'，自动进行代码分割

> 由于浏览器会缓存已经加载过的js文件，所以起到节省网络请求的功能

### import动态引入第三方库
```js
import('lodash').then(({default: _}) => {
  // ...
})
```
由于动态引入是实验性功能，所以需要安装`babel-plugin-dynamic-import-webpack`