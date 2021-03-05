const path = require('path')
const WebpackPlugin1 = require('./plugins/basic-plugin')
const CleanWebpackPlugin = require('./plugins/clean-webpack-plugin')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')
const FileListPlugin = require('./plugins/file-list-plugin')
const LifeCirclePlugin = require('./plugins/life-circle-plugin')
const RemoveCommentPlugin = require('./plugins/remove-comment-plugin')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, './loaders/replacement-loader.js'),
          options: {
            name: 'test'
          }
        }
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  plugins: [
    // new CopyrightWebpackPlugin(), // ! 生成新的文件的plugin，compilation.assets['copyright.txt'] = xxxxxxx
    // new WebpackPlugin1({msg: 'Hello World!'})
    // new LifeCirclePlugin(), // ! 查看钩子声明周期
    // new FileListPlugin(),
    // new CleanWebpackPlugin() // ! 测试失败
    new RemoveCommentPlugin()
  ]
}