// * 导出的是一个类
const Koa = require('koa')

const app = new Koa()

app.use((ctx, next) => {
  ctx.response.body = 'hello koa'
})

app.listen(8888, () => {
  console.log('koa初体验服务器启动成功');
  
})