const { db } = require('../../db')

const body = {
  type: 'object',
  required: ['nest_id', 'lng', 'lat', 'exact_coordinates', 'current_location'],
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    nest_id: { type: 'string' },
    exact_coordinates: { type: 'boolean' },
    current_location: { type: 'boolean' },
    direction: { type: 'string' },
    distance: { type: 'number' },
    lng: { type: 'number' },
    lat: { type: 'number' }
  }
}

const response = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      nest_id: { type: 'string' },
      exact_coordinates: { type: 'boolean' },
      current_location: { type: 'boolean' },
      direction: { type: 'string' },
      distance: { type: 'number' },
      // x: { type: 'number' },
      // y: { type: 'number' },
      created_by: { type: 'string' },
      created_at: { type: 'string' }
    }
  }
}

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
