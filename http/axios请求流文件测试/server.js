const fs = require('fs')

const Koa = require('koa')

const app = new Koa()

// 处理跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*")
  await next()
})

app.use((ctx, next) => {
  const reader = fs.createReadStream('./picture.png')
  // ctx.type = 'png';
  ctx.response = {
    type: 'png'
  }
  ctx.body = reader
})

app.listen(8989, () => console.log('Server is running at http://localhost:8989'))