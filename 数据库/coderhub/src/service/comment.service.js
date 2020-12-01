const { context } = require('../app')
const connection = require('../app/database')
const errorTypes = require('../constants/error-types')

class CommentService {
  async create(momentId, userId, content) {
    const statement = `INSERT INTO comment (moment_id, user_id, content) VALUES (?, ?, ?)`
    const [result] = await connection.execute(statement, [momentId, userId, content])
    return result
  }
  async reply(momentId, userId, content, commentId, ctx) {
    const statement = `INSERT INTO comment (moment_id, user_id, content, comment_id) VALUES (?, ?, ?, ?)`
    const [result] = await connection.execute(statement, [momentId, userId, content, commentId])
    return result
  }
  async update(commentId, content) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [content, commentId])
    return result
  }
  async remove(commentId) {
    const statement = `DELETE FROM comment WHERE id = ?`
    const [result] = await connection.execute(statement, [commentId])
    return result
  }
}

module.exports = new CommentService()