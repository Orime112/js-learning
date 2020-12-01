const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../key/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../key/public.key'))

dotenv.config()

const { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env

module.exports = { APP_PORT, MYSQL_HOST, MYSQL_PORT, MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, PRIVATE_KEY, PUBLIC_KEY }