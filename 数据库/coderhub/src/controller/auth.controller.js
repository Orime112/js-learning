const service = require('../service/user.service')
const jwt = require('jsonwebtoken')
const { PRIVATE_KEY } = require('../app/config')

class AuthController {
  async login(ctx, next) {
    const { user } = ctx.request.body
    const token = jwt.sign({ name: user.name, id: user.id }, PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24, // ! 单位是秒，代表一天后过期
      algorithm: 'RS256'
    })
    ctx.body = { ...user, token }
  }
  async success(ctx, next) {
    ctx.body = '授权成功~'
  }
}

module.exports = new AuthController()