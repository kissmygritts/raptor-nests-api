const required = [
  'id',
  'nest_id',
  'lng',
  'lat',
  'exact_coordinates',
  'current_location'
]

const sharedProps = {
  id: { type: 'string' },
  nest_id: { type: 'string' },
  exact_coordinates: {
    type: 'string',
    enum: [
      '',
      'actual nest',
      'estimated location',
      'observation location',
      'not noted'
    ]
  },
  current_location: { type: 'boolean' },
  direction: {
    type: 'string',
    enum: ['', 'nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w']
  },
  distance: { type: 'number' },
  created_by: { type: 'string' },
  updated_by: { type: 'string' }
}

const bodyProps = {
  ...sharedProps,
  lng: { type: 'number' },
  lat: { type: 'number' }
}

const responseProps = {
  ...sharedProps,
  geom: { type: 'string' }
}

const locationBodySchema = {
  type: 'object',
  required: required,
  additionalProperties: false,
  properties: bodyProps
}

const locationResponseSchema = {
  200: {
    type: 'object',
    properties: responseProps
  }
}

module.exports = {
  required,
  bodyProps,
  responseProps,
  locationBodySchema,
  locationResponseSchema
}
