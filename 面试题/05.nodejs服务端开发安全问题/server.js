const express = require('express')
const child_process = require('child_process')

const app = express()

app.get('/calc', (req,res,next) => {
  child_process.exec('abc')
  console.log('完成计算')
  res.end()
})

app.listen(3000, () => console.log(`Server is running at http://localhost:3000`))