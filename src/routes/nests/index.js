const { schema: getAllSchema, handler: getAllHandler } = require('./nests.js')
const {
  schema: postNestSchema,
  handler: postNestHandler
} = require('./nests-post.js')
const {
  schema: editNestSchema,
  handler: editNestHandler
} = require('./nests-edit.js')
const {
  schema: createNestVisitSchema,
  handler: createNestVisitHandler
} = require('./create-nest-visit.js')
const batchCreateNests = require('./batch-create-nests.js')

module.exports = function (fastify, opts, next) {
  fastify.get('/nests', { schema: getAllSchema }, getAllHandler)
  fastify.post('/nests', { schema: postNestSchema }, postNestHandler)

  fastify.post(
    '/nests/batch',
    { schema: batchCreateNests.schema },
    batchCreateNests.handler
  )

  fastify.put('/nests/:nestId', { schema: editNestSchema }, editNestHandler)
  fastify.post(
    '/nests/:nestId/visits',
    { schema: createNestVisitSchema },
    createNestVisitHandler
  )

  next()
}

module.exports.prefixOverride = ''
