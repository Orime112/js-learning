const Koa = require('koa')
const bodyparser = require('koa-bodyparser') // ! koa-bodyparser 库用来解析 json 和 urlencoded
const Router = require('koa-router')
const multer = require('koa-multer')

const app = new Koa()
const loginRouter = new Router({prefix: '/login'})

const upload = multer()

loginRouter.post('/', upload.any(), (ctx, next) => {
  console.log(ctx.req.body); // multer 对 form-data 参数进行解析之后放到了原生 req 对象上
  console.log(ctx.request.body); // 而不是放到了 koa 封装的 request 对象上
  ctx.response.body = '登录成功'
})

app.use(bodyparser())

app.use(loginRouter.routes())

app.use((ctx, next) => {
  console.log(ctx.request.body);
  // ctx.response.body = '请求成功'
  next()
})

app.listen(8888, () => {
  console.log('Server is running at http://localhost:8888');
  
})