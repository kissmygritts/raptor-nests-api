const nestVisitBodySchema = {
  type: 'object',
  required: [
    'id',
    'nest_id',
    'location_id',
    'visit_date',
    'observers',
    'survey_type',
    'occupied'
  ],
  additionalProperties: false,
  properties: {
    id: { type: 'string' },
    nest_id: { type: 'string' },
    location_id: { type: 'string' },
    visit_date: { type: 'string' },
    observers: { type: 'string' },
    agency: { type: 'string' },
    survey_type: {
      type: 'string',
      enum: [
        'aerial',
        'boat',
        'ground - incidental',
        'ground - passive',
        'ground - broadcast',
        'not noted'
      ]
    },
    source: { type: 'string' },
    nest_condition: {
      type: 'string',
      enum: ['', 'deteriorating', 'destroyed', 'intact', 'not found']
    },
    nest_size: {
      type: 'string',
      enum: ['', 'small', 'medium', 'large', 'extra large']
    },
    decorations: { type: 'boolean' },
    occupied: { type: 'boolean' },
    species: {
      type: 'string',
      enum: [
        '',
        'american kestrel',
        'bald eagle',
        'burrowing owl',
        'california spotted owl',
        'common raven',
        "cooper's hawk",
        'ferruginous hawk',
        'flammulated owl',
        'golden eagle',
        'great-horned owl',
        'long-eared owl',
        'merlin',
        'nortern saw-whet owl',
        'northern goshawk',
        'osprey',
        'peregrine falcon',
        'prairie falcon',
        'red-shouldered hawk',
        'red-tailed hawk',
        'sharp-shinned hawk',
        'short-eared owl',
        "swainson's hawk",
        'western screech owl'
      ]
    },
    breeding_stage: {
      type: 'string',
      enum: [
        '',
        'courtship',
        'failed',
        'fledged',
        'incubation',
        'incubation/brooding - stage unclear',
        'nestling',
        'territorial birds - stage unclear'
      ]
    },
    adult_count_clarify: {
      type: 'string',
      enum: ['', '=', '>']
    },
    adult_count: {
      type: 'integer',
      minimum: 0
    },
    adult_behavior: { type: 'string' },
    production_count_clarify: {
      type: 'string',
      enum: ['', '=', '>']
    },
    production_count: {
      type: 'integer',
      minimum: 0
    },
    young_stage: {
      type: 'string',
      enum: [
        '',
        'branchers',
        'eggs or nestlings',
        'eggs',
        'fledglings',
        'nestlings'
      ]
    },
    production_notes: { type: 'string' },
    comments: { type: 'string' }
  }
}

module.exports = {
  nestVisitBodySchema
}
