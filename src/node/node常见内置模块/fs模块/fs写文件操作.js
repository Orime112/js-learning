const fs = require('fs')

const content = '你好啊'

fs.writeFile('./abc.txt', content, {flag: 'a+'}, (err) => {
  console.log(err)
})