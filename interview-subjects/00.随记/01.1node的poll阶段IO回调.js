const fs = require('fs')

fs.readFile('./01.浏览器和node环境中事件循环区别.md', () => {
  console.log('readFile')
  setTimeout(() => {
    console.log('timeout')
  }, 0)
  setImmediate(() => {
    console.log('immediate')
  })
})

/**
 * readFile
immediate
timeout
 */