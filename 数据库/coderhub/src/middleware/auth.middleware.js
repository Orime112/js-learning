const errorTypes = require("../constants/error-types")
const userService = require("../service/user.service")
const md5password = require("../utils/password-handle")
const jwt = require('jsonwebtoken')
const { PUBLIC_KEY } = require("../app/config")
const authService = require("../service/auth.service")

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
  ctx.request.body.user = { id: user.id, name: user.name }
  await next()
}

/** // * 验证授权 */
const verifyAuth = async (ctx, next) => {
  // ? 1、获取 token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
    return
  }
  const token = authorization.replace('Bearer ', '')
  // ? 2、验证 token
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = result // ! ctx.body 赋给新的值就是返回数据，如果给 ctx.body 上挂载属性则是挂属性
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZED)
    ctx.app.emit('error', error, ctx)
  }
}

/** // * 验证是否有操作权限 */
const verifyPermission = async (ctx, next) => {
  console.log('验证是否有操作权限的 middleware！');
  // ? 1、获取参数
  const { momentId } = ctx.params
  const { id } = ctx.user
  // ? 2、检查是否有权限
  try {
    const isPermission = await authService.checkMoment(momentId, id)
    if (!isPermission) throw new Error()
    console.log(isPermission, 'isPermission');
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission
}
