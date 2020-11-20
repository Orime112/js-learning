const app = require('./app')
const config = require('./app/config')

require('./app/database') // * 连接数据库

app.listen(config.APP_PORT, () => console.log(`Server is running at http://localhost:${config.APP_PORT}`))