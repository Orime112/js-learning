const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const fs = require('fs')
const { AVATAR_PATH } = require('../constants/file-path')

class UserController {
  async create(ctx, next){
    const user = ctx.request.body
    const result = await userService.create(user)
    ctx.body = result
  }
  async avatarInfo(ctx, next){
    const {userId} = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    ctx.set('content-type', avatarInfo.mimetype)
    try {
      ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
    } catch (error) {
      console.log(error);
      ctx.body = '请求失败'
    }
  }
}

module.exports = new UserController()