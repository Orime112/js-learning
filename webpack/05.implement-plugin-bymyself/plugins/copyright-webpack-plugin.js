class CopyrightWebpackPlugin {
  constructor(){
    console.log('插件被使用了')
  }
  apply(compiler){

    // 同步执行代码的调试
    compiler.hooks.compile.tap('CopyrightWebpackPlugin', (compilation) => {
      console.log('compile station')
    })

    compiler.hooks.emit.tapAsync('CopyrightWebpackPlugin', (compilation, cb) => {
      debugger;
      console.log(compilation.assets['copyright.txt'] = {
        source: function(){
          return 'this is copyright infomation'
        },
        size: function(){
          return 21
        }
      }) // * 本次打包生成的所有文件
      cb() // ! 必须在最后调用 cb 函数才能正确打包
    })
  }
}

module.exports = CopyrightWebpackPlugin