const { db } = require('../../db')
const schema = require('../../schemas/location-schema.js')

const body = schema.locationBodySchema
const response = schema.locationResponseSchema

async function handler(req) {
  const { body } = req
  const data = await db.locations.create(body)

  // run update locations, if display_location = true
  // if (body.display_location) {}
  return data
}

module.exports = {
  schema: { body, response },
  handler
}
