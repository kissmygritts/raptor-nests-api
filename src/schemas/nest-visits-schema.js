const nestVisitProps = {
  id: { type: 'string' },
  nest_id: { type: 'string' },
  location_id: { type: 'string' },
  visit_date: { type: 'string' },
  observers: { type: 'string' },
  agency: {
    type: 'string',
    enum: [
      '',
      'consultant',
      'nevada dept. of wildlife',
      'nevada natural heritage program',
      'state (and other) parks',
      'bureau of land management',
      'national park service',
      'US army corps of engineers',
      'US fish & wildlife service',
      'US forest service',
      'US geological survey',
      'other'
    ]
  },
  survey_type: {
    type: 'string',
    enum: [
      'aerial',
      'boat',
      'ground - incidental',
      'ground - passive',
      'ground - broadcast',
      'ground - unspecified',
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
  // decorations: { type: 'boolean' },
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
      'northern saw-whet owl',
      'northern goshawk',
      'osprey',
      'peregrine falcon',
      'prairie falcon',
      'red-shouldered hawk',
      'red-tailed hawk',
      'sharp-shinned hawk',
      'short-eared owl',
      "swainson's hawk",
      'western screech owl',
      'other'
    ]
  },
  breeding_stage: {
    type: 'string',
    enum: [
      '',
      'courtship',
      'incubation',
      'incubation/brooding - stage unclear',
      'nestling',
      'fledged',
      'territorial birds - stage unclear',
      'stage unclear',
      'failed'
    ]
  },
  adult_count_clarify: {
    type: 'string',
    enum: ['', '=', '>=']
  },
  adult_count: {
    type: 'integer',
    minimum: -1
  },
  adult_behavior: { type: 'string' },
  production_count_clarify: {
    type: 'string',
    enum: ['', '=', '>=']
  },
  production_count: {
    type: 'integer',
    minimum: -1
  },
  young_stage: {
    type: 'string',
    enum: [
      '',
      'eggs',
      'eggs or nestlings',
      'nestlings',
      'branchers',
      'fledglings'
    ]
  },
  production_notes: { type: 'string' },
  comments: { type: 'string' }
}

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
  properties: nestVisitProps
}

module.exports = {
  nestVisitProps,
  nestVisitBodySchema
}
