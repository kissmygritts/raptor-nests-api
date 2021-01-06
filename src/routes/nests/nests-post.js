const { db, pgp } = require('../../db')
const { nullifyEmptyProps } = require('../../utils')
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
  // parse nest props
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
  const locationObj = body.location
  const { lat, lng, ...locationProps } = locationObj
  const geom = xyToGeom({ lat, lng })
  const location = { ...locationProps, geom }

  // parse nest visit props
  const nestVisit = body.visit

  return {
    nest: nullifyEmptyProps(nest),
    location: nullifyEmptyProps(location),
    visit: nullifyEmptyProps(nestVisit)
  }
}

// generate insert statements
const insert = ({ nest, location, visit }) => {
  const insert = pgp.helpers.insert

  const nestSql = `${insert(nest, null, 'nests')} returning *`
  const locationSql = `${insert(location, null, 'locations')} returning *`
  const visitSql = `${insert(visit, null, 'nest_visits')} returning *`

  return {
    nestSql,
    locationSql,
    visitSql
  }
}

const runInsert = async ({ nest, location, visit }) => {
  const { nestSql, locationSql, visitSql } = insert({ nest, location, visit })

  return db.tx(async (t) => {
    const nest = t.oneOrNone(nestSql)
    const location = t.oneOrNone(locationSql)
    const visit = t.oneOrNone(visitSql)

    const result = await Promise.all([nest, location, visit])
    const data = {
      ...result[0],
      location: result[1],
      visit: result[2]
    }

    console.log(JSON.stringify({ data }))

    return data
  })
}

async function handler(req) {
  const { body } = req
  const { nest, location, visit } = parseBody(body)

  const result = await runInsert({ nest, location, visit })
  return result
}

module.exports = {
  schema: { body, response },
  handler
}
