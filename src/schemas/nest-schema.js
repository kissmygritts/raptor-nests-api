const { locationBodySchema } = require('./location-schema.js')
const { nestVisitBodySchema } = require('./nest-visits-schema.js')

const nestProps = {
  id: { type: 'string' },
  habitat_category: {
    type: 'string',
    enum: [
      '',
      'agriculture',
      'aspen woodland',
      'cliff/canyon',
      'creosote scrub',
      'desert wash',
      'developed - other',
      'grassland',
      'joshua tree',
      'mixed conifer',
      'mojave mid elevation mixed desert scrub',
      'pinyon and/or juniper',
      'riparian - aspen',
      'riparian - other',
      'salt desert scrub',
      'shoreline',
      'sagebrush',
      'other'
    ]
  },
  habitat_description: { type: 'string' },
  location_description: { type: 'string' },
  nest_type: {
    type: 'string',
    enum: ['burrow', 'cavity', 'scrape', 'stick nest']
  },
  nest_substrate: {
    type: 'string',
    enum: [
      'artificial',
      'cliff',
      'ground - subterranean',
      'ground - surface',
      'outcrop',
      'shrub',
      'tree'
    ]
  },
  probable_origin: {
    type: 'string',
    enum: [
      '',
      'accipiter',
      'burrowing owl',
      'buteo',
      'buteo/corvid',
      'corvid',
      'eagle',
      'eagle/buteo',
      'falcon',
      'ferruginous hawk',
      'northern goshawk',
      'osprey',
      'other'
    ]
  },
  nest_comments: { type: 'string' }
}

const nestBodySchema = {
  type: 'object',
  required: ['nest_substrate', 'nest_type'],
  additionalProperties: false,
  properties: {
    ...nestProps,
    location: locationBodySchema,
    visit: nestVisitBodySchema
  }
}

const nestResponseSchema = {
  200: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      habitat_category: { type: 'string' },
      habitat_description: { type: 'string' },
      location_description: { type: 'string' },
      nest_type: { type: 'string' },
      nest_substrate: { type: 'string' },
      probable_origin: { type: 'string' },
      nest_comments: { type: 'string' },
      created_by: { type: 'string' },
      created_at: { type: 'string' },
      location: {
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
      },
      visit: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          nest_id: { type: 'string' },
          location_id: { type: 'string' },
          visit_date: { type: 'string' },
          observers: { type: 'string' },
          agency: { type: 'string' },
          survey_type: { type: 'string' },
          source: { type: 'string' },
          nest_condition: { type: 'string' },
          nest_size: { type: 'string' },
          decorations: { type: 'boolean' },
          occupied: { type: 'boolean' },
          species: { type: 'string' },
          breeding_stage: { type: 'string' },
          adult_count: { type: 'number' },
          adult_behavior: { type: 'string' },
          production_count: { type: 'number' },
          young_stage: { type: 'string' },
          production_notes: { type: 'string' },
          comments: { type: 'string' }
        }
      }
    }
  }
}

module.exports = {
  nestProps,
  nestBodySchema,
  nestResponseSchema
}
