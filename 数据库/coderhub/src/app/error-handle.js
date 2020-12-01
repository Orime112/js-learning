const errorTypes = require("../constants/error-types");

const errorHandle = (error, ctx) => { // ! ctx.app.emit('error', error, ctx)，必须把 ctx 传入作为错误处理函数的第二个参数
  let status, message
  switch (error.message) {
    case errorTypes.NAME_OR_PASSWORD_IS_REQUIRED:
      status = 400 // bad request
      message = '用户名或密码不能为空'
      break;
    case errorTypes.USERNAME_ALREADY_EXISTS:
      status = 400 // bad request
      message = '用户名已存在！'
      break;
    case errorTypes.USER_DOES_NOT_EXISTS:
      status = 400 // bad request
      message = '用户不存在！'
      break;
    case errorTypes.PASSWORD_IS_INCORRECT:
      status = 400 // bad request
      message = '密码错误！'
      break;
    case errorTypes.UNAUTHORIZATION:
      status = 401 // bad request
      message = '请求错误，未携带 token ！'
      break;
    case errorTypes.UNAUTHORIZED:
      status = 401 // unauthorized
      message = '未授权，token 无效！'
      break;
    case errorTypes.UNPERMISSION:
      status = 401 // unauthorized
      message = '您不具备操作的权限！'
      break;
    default:
      status = 404
      message = "NOT FOUND"
      break;
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle