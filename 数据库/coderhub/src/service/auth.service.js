const connection = require('../app/database')

class AuthService {
  async checkMoment (momentId, userId) {
    const statement = `SELECT * FROM moment WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [momentId, userId])
    console.log(result);
    return !!result.length // ! 入股结果 result = []（查不到对应结果），则无权限，如果不为空则有权限
  }
}

module.exports = new AuthService()