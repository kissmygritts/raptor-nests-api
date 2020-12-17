const { schema: getAllSchema, handler: getAllHandler } = require('./nests.js')

module.exports = function (fastify, opts, next) {
  fastify.get('/nests', { schema: getAllSchema }, getAllHandler)

  next()
}

module.exports.prefixOverride = ''
