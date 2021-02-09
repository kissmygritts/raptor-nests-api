const { db, pgp } = require('../../db')
const { nestVisitProps } = require('../../schemas/nest-visits-schema.js')
const { nullifyEmptyProps } = require('../../utils')

// Schema
const params = {
  type: 'object',
  properties: {
    nestId: { type: 'string' }
  }
}

const body = {
  type: 'object',
  properties: nestVisitProps,
  additionalProperties: false
}

const schema = {
  params,
  body
}

// Helper functions
const parseBody = ({ body }) => {
  const data = nullifyEmptyProps(body)

  console.log(JSON.stringify({ data }))
  return data
}

const insert = ({ visit }) => {
  const insert = pgp.helpers.insert
  const visitSql = `${insert(visit, null, 'nest_visits')} returning *`
  return visitSql
}

const runInsert = async ({ visit }) => {
  const visitSql = insert({ visit })
  return db.oneOrNone(visitSql)
}

// Handler function
const handler = async (req) => {
  const data = parseBody(req)
  const result = await runInsert({ visit: data })
  return result
}

module.exports = {
  schema,
  handler
}
