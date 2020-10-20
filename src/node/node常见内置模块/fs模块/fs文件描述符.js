const fs = require('fs')
const filePath = './abc.txt'

fs.open(filePath, (err, fd) => {
  console.log({fd})
  fs.fstat(fd, (err, info) => {
    console.log(info)
  })
})