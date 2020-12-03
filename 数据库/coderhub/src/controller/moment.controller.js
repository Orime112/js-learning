const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    const userId = ctx.user.id
    const content = ctx.request.body.content
    const result = await momentService.create(userId, content)
    ctx.body = result
  }
  async detail(ctx) {
    const momentId = ctx.params.momentId
    const result = await momentService.detail(momentId)
    ctx.body = result
  }
  async list(ctx) {
    const { offset, size } = ctx.request.query
    const result = await momentService.list(offset, size)
    ctx.body = result
  }
  async update(ctx) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const result = await momentService.update(content, momentId)
    ctx.body = result
  }
  async remove(ctx) {
    const { momentId } = ctx.params
    const result = await momentService.remove(momentId)
    ctx.body = result
  }
  async addLabels(ctx) {
    const { momentId } = ctx.params
    const labels = ctx.labels
    for(let label of labels) {
      const hasLabel = await momentService.hasLabel(momentId, label.id)
      if(!hasLabel) {
        await momentService.addLabel(momentId, label.id)
      }
    }
    ctx.body = '给动态添加标签成功~'
  }
}

module.exports = new MomentController()