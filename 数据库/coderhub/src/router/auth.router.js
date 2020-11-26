const Router = require('koa-router')
const { login } = require('../controller/auth.controller')
const { verifyLogin } = require('../middleware/auth.middleware')

const authRouter = new Router()

authRouter.post('/login', verifyLogin, login)

module.exports = authRouter