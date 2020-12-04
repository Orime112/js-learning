const Router = require('koa-router')
const { create, avatarInfo } = require('../controller/user.controller')
const { verifyAuth } = require('../middleware/auth.middleware')
const { verifyUser, handlePassword }   = require('../middleware/user.middleware')

const userRouter = new Router({prefix: '/user'})

userRouter.post('/', verifyUser, handlePassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter