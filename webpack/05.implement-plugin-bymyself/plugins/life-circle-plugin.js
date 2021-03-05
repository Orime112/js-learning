class LifeCirclePlugin {
  constructor( options ){
    this.options = options
  }
  apply(compiler){
    const funcs = ['run', 'compile', 'compilation', 'make', 'emit', 'afterEmit', 'assetEmitted', 'done']
    // compiler.hooks.run.tap('run', () => {
    //   console.log('开始编译 run')
    // })
    // compiler.hooks.compile.tap('compile', () => {
    //   console.log('compile 阶段')
    // })
    // compiler.hooks.compilation.tap('compilation', () => {
    //   console.log('compilation 阶段')
    // })
    // compiler.hooks.make.tap('make', () => {
    //   console.log('make 阶段')
    // })
    // compiler.hooks.eimt.tap('eimt', () => {
    //   console.log('eimt 阶段')
    // })
    funcs.forEach((item) => {
      compiler.hooks[item].tap(item, () => {
        console.log(`${item} 阶段`)
      })
    })

    compiler.hooks.beforeCompile.tapAsync('compilation', (compilation, cb) => {
      setTimeout(() => {
        console.log('beforeCompiler 编译中...')
        cb()
      }, 2000)
    })

  }
}

module.exports = LifeCirclePlugin