## dll
`Dynamic Link Library`打包方案中，指定的第三方模块只会打包一次，并且生成*.dll.js文件和*.manifest.json文件，第二次打包的时候直接从dll文件夹中检测到则不会从node_modules中拉取打包，提升第一次之后的打包效率。
- ./biuld/webpack.dll.js
```js
...
module.exports = {
  entry: {
    vendors: ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, './dll'),
    library: '[name]' // 打包成拥有[name]全局变量的模块
  },
  plugins:[
    new webpack.DllPlugin({ // 生成[name].manifest.json文件，记录映射关系
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    })
  ]
}
```
- .webpack.config.js
```js
...
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')

module.exports = {
  plugins: [
    ...
    new AddAssetHtmlWebpackPlugin({
      publicPath: './',
      filepath: path.resolve(__dirname, './dll/vendors.dll.js')
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
    })
  ]
}
```