const service = require('../service/user.service')

class AuthController {
  async login(ctx, next){
    const { name } = ctx.request.body
    ctx.body = `欢迎${name}回来！`
  }
}

module.exports = new AuthController()