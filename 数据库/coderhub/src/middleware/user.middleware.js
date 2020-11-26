const errorTypes = require('../constants/error-types')
const userService = require('../service/user.service')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断用户名/密码是否存在
  if(!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }
  // 判断用户名是否已经存在
  const isExistsUser = await userService.isExists(name)
  if(isExistsUser) {
    const error = new Error(errorTypes.USERNAME_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  const cryptoedPassword = md5password(password)
  ctx.request.body.password = cryptoedPassword // ! 必须挂载在 ctx.request.body 上面
  await next()
}

module.exports = {
  verifyUser,
  handlePassword
}