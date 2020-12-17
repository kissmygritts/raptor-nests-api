const sql = require('../sql').nests

class NestRepository {
  constructor(db, pgp) {
    this.db = db
    this.pgp = pgp
  }

  async getAll() {
    return this.db.manyOrNone(sql.getAll)
  }
}

module.exports = NestRepository
