const { db } = require('../../db')
const {
  nullifyEmptyProps,
  genBatchSql,
  runBatchInsert
} = require('../../utils')
const { nestProps } = require('../../schemas/nest-schema.js')
const bodyProps = {
  ...nestProps,
  created_by: { type: 'string' }
}

// schema
const body = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    required: ['nest_substrate', 'nest_type'],
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
  const columns = [
    'id',
    'habitat_category',
    'habitat_description',
    'location_description',
    'nest_type',
    'nest_substrate',
    'probable_origin',
    'nest_comments',
    'created_by'
  ]

  const sql = genBatchSql(data, columns, 'nests')
  const results = await runBatchInsert(sql, db)

  return results
}

module.exports = {
  schema,
  handler
}
