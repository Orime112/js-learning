const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin')
const { DllReferencePlugin } = require('webpack')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.jsx',
    list: './src/list.jsx'
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, './dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules:[
      {
        test: /\.jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/react']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'list.html',
      chunks: ['list']
    }),
    new CleanWebpackPlugin(),
    new AddAssetHtmlWebpackPlugin({
      publicPath: './',
      filepath: path.resolve(__dirname, './dll/vendors.dll.js')
    }),
    new DllReferencePlugin({
      manifest: path.resolve(__dirname, './dll/vendors.manifest.json')
    })
  ],
  optimization: {
    splitChunks:{
      chunks: 'all',
    }
  }
}