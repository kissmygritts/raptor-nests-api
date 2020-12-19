const { schema: getAllSchema, handler: getAllHandler } = require('./nests.js')
const {
  schema: postNestSchema,
  handler: postNestHandler
} = require('./nests-post.js')

module.exports = function (fastify, opts, next) {
  fastify.get('/nests', { schema: getAllSchema }, getAllHandler)
  fastify.post('/nests', { schema: postNestSchema }, postNestHandler)

  next()
}

module.exports.prefixOverride = ''
