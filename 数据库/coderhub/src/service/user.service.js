const connection = require('../app/database')

class UserService {
  async create(user){
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (?, ?)`
    const result = await connection.execute(statement, [name, password])
    return result
  }
  async isExists(name){
    const statement = `SELECT * FROM users WHERE name = ?`
    const [data, binary] = await connection.execute(statement, [name])
    console.log(data, '判断重复');
    return !!data.length
  }
}

module.exports = new UserService()