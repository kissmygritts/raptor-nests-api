const nullifyEmptyProps = (obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    return Object.assign(acc, {
      [key]: obj[key] === '' ? null : obj[key]
    })
  }, {})
}

module.exports = {
  nullifyEmptyProps
}
