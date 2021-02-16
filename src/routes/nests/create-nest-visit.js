const { db, pgp } = require('../../db')
const visitSchema = require('../../schemas/nest-visits-schema.js')
const locationSchema = require('../../schemas/location-schema.js')
const { nullifyEmptyProps } = require('../../utils')

// Schema
const params = {
  type: 'object',
  properties: {
    nestId: { type: 'string' }
  }
}

// construct body schema
const body = {
  type: 'object',
  properties: {
    visit: visitSchema.nestVisitBodySchema,
    location: locationSchema.locationBodySchema
  }
}

const schema = {
  params,
  body
}

// Helper functions
const xyToGeom = ({ lat, lng }) => {
  return `SRID=4326; POINT(${lng} ${lat})`
}

const genVisitQuery = ({ visit }) => {
  const insert = pgp.helpers.insert
  const sql = insert(visit, null, 'nest_visits')
  return sql
}

const genLocationQuery = ({ location }) => {
  const { insert, concat } = pgp.helpers
  const format = pgp.as.format

  const { lat, lng, ...locationProps } = location
  const geom = xyToGeom({ lat, lng })

  console.log(JSON.stringify({ geom }))

  let sql = insert(
    {
      ...locationProps,
      geom
    },
    null,
    'locations'
  )

  if (location.current_location) {
    const update = format(
      'update locations set current_location = false where nest_id = $/nestId/',
      { nestId: location.nest_id }
    )

    sql = concat([update, sql])
  }

  return sql
}

const runQuery = async ({ visit, location }) => {
  const visitSql = genVisitQuery({ visit })

  if (!location) {
    console.log(JSON.stringify({ msg: 'running visit insert only' }))
    const result = await db.oneOrNone(`${visitSql} returning *`)

    return result
  } else {
    console.log(JSON.stringify({ msg: 'running transaction' }))
    const locationSql = genLocationQuery({ location })

    const result = await db.tx(async (t) => {
      const locationQuery = t.oneOrNone(locationSql + 'returning *')
      const visitQuery = t.oneOrNone(visitSql + 'returning *')

      const result = await Promise.all([locationQuery, visitQuery])
      const data = {
        visit: result[1],
        location: result[0]
      }

      return data
    })

    return result
  }
}

// Handler function
const handler = async (req) => {
  let { visit, location } = req.body

  visit = nullifyEmptyProps(visit)
  location = location ? nullifyEmptyProps(location) : null
  const result = await runQuery({ visit, location })

  return result
}

module.exports = {
  schema,
  handler
}
