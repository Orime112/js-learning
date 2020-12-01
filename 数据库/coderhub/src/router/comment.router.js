const KoaRouter = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

const { create, reply, update, remove } = require('../controller/comment.controller.js')

const commentRouter = new KoaRouter({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission("comment"), update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission("comment"), remove)

module.exports = commentRouter