const sql = require('../sql').nests

const cs = {
  columns: [
    // column docs: http://vitaly-t.github.io/pg-promise/helpers.Column.html
    {
      name: 'id'
    },
    {
      name: 'habitat_category',
      def: null
    },
    {
      name: 'habitat_description',
      def: null
    },
    {
      name: 'location_description',
      def: null
    },
    {
      name: 'nest_type',
      def: null
    },
    {
      name: 'nest_substrate',
      def: null
    },
    {
      name: 'probable_origin',
      def: null
    },
    {
      name: 'nest_comments',
      def: null
    }
  ]
}

class NestRepository {
  constructor(db, pgp) {
    this.db = db
    this.pgp = pgp

    createColumnSet(pgp)
  }

  async getAll() {
    return this.db.manyOrNone(sql.getAll)
  }

  async getGeobuf() {
    const geobuf = await this.db.any(sql.getGeobuf)
    return geobuf[0].geobuf
  }

  async create(body) {
    const insert = this.pgp.helpers.insert(body, cs.insert)
    return this.db.one(`${insert} returning *`)
  }
}

function createColumnSet(pgp) {
  if (!cs.insert) {
    const table = new pgp.helpers.TableName({
      table: 'nests',
      schema: 'public'
    })

    // insert columnset, modifies cs above
    cs.insert = new pgp.helpers.ColumnSet(cs.columns, { table })
  }

  return cs
}

module.exports = NestRepository
