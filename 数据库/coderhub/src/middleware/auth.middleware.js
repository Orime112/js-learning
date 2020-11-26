const errorTypes = require("../constants/error-types")
const userService = require("../service/user.service")
const md5password = require("../utils/password-handle")

const verifyLogin = async (ctx, next) => {
  const { name, password } = ctx.request.body
  // 判断用户名/密码是否存在
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED)
    return ctx.app.emit("error", error, ctx)
  }
  // 判断用户名是否已经存在
  const result = await userService.findOne(name) // ! 不可以直接取 [0]，否则 undefined
  const user = result[0]
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS)
    return ctx.app.emit("error", error, ctx)
  }
  // 判断密码是否正确
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRECT)
    return ctx.app.emit("error", error, ctx)
  }
  await next()
}

module.exports = {
  verifyLogin,
}
