const { db } = require('../../db')

// response schema
const response = {
  200: {
    type: 'array'
  }
}

const schema = {
  response
}

//
async function handler() {
  return db.nests.getAll()
}

module.exports = {
  schema,
  handler
}
