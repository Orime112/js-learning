const Router = require('koa-router')

const { verifyAuth } = require('../middleware/auth.middleware')
const { avatartHandler } = require('../middleware/file.middleware')

const {saveAvatarInfo} = require('../controller/file.controller')

const fileRouter = new Router({prefix: '/upload'})

fileRouter.post('/avatar', verifyAuth, avatartHandler, saveAvatarInfo)

module.exports = fileRouter