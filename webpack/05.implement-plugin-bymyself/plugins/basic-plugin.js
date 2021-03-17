class WebpackPlugin1 {
  constructor(options) {
    this.options = options
  }
  apply(compiler) {
    compiler.hooks.done.tap('MYWebpackPlugin', () => {
      console.log('webpackPlugin1执行', this.options)
    })
  }
}

module.exports = WebpackPlugin1
