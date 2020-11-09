const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

app.use((ctx, next) => {
  let isLogin = false
  if(!isLogin) {
    ctx.app.emit('error', new Error('您还没有登录！'), ctx)
  }
})

app.on('error', (err, ctx) => {
  ctx.status = 401
  ctx.body = err.message
})


app.listen(8888, () => {
  console.log('Server is running at http://localhost:8888');
})