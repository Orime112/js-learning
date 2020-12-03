const connection = require('../app/database')

class MomentService {
  async create(userId, content) {
    const statement = `INSERT INTO moment (user_id, content) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [userId, content]) // ! 异步请求千万记得加 await
    return result;
  }
  async detail(id) {
    const statement = `
      SELECT 
        m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name', u.name) author,
        IF(COUNT(c.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
                      'user', JSON_OBJECT('id', cu.id, 'name', cu.name))
        ),NULL) comments,
        IF(COUNT(l.id),JSON_ARRAYAGG(
          JSON_OBJECT('id', l.id, 'name', l.name)
        ),NULL) labels
      FROM moment m
      LEFT JOIN user u ON m.user_id = u.id
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN user cu ON c.user_id = cu.id
      LEFT JOIN moment_label ml ON m.id = ml.moment_id
      LEFT JOIN label l ON ml.label_id = l.id
      WHERE m.id = ?
      GROUP BY m.id;
    `;
    try {
      const [result] = await connection.execute(statement, [id]);
      return result[0];
    } catch (error) {
      console.log(error)
    }
  }
  async list(offset, size) {
    const statement = `SELECT m.id id, m.content content, m.createAt createAt, m.updateAt updateAt, 
    JSON_OBJECT('id', u.id, 'name', u.name) author, 
    (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount, 
    (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount 
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
  async hasLabel(momentId, labelId) {
    const statement = `SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?`
    const [result] = await connection.execute(statement, [momentId, labelId]) // ! 异步请求千万记得加 await
    return result[0];
  }
  async addLabel(momentId, labelId) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [momentId, labelId]) // ! 异步请求千万记得加 await
    return result;
  }
}

module.exports = new MomentService()