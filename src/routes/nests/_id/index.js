const { db } = require('../../../db')
const { createVisitHandler } = require('./post-visit.js')

const getNestByIdQuery = async ({ id }) => {
  const query = 'select * from nests_by_id where id = $/id/'
  return db.oneOrNone(query, { id })
}

async function handler(req) {
  const { params } = req
  const result = await getNestByIdQuery({ id: params.id })

  return result
}

module.exports = function (fastify, opts, next) {
  fastify.get(
    '/nests/:id',
    {
      preValidation: [fastify.authenticate]
    },
    handler
  )
  fastify.post(
    '/nests/:id/new',
    {
      preValidation: [fastify.authenticate]
    },
    createVisitHandler
  )

  next()
}

module.exports.prefixOverride = ''
