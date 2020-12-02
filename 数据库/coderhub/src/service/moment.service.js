const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [userId, content]) // ! 异步请求千万记得加 await
    return result;
  }
  async detail(momentId) {
    const statement = `SELECT m.id id, m.content content, m.createAt createTime, JSON_OBJECT('id', u.id, 'name', u.name) author FROM moment m LEFT JOIN user u ON m.user_id = u.id WHERE m.id = ?`
    try {
    const [result] = await connection.execute(statement, [momentId]) // ! 异步请求千万记得加 await
    return result[0];
    } catch (error) {
      console.log(error);
    }
  }
  async list(offset, size) {
    const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
    JSON_OBJECT('id', u.id, 'name', u.name) author, 
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount 
    FROM moment m LEFT JOIN user u ON m.user_id = u.id LIMIT ?, ?;`
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