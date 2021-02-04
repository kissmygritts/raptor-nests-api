const { schema: getAllSchema, handler: getAllHandler } = require('./nests.js')
const {
  schema: postNestSchema,
  handler: postNestHandler
} = require('./nests-post.js')
const {
  schema: editNestSchema,
  handler: editNestHandler
} = require('./nests-edit.js')

module.exports = function (fastify, opts, next) {
  fastify.get('/nests', { schema: getAllSchema }, getAllHandler)
  fastify.post('/nests', { schema: postNestSchema }, postNestHandler)
  fastify.put('/nests/:nestId', { schema: editNestSchema }, editNestHandler)

  next()
}

module.exports.prefixOverride = ''
