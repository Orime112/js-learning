const Router = require('koa-router')
const { login, success } = require('../controller/auth.controller')
const { verifyLogin, verifyAuth } = require('../middleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)
authRouter.post('/test', verifyAuth, success)

module.exports = authRouter