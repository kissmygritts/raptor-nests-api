const { db } = require('../../db')

// Fastify Schemas
const params = {
  type: 'object',
  properties: {
    nestId: { type: 'string' }
  }
}

const schema = {
  params
}

// Helper functions

// Handler
const handler = async (req) => {
  const { nestId } = req.params.nestId

  const result = await db.oneOrNone(
    'select * from nest_by_id where id = $/nestId/',
    { nestId }
  )

  return result
}

module.exports = {
  schema,
  handler
}
