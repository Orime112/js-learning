const Koa = require('koa')

const app = new Koa()

const userRouter = require('./router/user')

app.use(userRouter.routes())
app.use(userRouter.allowedMethods()) // * 未进行设置的请求方法返回不支持的提示信息

app.listen(8888, () => {
  console.log('Koa server is running at http://localhost:8888');
})