const KoaRouter = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')

const { create, reply, update, remove, list } = require('../controller/comment.controller.js')

const commentRouter = new KoaRouter({prefix: '/comment'})

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/:commentId/reply', verifyAuth, reply)
commentRouter.patch('/:commentId', verifyAuth, verifyPermission("comment"), update)
commentRouter.delete('/:commentId', verifyAuth, verifyPermission("comment"), remove)
// * 根据 momentId 获取评论列表
commentRouter.get('/:momentId', list)

module.exports = commentRouter