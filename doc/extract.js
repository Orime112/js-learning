const fs = require('fs')

// fs.open('./[CSDN]史上最全面试题整理.md', (err, fd) => {
//   if(err){
//     console.log(err)
//     return
//   }
//   console.log(fd)
// })

const matchTitle = (data) => {
  const reg = /(#{2,3}.+)/g
  const resultList = []
  let i = 1, j = 1
  data.replace(reg, (content, $1) => {
    const flagCount = $1.slice(0, $1.lastIndexOf('#') + 1).length
    let tit = ''
    if (flagCount === 2) {
      tit = $1.replace(/(#{2} )(.+)/g, (content, a1, a2) => {
        const res = `${a1}${i++}、${a2}`
        return res
      })
      j = 1
    } else {
      tit = $1.replace(/(#{3} )(.+)/g, (content, a1, a2) => {
        const res = `${a1}(${j++})、${a2}`
        return res
      })
    }
    resultList.push(tit)
  })
  return resultList.join('\n')
}

fs.readFile('./[CSDN]史上最全面试题整理.md', { encoding: 'utf8' }, (err, data) => {
  if (err) {
    console.log(err)
    return
  }
  console.log(typeof data)
  const newData = matchTitle(data)
  fs.writeFile('./[题干]史上最全面试题整理.md', newData, (err) => {
    console.log(err)
  })
})
