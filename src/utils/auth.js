const bcrypt = require('bcrypt')

const generate = async (password) => {
  const iterations = 12
  const hash = await bcrypt.hash(password, iterations)
  console.log(JSON.stringify({ hash }))
  return hash
}

const isEqual = async (lhash, rhash) => {
  return bcrypt.compare(lhash, rhash)
}

module.exports = {
  generate,
  isEqual
}
