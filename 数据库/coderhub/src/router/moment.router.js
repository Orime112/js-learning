const Router = require('koa-router')
const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { create, detail, list, update, remove, addLabels } = require('../controller/moment.controller')
const { verifyLabelExist } = require('../middleware/label.middleware')

const momentRouter = new Router({prefix: '/moment'})

momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.get('/:momentId', detail)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission("moment"), update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission("moment"), remove)

// 给动态添加标签
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission('moment'), verifyLabelExist, addLabels)

module.exports = momentRouter