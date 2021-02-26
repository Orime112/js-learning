const path = require('path')
const CopyrightWebpackPlugin = require('./plugins/copyright-webpack-plugin')

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
    new CopyrightWebpackPlugin()
  ]
}