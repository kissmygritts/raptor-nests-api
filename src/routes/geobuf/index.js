const { handler: getNestsGeobuf } = require('./nests-geobuf.js')

module.exports = function (fastify, opts, next) {
  fastify.get(
    '/geobuf/nests',
    {
      preValidation: [fastify.authenticate]
    },
    getNestsGeobuf
  )

  next()
}

module.exports.prefixOverride = ''
