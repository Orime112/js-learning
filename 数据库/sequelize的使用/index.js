const { Sequelize, DataTypes, Model, Op } = require('sequelize')

// * 连接数据库
const sequelize = new Sequelize('phone', 'root', 'orimeSql', {
  host: 'localhost',
  dialect: 'mysql', 
})

// * 创建商品表的连接类
class Product extends Model {

}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: DataTypes.DOUBLE,
  score: DataTypes.DOUBLE,
}, {
  tableName: 'products',
  createdAt: false,
  updatedAt: false,
  sequelize,
})

async function queryProducts (){
  const result = await Product.findAll({
    where: {
      price: {[Op.gte]: 9000}
    }
  })
  console.log(result);
}

queryProducts()