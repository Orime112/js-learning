const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [userId, content]) // ! 异步请求千万记得加 await
    return result;
  }
  async detail(momentId) {
    const statement = `SELECT m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', u.name) author FROM moment m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?;`
    const [result] = await connection.execute(statement, [momentId]) // ! 异步请求千万记得加 await
    return result[0];
  }
  async list(offset, size) {
    const statement = `SELECT m.id id, m.content content, JSON_OBJECT('id', u.id, 'name', u.name) author FROM moment m LEFT JOIN users u ON m.user_id = u.id LIMIT ?, ?;`
    const [result] = await connection.execute(statement, [offset, size]) // ! 异步请求千万记得加 await
    return result;
  }
  async update(content, momentId) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, momentId]) // ! 异步请求千万记得加 await
    return result;
  }
  async remove(momentId) {
    const statement = `DELETE FROM moment WHERE id = ?`
    const [result] = await connection.execute(statement, [momentId]) // ! 异步请求千万记得加 await
    return result;
  }
}

module.exports = new MomentService()