const batchCreateLocations = require('./batch-create-locations')

module.exports = function (fastify, opts, next) {
  fastify.post(
    '/locations/batch',
    { schema: batchCreateLocations.schema },
    batchCreateLocations.handler
  )

  next()
}

module.exports.prefixOverride = ''
