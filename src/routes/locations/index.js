const {
  schema: postLocationsSchema,
  handler: postLocationsHandler
} = require('./locations-post.js')

module.exports = function (fastify, opts, next) {
  fastify.post(
    '/locations',
    { schema: postLocationsSchema },
    postLocationsHandler
  )

  next()
}

module.exports.prefixOverride = ''
