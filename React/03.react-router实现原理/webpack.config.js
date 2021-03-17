const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { TerserPlugin } = require('html-minifier-terser')

module.exports = {
  entry: './src/index.tsx',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  devServer: {
    open: true,
    hot: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react']
          }
        }
      }
    ]
  },
  optimization: {
    minimizer: [
      // new TerserPlugin()
    ],
    chunkIds: 'deterministic', // natural自然数；named以文件名+路径组织见名知意；deterministic生产环境推荐，同文件不变
    splitChunks: {
      chunks: 'initial', // ! import 动态导入的模块都会默认做代码分离
      maxSize: 300000
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new CleanWebpackPlugin()
  ]
}