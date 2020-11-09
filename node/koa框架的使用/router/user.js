const Router = require('koa-router')

const router = new Router({prefix: '/users'})

router.get('/', (ctx, next) => {
  ctx.response.body = 'user lists~'
})

router.put('/', (ctx, next) => {
  ctx.response.body = 'user put~'
})

module.exports = router