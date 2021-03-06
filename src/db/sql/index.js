const { QueryFile } = require('pg-promise')
const path = require('path')

module.exports = {
  nests: {
    getAll: sql('nests/get-all.sql'),
    getGeobuf: sql('nests/get-geobuf.sql')
  }
}

function sql(file) {
  const fullPath = path.join(__dirname, file)

  const qf = new QueryFile(fullPath, {
    minify: true
  })

  if (qf.error) {
    console.error(qf.error)
  }

  return qf
}
