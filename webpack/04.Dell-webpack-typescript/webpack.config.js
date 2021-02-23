const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.tsx', // * 入口必须是 ./xxx
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist') // * resolve 的第二个参数可以不加 ./
  },
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/
      }
    ]
  }
}