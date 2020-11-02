const fs = require('fs')

const filePath = './abc.txt'

// 1、使用同步方式获取
const info = fs.statSync(filePath)
console.log('代码执行')
console.log(info)

// 2、异步回调获取
fs.stat(filePath, (err, info) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(info)
})

//3、promise方式获取
fs.promises.stat(filePath).then(res => console.log(res)).catch(err => console.log(err))