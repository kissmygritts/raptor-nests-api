// const sql = require('../sql').locations

const cs = {
  columns: [
    { name: 'id' },
    { name: 'nest_id' },
    { name: 'exact_coordinates' },
    { name: 'current_location' },
    {
      name: 'direction',
      def: null
    },
    {
      name: 'distance',
      def: null
    }
  ]
}

const geomColumn = {
  name: 'geom',
  cast: '::geometry',
  init() {
    return `SRID=4326; POINT(${this.lng} ${this.lat})`
  }
}

class LocationRepository {
  constructor(db, pgp) {
    this.db = db
    this.pgp = pgp

    createColumnSet(pgp)
  }

  async create(params) {
    const insert = this.pgp.helpers.insert(params, cs.insert)
    console.log(JSON.stringify({ insert }))

    return this.db.oneOrNone(`${insert} returning *`)
  }
}

function createColumnSet(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({
      table: 'locations',
      schema: 'public'
    })

    // base column set
    cs.base = new pgp.helpers.ColumnSet(cs.columns, { table })

    // column set for inserts
    cs.insert = cs.base.extend([geomColumn])
  }

  return cs
}

module.exports = LocationRepository
