const { db, pgp } = require('../../db')
const {
  nestBodySchema,
  nestResponseSchema
} = require('../../schemas/nest-schema.js')

// schema components
const body = nestBodySchema
const response = nestResponseSchema

// convert xy (latlng) to geom
const xyToGeom = ({ lat, lng }) => {
  return `SRID=4326; POINT(${lng} ${lat})`
}

// parse body
const parseBody = (body) => {
  const {
    id,
    habitat_category,
    habitat_description,
    nest_type,
    nest_substrate,
    probable_origin,
    nest_comments
  } = body
  const nest = {
    id,
    habitat_category,
    habitat_description,
    nest_type,
    nest_substrate,
    probable_origin,
    nest_comments
  }

  // parse location props
  const location = body.location
  const { lat, lng, ...locationProps } = location

  const geom = xyToGeom({ lat, lng })

  return {
    nest,
    location: {
      ...locationProps,
      geom
    }
  }
}

// generate insert statements
const insert = ({ nest, location }) => {
  const insert = pgp.helpers.insert

  const nestSql = `${insert(nest, null, 'nests')} returning *`
  const locationSql = `${insert(location, null, 'locations')} returning *`

  return {
    nestSql,
    locationSql
  }
}

const runInsert = async ({ nest, location }) => {
  const { nestSql, locationSql } = insert({ nest, location })

  return db.tx(async (t) => {
    const nest = await t.oneOrNone(nestSql)
    const location = await t.oneOrNone(locationSql)

    return {
      ...nest,
      location: location
    }
  })
}

async function handler(req) {
  const { body } = req
  const { nest, location } = parseBody(body)

  const result = await runInsert({ nest, location })
  return result
}

module.exports = {
  schema: { body, response },
  handler
}
