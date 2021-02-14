const { db } = require('../../db')
const {
  nullifyEmptyProps,
  xyToGeom,
  genBatchSql,
  runBatchInsert
} = require('../../utils')
const locationSchema = require('../../schemas/location-schema.js')

const bodyProps = {
  ...locationSchema.bodyProps,
  created_by: { type: 'string' }
}

// schema
const body = {
  type: 'array',
  items: {
    type: 'object',
    additionalProperties: false,
    required: locationSchema.required,
    properties: bodyProps
  }
}

const response = {
  200: {
    type: 'array',
    items: {
      type: 'object',
      properties: locationSchema.responseProps
    }
  }
}

const schema = { body, response }

// handler
const handler = async (req) => {
  const { body } = req
  const columns = [
    'id',
    'nest_id',
    'exact_coordinates',
    'current_location',
    'direction',
    'distance',
    'geom',
    'created_by'
  ]

  const data = body.map((location) => {
    const { lat, lng, ...props } = location
    const geom = xyToGeom({ lat, lng })
    const locProps = nullifyEmptyProps(props)

    return { ...locProps, geom }
  })

  const sql = genBatchSql(data, columns, 'locations')
  const result = await runBatchInsert(sql, db)

  return result
}

module.exports = {
  schema,
  handler
}
