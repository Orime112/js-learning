const fs = require('fs')
const path = require('path')

const srcPath = './hanmeimei'
const destPath = './lilei'

fs.readdir(srcPath, (err, files) => {
  console.log(files)
  for(const file of files) {
    if(!file.endsWith('.mp4')) continue
    const srcFilePath = path.join(srcPath, file)
    const destFilePath = path.join(destPath, file)
    if(fs.existsSync(destFilePath)) continue
    fs.copyFileSync(srcFilePath, destFilePath)
  }
})