const connection = require('../app/database')

class UserService {
  async create(user){
    const { name, password } = user
    const statement = `INSERT INTO user (name, password) VALUES (?, ?)`
    const [result] = await connection.execute(statement, [name, password])
    return result
  }
  async isExists(name){
    const statement = `SELECT * FROM user WHERE name = ?`
    const [data, binary] = await connection.execute(statement, [name])
    return !!data.length
  }
  async findOne(name){
    const statement = `SELECT * FROM user WHERE name = ?`
    const [data, binary] = await connection.execute(statement, [name])
    return data
  }
  async updateAvatarUrlById(avatarUrl, userId){
    const statement = `UPDATE user SET avatar_url = ? WHERE id = ?`
    const [data, binary] = await connection.execute(statement, [avatarUrl, userId])
    return data
  }
}

module.exports = new UserService()