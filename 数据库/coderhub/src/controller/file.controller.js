const { APP_HOST, APP_PORT } = require('../app/config')
const { AVATAR_PATH } = require('../constants/file-path')
const fileService = require('../service/file.service')
const userService = require('../service/user.service')

class FileController {
  async saveAvatarInfo(ctx, next) {
    // console.log(ctx.req.file, ctx.request.file);
    const { mimetype, filename, size } = ctx.req.file
    const { id } = ctx.user
    try {
      await fileService.createAvatar(filename, mimetype, size, id)
      // * 将图片地址保存到 user 表中
      const avatarUrl = `${APP_HOST}:${APP_PORT}/user/${id}/avatar`
      await userService.updateAvatarUrlById(avatarUrl, id)
      ctx.body = '用户上传头像成功！'
    } catch (error) {
      console.log(error);
      ctx.body = '上传头像出错~'
    }
  }
}

module.exports = new FileController()