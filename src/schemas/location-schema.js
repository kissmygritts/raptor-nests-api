const locationProps = {
  id: { type: 'string' },
  nest_id: { type: 'string' },
  exact_coordinates: {
    type: 'string',
    enum: [
      '',
      'actual nest',
      'observation location',
      'estimated location',
      'not noted'
    ]
  },
  current_location: { type: 'boolean' },
  direction: { type: 'string' },
  distance: { type: 'number' },
  lng: { type: 'number' },
  lat: { type: 'number' }
}

const locationBodySchema = {
  type: 'object',
  required: [
    'id',
    'nest_id',
    'lng',
    'lat',
    'exact_coordinates',
    'current_location'
  ],
  additionalProperties: false,
  properties: locationProps
}

const locationResponseSchema = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      nest_id: { type: 'string' },
      exact_coordinates: { type: 'string' },
      current_location: { type: 'boolean' },
      direction: { type: 'string' },
      distance: { type: 'number' },
      created_by: { type: 'string' },
      created_at: { type: 'string' }
    }
  }
}

module.exports = {
  locationProps,
  locationBodySchema,
  locationResponseSchema
}
