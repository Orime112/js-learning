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
}

module.exports = new MomentController()