const locationBodySchema = {
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

const locationResponseSchema = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      nest_id: { type: 'string' },
      exact_coordinates: { type: 'boolean' },
      current_location: { type: 'boolean' },
      direction: { type: 'string' },
      distance: { type: 'number' },
      created_by: { type: 'string' },
      created_at: { type: 'string' }
    }
  }
}

module.exports = {
  locationBodySchema,
  locationResponseSchema
}
