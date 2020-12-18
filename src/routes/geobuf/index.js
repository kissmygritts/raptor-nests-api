const { handler: getNestsGeobuf } = require('./nests-geobuf.js')

module.exports = function (fastify, opts, next) {
  fastify.get('/geobuf/nests', {}, getNestsGeobuf)

  next()
}

module.exports.prefixOverride = ''
