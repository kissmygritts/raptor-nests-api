const sql = require('../sql').nests

class NestRepository {
  constructor(db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  async getAll() {
    return this.db.manyOrNone(sql.getAll)
  }

  async getGeobuf() {
    const geobuf = await this.db.any(sql.getGeobuf)
    return geobuf[0].geobuf
  }
}

module.exports = NestRepository
