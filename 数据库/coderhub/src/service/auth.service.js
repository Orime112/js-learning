const connection = require('../app/database')

class AuthService {
  async checkResource(tableName, resourceId, userId) {
    const statement = `SELECT * FROM ${tableName} WHERE id = ? AND user_id = ?` // ! 这里的 tableName 不能通过 ? 传递进去
    console.log(tableName, resourceId, userId);
    try {
      const [result] = await connection.execute(statement, [resourceId, userId])
      console.log(result);
      return !!result.length // ! 如果结果 result = []（查不到对应结果），则无权限，如果不为空则有权限
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AuthService()