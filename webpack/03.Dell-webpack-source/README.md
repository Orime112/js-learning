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
