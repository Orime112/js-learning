const errorTypes = require("../constants/error-types");

const errorHandle = (error, ctx) => {
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
    default:
      status = 404
      message = "NOT FOUND"
      break;
  }
  ctx.status = status
  ctx.body = message
}

module.exports = errorHandle