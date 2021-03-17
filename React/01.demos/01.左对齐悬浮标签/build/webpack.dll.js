const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: {
    'vendors': ['react', 'react-dom']
  },
  output: {
    filename: '[name].dll.js',
    path: path.resolve(__dirname, '../dll'),
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(__dirname, '../dll/[name].manifest.json')
    }) 
  ]
}
