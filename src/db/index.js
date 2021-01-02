const promise = require('bluebird')
const pgPromise = require('pg-promise')
const { Nests, Locations } = require('./repos')

const connection = process.env.DBURI
const initOptions = {
  promiseLib: promise,

  extend(obj) {
    obj.nests = new Nests(obj, pgp)
    obj.locations = new Locations(obj, pgp)
  }
}

const pgp = pgPromise(initOptions)
const db = pgp(connection)

module.exports = { db, pgp }
