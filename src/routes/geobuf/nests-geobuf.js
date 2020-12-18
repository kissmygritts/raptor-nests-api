const { db } = require('../../db')

async function handler(req, rep) {
  rep.header('Content-Type', 'application/x-protobuf')
  return db.nests.getGeobuf()
}

module.exports = {
  handler
}
