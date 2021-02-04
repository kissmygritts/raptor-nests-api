const { db, pgp } = require('../../db')
const { nestProps } = require('../../schemas/nest-schema.js')

// Fastify Schemas
// generate schemas from nest props
const { id, ...nestPropsMinusId } = nestProps // eslint-disable-line no-unused-vars
const nestPropsMinusEnums = Object.keys(nestProps).reduce(
  (acc, prop) => Object.assign(acc, { [prop]: { type: nestProps[prop].type } }),
  {}
)

console.log(JSON.stringify({ schema: nestPropsMinusEnums }))

// Request body schema
const bodySchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    ...nestPropsMinusId
  }
}

// Response schema
const responseSchema = {
  200: {
    type: 'object',
    additionalProperties: false,
    properties: nestPropsMinusEnums
  }
}

// Helper functions
const genUpdateSql = ({ nest }) => {
  const format = pgp.as.format
  const update = pgp.helpers.update

  const { id, ...nestProps } = nest

  const updateSql = update(nestProps, null, 'nests')
  const sql = format(`$<updateSql:raw> where id = $<id> returning *`, {
    updateSql,
    id
  })

  return sql
}

const runUpdateQuery = async ({ nest }) => {
  const updateNestSql = genUpdateSql({ nest })
  return db.oneOrNone(updateNestSql)
}

// Route handler
const handler = async (req) => {
  const { params, body } = req
  const nest = {
    id: params.nestId,
    ...body
  }

  const result = await runUpdateQuery({ nest })

  return result
}

module.exports = {
  schema: {
    body: bodySchema,
    response: responseSchema
  },
  handler
}
