const { db } = require('../../db')
const {
  nullifyEmptyProps,
  genBatchSql,
  runBatchInsert
} = require('../../utils')
const { nestVisitProps } = require('../../schemas/nest-visits-schema.js')

const bodyProps = {
  ...nestVisitProps,
  created_by: { type: 'string' }
}

// schema
const body = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    required: [
      'id',
      'nest_id',
      'location_id',
      'visit_date',
      'observers',
      'survey_type',
      'occupied'
    ],
    properties: bodyProps
  }
}

const response = {
  200: {
    type: 'array',
    items: {
      type: 'object',
      properties: bodyProps
    }
  }
}

const schema = { body, response }

// handler
const handler = async (req) => {
  const { body } = req
  const data = body.map(nullifyEmptyProps)
  const columns = Object.keys(bodyProps)

  const sql = genBatchSql(data, columns, 'nest_visits')
  const result = await runBatchInsert(sql, db)

  return result
}

module.exports = {
  schema,
  handler
}
