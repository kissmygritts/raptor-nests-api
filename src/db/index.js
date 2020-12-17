const promise = require('bluebird')
const pgPromise = require('pg-promise')
const { Nests } = require('./repos')

const connection = process.env.DBURI
const initOptions = {
  promiseLib: promise,

  extend(obj) {
    obj.nests = new Nests(obj, pgp)
  }
}

const pgp = pgPromise(initOptions)
const db = pgp(connection)

module.exports = { db, pgp }
