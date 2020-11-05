const express = require('express')

const app = express()

app.use(express.json()) // 将 JSON 格式解析之后绑定到 req.body 上
app.use(express.urlencoded()) // 将 x-www-form-urlencoded 格式解析后绑定到 req.body 上

app.post('/login', (req, res, next) => {
  console.log(req.body);
  res.end('登录成功~')
})

app.listen(9090, () => {
  console.log('Server is running at http://localhost:9090');
})