const service = require('../service/user.service')

class UserController {
  async create(ctx, next){
    const user = ctx.request.body
    const result = await service.create(user)
    ctx.body = result
  }
}

module.exports = new UserController()