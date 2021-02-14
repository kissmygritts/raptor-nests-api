const batchCreateVisits = require('./batch-create-visits.js')

module.exports = function (fastify, opts, next) {
  fastify.post(
    '/nest-visits/batch',
    { schema: batchCreateVisits.schema },
    batchCreateVisits.handler
  )

  next()
}

module.exports.prefixOverride = ''
