const { db, pgp } = require('../../../db')
const { nullifyEmptyProps } = require('../../../utils')

const parseBody = ({ body }) => {
  const data = nullifyEmptyProps(body)

  console.log(JSON.stringify({ data }))
  return data
}

const insert = ({ visit }) => {
  const insert = pgp.helpers.insert
  const visitSql = `${insert(visit, null, 'nest_visits')} returning *`
  return visitSql
}

const runInsert = async ({ visit }) => {
  const visitSql = insert({ visit })
  return db.oneOrNone(visitSql)
}

const handler = async (req) => {
  const data = parseBody(req)
  const result = await runInsert({ visit: data })
  return result
}

module.exports = {
  createVisitHandler: handler
}
