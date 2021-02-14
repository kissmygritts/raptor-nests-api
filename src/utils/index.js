const pgp = require('pg-promise')()
const { helpers, as } = pgp

const nullifyProps = (obj) =>
  Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: obj[key] === '' ? null : obj[key]
    })
  }, {})

const nullifyEmptyProps = (obj) => {
  return obj ? nullifyProps(obj) : undefined
}

const xyToGeom = ({ lat, lng }) => {
  return `SRID=4326; POINT(${lng} ${lat})`
}

const genBatchSql = (data, columns, table) => {
  const sql =
    'insert into $/table:name/ ($/columns:name/) values $/vals:raw/ returning *'
  const vals = helpers.values(data, columns)
  const query = as.format(sql, {
    table,
    columns,
    vals
  })

  return query
}

const runBatchInsert = async (sql, db) => {
  return await db.manyOrNone(sql)
}

module.exports = {
  nullifyEmptyProps,
  xyToGeom,
  genBatchSql,
  runBatchInsert
}
